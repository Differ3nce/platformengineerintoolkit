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
    type,
    status,
    readTime,
    targetAudience,
    thumbnailUrl,
    externalLinks,
    categoryId,
    authorId,
    tagIds,
  } = body;

  const resource = await prisma.resource.update({
    where: { id },
    data: {
      title,
      slug: slugify(title),
      description,
      body: bodyContent,
      type,
      status,
      readTime: readTime || null,
      targetAudience: targetAudience ?? [],
      thumbnailUrl: thumbnailUrl || null,
      externalLinks: externalLinks ?? [],
      categoryId,
      authorId: authorId || null,
      tags: {
        set: tagIds?.map((tagId: string) => ({ id: tagId })) ?? [],
      },
    },
    include: { category: true, tags: true },
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
