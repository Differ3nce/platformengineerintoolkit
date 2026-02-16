import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Resources", href: "/admin/resources" },
  { label: "Categories", href: "/admin/categories" },
  { label: "Tags", href: "/admin/tags" },
  { label: "Submissions", href: "/admin/submissions" },
  { label: "Comments", href: "/admin/comments" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-73px)]">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-gray-50 p-4">
        <h2 className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Admin Panel
        </h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-gray-200 pt-4">
          <Link
            href="/"
            className="block px-3 text-xs text-gray-400 hover:text-gray-600"
          >
            &larr; Back to site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
