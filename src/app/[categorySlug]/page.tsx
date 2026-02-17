import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ResourceCard from "@/components/resources/ResourceCard";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
  });

  if (!category) return { title: "Not Found" };

  return {
    title: category.name,
    description: category.description ?? undefined,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    include: {
      resources: {
        where: {
          status: { in: ["PUBLISHED", "COMING_SOON"] },
        },
        orderBy: [{ status: "asc" }, { createdAt: "asc" }],
        include: {
          _count: { select: { likes: true, comments: true } },
        },
      },
    },
  });

  if (!category) {
    notFound();
  }

  // Fetch all categories for navigation footer
  const allCategories = await prisma.category.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-bold text-foreground">
          🎢 {category.name}
        </h1>
        {category.description && (
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {category.description}
          </p>
        )}
        <div className="gradient-bar mx-auto mt-8 h-2 w-24 rounded-full"></div>
      </div>

      {/* Resource Grid */}
      {category.resources.length === 0 ? (
        <p className="text-muted-foreground">
          No resources in this category yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {category.resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              title={resource.title}
              description={resource.description}
              type={resource.type}
              readTime={resource.readTime}
              targetAudience={resource.targetAudience}
              slug={resource.slug}
              categorySlug={category.slug}
              status={resource.status}
              likeCount={resource._count.likes}
              commentCount={resource._count.comments}
            />
          ))}
        </div>
      )}

      {/* Navigation Footer */}
      <div className="mt-16 border-t border-border pt-8">
        <p className="mb-4 text-center text-sm text-muted-foreground">
          Explore other sections
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {allCategories
            .filter((c) => c.slug !== categorySlug)
            .map((c) => (
              <Link
                key={c.id}
                href={`/${c.slug}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
