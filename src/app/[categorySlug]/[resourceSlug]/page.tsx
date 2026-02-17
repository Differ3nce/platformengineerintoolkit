import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import MarkdownContent from "@/components/resources/MarkdownContent";
import LikeButton from "@/components/resources/LikeButton";
import CommentSection from "@/components/comments/CommentSection";
import type { Metadata } from "next";

interface ExternalLink {
  label: string;
  url: string;
}

interface ResourcePageProps {
  params: Promise<{ categorySlug: string; resourceSlug: string }>;
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { resourceSlug } = await params;
  const resource = await prisma.resource.findUnique({
    where: { slug: resourceSlug },
  });

  if (!resource) return { title: "Not Found" };

  return {
    title: resource.title,
    description: resource.description,
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { categorySlug, resourceSlug } = await params;
  const session = await auth();

  const resource = await prisma.resource.findUnique({
    where: { slug: resourceSlug },
    include: {
      category: true,
      author: { select: { name: true, image: true } },
      tags: true,
      _count: { select: { likes: true, comments: true } },
    },
  });

  if (!resource || resource.category.slug !== categorySlug) {
    notFound();
  }

  if (resource.status === "COMING_SOON") {
    notFound();
  }

  // Check if current user has liked this resource
  let userHasLiked = false;
  if (session?.user?.id) {
    const like = await prisma.like.findUnique({
      where: {
        userId_resourceId: {
          userId: session.user.id,
          resourceId: resource.id,
        },
      },
    });
    userHasLiked = !!like;
  }

  const externalLinks = (resource.externalLinks as ExternalLink[] | null) ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href={`/${resource.category.slug}`}
          className="text-sm text-muted-foreground hover:text-accent"
        >
          &larr; Back to {resource.category.name}
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        {/* Type badge + read time */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-block rounded-full bg-secondary px-3 py-0.5 text-xs font-medium text-secondary-foreground">
            {resource.type}
          </span>
          {resource.readTime && (
            <span className="text-xs text-muted-foreground">
              {resource.readTime}
            </span>
          )}
        </div>

        <h1 className="mb-4 text-3xl font-bold text-foreground">
          {resource.title}
        </h1>

        {/* Audience */}
        {resource.targetAudience.length > 0 && (
          <p className="mb-4 text-sm text-muted-foreground">
            For: {resource.targetAudience.join(", ")}
          </p>
        )}

        {/* Tags */}
        {resource.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-block rounded-full border border-border px-3 py-0.5 text-xs text-muted-foreground"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Author */}
        {resource.author && (
          <div className="flex items-center gap-2">
            {resource.author.image && (
              <img
                src={resource.author.image}
                alt={resource.author.name ?? "Author"}
                className="h-6 w-6 rounded-full"
              />
            )}
            <span className="text-sm text-muted-foreground">
              By {resource.author.name}
            </span>
          </div>
        )}
      </header>

      {/* Body */}
      <article className="mb-12 rounded-lg border border-border bg-card p-8">
        <MarkdownContent content={resource.body} />
      </article>

      {/* External Links / Further Reading */}
      {externalLinks.length > 0 && (
        <section className="mb-12 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Further Reading
          </h2>
          <ul className="space-y-2">
            {externalLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent"
                >
                  {link.label} &rarr;
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Like + engagement */}
      <div className="flex items-center gap-4 border-t border-border pt-6">
        <LikeButton
          resourceId={resource.id}
          initialLiked={userHasLiked}
          initialCount={resource._count.likes}
          isAuthenticated={!!session?.user}
        />
        <span className="text-sm text-muted-foreground">
          💬 {resource._count.comments} comment
          {resource._count.comments !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Comments section */}
      <CommentSection
        resourceId={resource.id}
        currentUserId={session?.user?.id ?? null}
        currentUserRole={session?.user?.role ?? null}
        isAuthenticated={!!session?.user}
      />

      {/* Back navigation */}
      <div className="mt-8">
        <Link
          href={`/${resource.category.slug}`}
          className="text-sm text-muted-foreground hover:text-accent"
        >
          &larr; Back to {resource.category.name}
        </Link>
      </div>
    </div>
  );
}
