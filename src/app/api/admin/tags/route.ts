import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name } = body;

  const tag = await prisma.tag.create({
    data: {
      name,
      slug: slugify(name),
    },
  });

  return NextResponse.json(tag, { status: 201 });
}
