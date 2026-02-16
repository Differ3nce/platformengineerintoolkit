import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      _count: { select: { resources: true } },
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">
          Platform Engineering Toolkit
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Not new tech. Just proven practices to shape the people and
          organizational side of platform engineering &mdash; where impact
          happens.
        </p>
      </section>

      {/* Video Section */}
      <section className="mb-16">
        <div className="mx-auto aspect-video max-w-3xl overflow-hidden rounded-lg bg-gray-100">
          <iframe
            className="h-full w-full"
            src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
            title="Platform Engineering Toolkit Introduction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Category Cards */}
      <section>
        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-900">
          Explore the Toolkit
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="group rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-400 hover:bg-gray-50"
            >
              <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                {category.name}
              </h3>
              {category.description && (
                <p className="mb-3 text-sm text-gray-600">
                  {category.description}
                </p>
              )}
              <p className="text-xs text-gray-400">
                {category._count.resources} resource
                {category._count.resources !== 1 ? "s" : ""}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
