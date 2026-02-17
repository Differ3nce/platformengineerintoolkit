import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// Toggle like: POST creates or removes a like
export async function POST(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: resourceId } = await context.params;

  // Check resource exists
  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
  });
  if (!resource) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  // Check if already liked
  const existing = await prisma.like.findUnique({
    where: {
      userId_resourceId: {
        userId: session.user.id,
        resourceId,
      },
    },
  });

  if (existing) {
    // Unlike
    await prisma.like.delete({ where: { id: existing.id } });
    const count = await prisma.like.count({ where: { resourceId } });
    return NextResponse.json({ liked: false, count });
  } else {
    // Like
    await prisma.like.create({
      data: {
        userId: session.user.id,
        resourceId,
      },
    });
    const count = await prisma.like.count({ where: { resourceId } });
    return NextResponse.json({ liked: true, count });
  }
}
