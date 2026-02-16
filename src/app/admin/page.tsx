import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [resourceCount, categoryCount, tagCount, pendingSubmissions, commentCount] =
    await Promise.all([
      prisma.resource.count(),
      prisma.category.count(),
      prisma.tag.count(),
      prisma.submission.count({ where: { status: "PENDING" } }),
      prisma.comment.count(),
    ]);

  const stats = [
    { label: "Resources", value: resourceCount, href: "/admin/resources" },
    { label: "Categories", value: categoryCount, href: "/admin/categories" },
    { label: "Tags", value: tagCount, href: "/admin/tags" },
    { label: "Pending Submissions", value: pendingSubmissions, href: "/admin/submissions" },
    { label: "Comments", value: commentCount, href: "/admin/comments" },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-gray-200 p-5 transition-colors hover:border-gray-400 hover:bg-gray-50"
          >
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
