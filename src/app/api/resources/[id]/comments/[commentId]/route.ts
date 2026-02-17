import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string; commentId: string }>;
}

// DELETE a comment (own comment or admin)
export async function DELETE(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { commentId } = await context.params;

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  // Only the comment author or an admin can delete
  const isOwner = comment.userId === session.user.id;
  const isAdmin = session.user.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.comment.delete({ where: { id: commentId } });

  return NextResponse.json({ success: true });
}
