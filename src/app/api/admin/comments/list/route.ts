import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      resource: {
        select: {
          title: true,
          slug: true,
          category: { select: { slug: true } },
        },
      },
    },
  });
  return NextResponse.json(comments);
}
