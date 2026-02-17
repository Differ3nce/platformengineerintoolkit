import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET comments for a resource
export async function GET(_req: Request, context: RouteContext) {
  const { id: resourceId } = await context.params;

  const comments = await prisma.comment.findMany({
    where: { resourceId },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
  });

  return NextResponse.json(comments);
}

// POST a new comment
export async function POST(req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: resourceId } = await context.params;
  const { body } = await req.json();

  if (!body || typeof body !== "string" || body.trim().length === 0) {
    return NextResponse.json(
      { error: "Comment body is required" },
      { status: 400 }
    );
  }

  // Check resource exists
  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
  });
  if (!resource) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  const comment = await prisma.comment.create({
    data: {
      body: body.trim(),
      userId: session.user.id,
      resourceId,
    },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
  });

  return NextResponse.json(comment, { status: 201 });
}
