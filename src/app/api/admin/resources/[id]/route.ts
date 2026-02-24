import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    categoryId,
    authorIds,
    tagIds,
  } = body;

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
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.resource.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
