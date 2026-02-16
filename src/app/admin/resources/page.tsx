import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminResourcesPage() {
  const resources = await prisma.resource.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      category: { select: { name: true } },
      _count: { select: { likes: true, comments: true } },
    },
  });

  const statusColor: Record<string, string> = {
    PUBLISHED: "bg-green-100 text-green-800",
    DRAFT: "bg-yellow-100 text-yellow-800",
    COMING_SOON: "bg-amber-100 text-amber-800",
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
        <Link
          href="/admin/resources/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          + New Resource
        </Link>
      </div>

      {resources.length === 0 ? (
        <p className="text-gray-500">No resources yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Engagement
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {resources.map((resource) => (
                <tr key={resource.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900">
                      {resource.title}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {resource.category.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {resource.type}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                        statusColor[resource.status] ?? "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {resource.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    ♥ {resource._count.likes} &middot; 💬{" "}
                    {resource._count.comments}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/resources/${resource.id}/edit`}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
