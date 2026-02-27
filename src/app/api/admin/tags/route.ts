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
  const { name } = body;

  const tag = await prisma.tag.create({
    data: {
      name,
      slug: slugify(name),
    },
  });

  return NextResponse.json(tag, { status: 201 });
}
