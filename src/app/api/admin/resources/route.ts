import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const {
    title,
    description,
    bodyContent,
    status,
    targetAudience,
    thumbnailUrl,
    externalLinks,
    resourceAuthors,
    categoryId,
    authorIds,
    tagIds,
  } = body;

  const isValidUrl = (url: string) => /^https?:\/\//i.test(url);

  if (thumbnailUrl && !isValidUrl(thumbnailUrl)) {
    return NextResponse.json({ error: "Invalid thumbnail URL" }, { status: 400 });
  }

  if (externalLinks?.some((link: { url: string }) => !isValidUrl(link.url))) {
    return NextResponse.json({ error: "Invalid URL in external links" }, { status: 400 });
  }

  if (
    resourceAuthors?.some(
      (a: { name: string; imageUrl?: string; links?: { url: string }[] }) =>
        a.links?.some((l: { url: string }) => !isValidUrl(l.url)) ||
        (a.imageUrl && !isValidUrl(a.imageUrl))
    )
  ) {
    return NextResponse.json({ error: "Invalid URL in resource authors" }, { status: 400 });
  }

  const slug = slugify(title);

  try {
    const resource = await prisma.resource.create({
      data: {
        title,
        slug,
        description,
        body: bodyContent ?? "",
        status: status ?? "DRAFT",
        targetAudience: targetAudience ?? [],
        thumbnailUrl: thumbnailUrl || null,
        externalLinks: externalLinks ?? [],
        resourceAuthors: resourceAuthors ?? [],
        categoryId,
        authors: authorIds?.length
          ? { connect: authorIds.map((id: string) => ({ id })) }
          : undefined,
        tags: tagIds?.length
          ? { connect: tagIds.map((id: string) => ({ id })) }
          : undefined,
      },
      include: { category: true, tags: true, authors: true },
    });

    return NextResponse.json(resource, { status: 201 });
  } catch (err) {
    console.error("Failed to create resource:", err);
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 });
  }
}
