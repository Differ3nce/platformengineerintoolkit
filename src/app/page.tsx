import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Rocket, Star, Sparkles } from "lucide-react";

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      _count: { select: { resources: true } },
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* Hero Section with Theme Park Background */}
      <div
        className="relative mb-16 overflow-hidden rounded-3xl text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(/images/theme-park-hero.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "600px",
        }}
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 py-20">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white drop-shadow-2xl md:text-7xl">
            🎢 Platform Engineering Toolkit
          </h1>
          <p className="mb-12 max-w-3xl text-xl leading-relaxed text-white/90 drop-shadow-lg md:text-2xl">
            Not new tech. Just proven practices to shape the people and
            organizational side of platform engineering &mdash; where impact
            happens.
          </p>

          {/* Three category buttons */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            {categories[0] && (
              <Link
                href={`/${categories[0].slug}`}
                className="inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-xl"
              >
                <Rocket className="mr-2 h-5 w-5" />
                {categories[0].name}
              </Link>
            )}
            {categories[1] && (
              <Link
                href={`/${categories[1].slug}`}
                className="inline-flex items-center rounded-xl bg-secondary px-8 py-4 text-lg font-semibold text-secondary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-secondary/90 hover:shadow-xl"
              >
                <Star className="mr-2 h-5 w-5" />
                {categories[1].name}
              </Link>
            )}
            {categories[2] && (
              <Link
                href={`/${categories[2].slug}`}
                className="inline-flex items-center rounded-xl bg-accent px-8 py-4 text-lg font-semibold text-accent-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-xl"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {categories[2].name}
              </Link>
            )}
          </div>

          <div className="gradient-bar mx-auto h-2 w-32 animate-pulse rounded-full"></div>
        </div>
      </div>

      {/* Navigation Cards Grid */}
      {categories.length > 0 && (
        <div className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/${category.slug}`} className="group">
              <div className="flex h-full flex-col items-center space-y-4 rounded-lg border border-border bg-card p-6 text-center shadow-card transition-all duration-200 group-hover:scale-[1.02] group-hover:bg-card-hover group-hover:shadow-card-hover">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-card-foreground transition-colors group-hover:text-accent">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {category._count.resources} resource
                    {category._count.resources !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Footer section */}
      <div className="border-t border-border py-8 text-center">
        <p className="text-muted-foreground">
          Building better platforms together. Start with any section above to
          begin your journey.
        </p>
      </div>
    </div>
  );
}
