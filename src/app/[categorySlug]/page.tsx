import { notFound } from "next/navigation";
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          {category.name}
        </h1>
        {category.description && (
          <p className="max-w-2xl text-gray-600">{category.description}</p>
        )}
      </div>

      {/* Resource Grid */}
      {category.resources.length === 0 ? (
        <p className="text-gray-500">No resources in this category yet.</p>
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
    </div>
  );
}
