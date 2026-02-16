import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ResourceForm from "@/components/admin/ResourceForm";

interface EditResourcePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditResourcePage({ params }: EditResourcePageProps) {
  const { id } = await params;

  const [resource, categories, tags] = await Promise.all([
    prisma.resource.findUnique({
      where: { id },
      include: { tags: { select: { id: true } } },
    }),
    prisma.category.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!resource) notFound();

  const externalLinks = Array.isArray(resource.externalLinks)
    ? (resource.externalLinks as { label: string; url: string }[])
    : [];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Edit: {resource.title}
      </h1>
      <ResourceForm
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        tags={tags.map((t) => ({ id: t.id, name: t.name }))}
        initialData={{
          id: resource.id,
          title: resource.title,
          description: resource.description,
          body: resource.body,
          type: resource.type,
          status: resource.status,
          readTime: resource.readTime,
          targetAudience: resource.targetAudience,
          thumbnailUrl: resource.thumbnailUrl,
          externalLinks,
          categoryId: resource.categoryId,
          tagIds: resource.tags.map((t) => t.id),
        }}
      />
    </div>
  );
}
