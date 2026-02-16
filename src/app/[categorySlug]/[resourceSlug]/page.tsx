import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import MarkdownContent from "@/components/resources/MarkdownContent";
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

  const externalLinks = (resource.externalLinks as ExternalLink[] | null) ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href={`/${resource.category.slug}`}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          &larr; Back to {resource.category.name}
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-8">
        {/* Type badge + read time */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
            {resource.type}
          </span>
          {resource.readTime && (
            <span className="text-xs text-gray-400">{resource.readTime}</span>
          )}
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          {resource.title}
        </h1>

        {/* Audience */}
        {resource.targetAudience.length > 0 && (
          <p className="mb-4 text-sm text-gray-500">
            For: {resource.targetAudience.join(", ")}
          </p>
        )}

        {/* Tags */}
        {resource.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-block rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-600"
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
            <span className="text-sm text-gray-500">
              By {resource.author.name}
            </span>
          </div>
        )}
      </header>

      {/* Body */}
      <article className="mb-12">
        <MarkdownContent content={resource.body} />
      </article>

      {/* External Links / Further Reading */}
      {externalLinks.length > 0 && (
        <section className="mb-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Further Reading
          </h2>
          <ul className="space-y-2">
            {externalLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {link.label} &rarr;
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Engagement stats */}
      <div className="flex items-center gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500">
        <span>♥ {resource._count.likes} likes</span>
        <span>💬 {resource._count.comments} comments</span>
      </div>

      {/* Back navigation */}
      <div className="mt-8">
        <Link
          href={`/${resource.category.slug}`}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          &larr; Back to {resource.category.name}
        </Link>
      </div>
    </div>
  );
}
