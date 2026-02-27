import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const categories = await prisma.category.findMany({
    orderBy: { displayOrder: "asc" },
    include: { _count: { select: { resources: true } } },
  });
  return NextResponse.json(categories);
}
