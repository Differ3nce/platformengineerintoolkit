import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
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

  try {
    const resource = await prisma.resource.update({
      where: { id },
      data: {
        title,
        slug: slugify(title),
        description,
        body: bodyContent,
        status,
        targetAudience: targetAudience ?? [],
        thumbnailUrl: thumbnailUrl || null,
        externalLinks: externalLinks ?? [],
        resourceAuthors: resourceAuthors ?? [],
        categoryId,
        authors: {
          set: authorIds?.map((authorId: string) => ({ id: authorId })) ?? [],
        },
        tags: {
          set: tagIds?.map((tagId: string) => ({ id: tagId })) ?? [],
        },
      },
      include: { category: true, tags: true, authors: true },
    });

    return NextResponse.json(resource);
  } catch (err) {
    console.error("Failed to update resource:", err);
    return NextResponse.json({ error: "Failed to update resource" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  await prisma.resource.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
