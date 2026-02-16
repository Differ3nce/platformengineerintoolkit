import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function POST(request: NextRequest) {
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

  const slug = slugify(title);

  const resource = await prisma.resource.create({
    data: {
      title,
      slug,
      description,
      body: bodyContent ?? "",
      type,
      status: status ?? "DRAFT",
      readTime: readTime || null,
      targetAudience: targetAudience ?? [],
      thumbnailUrl: thumbnailUrl || null,
      externalLinks: externalLinks ?? [],
      categoryId,
      authorId: authorId || null,
      tags: tagIds?.length
        ? { connect: tagIds.map((id: string) => ({ id })) }
        : undefined,
    },
    include: { category: true, tags: true },
  });

  return NextResponse.json(resource, { status: 201 });
}
