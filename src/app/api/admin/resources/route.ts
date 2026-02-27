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
    categoryId,
    authorIds,
    tagIds,
  } = body;

  const slug = slugify(title);

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
}
