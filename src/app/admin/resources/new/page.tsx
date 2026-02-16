import { prisma } from "@/lib/prisma";
import ResourceForm from "@/components/admin/ResourceForm";

export default async function NewResourcePage() {
  const [categories, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">New Resource</h1>
      <ResourceForm
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        tags={tags.map((t) => ({ id: t.id, name: t.name }))}
      />
    </div>
  );
}
