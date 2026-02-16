import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { name, description, displayOrder } = body;

  const category = await prisma.category.update({
    where: { id },
    data: {
      name,
      slug: slugify(name),
      description: description || null,
      displayOrder: displayOrder ?? 0,
    },
  });

  return NextResponse.json(category);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const resourceCount = await prisma.resource.count({
    where: { categoryId: id },
  });

  if (resourceCount > 0) {
    return NextResponse.json(
      { error: `Cannot delete category with ${resourceCount} resource(s). Move or delete them first.` },
      { status: 400 }
    );
  }

  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
