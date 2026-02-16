import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, description, displayOrder } = body;

  const category = await prisma.category.create({
    data: {
      name,
      slug: slugify(name),
      description: description || null,
      displayOrder: displayOrder ?? 0,
    },
  });

  return NextResponse.json(category, { status: 201 });
}
