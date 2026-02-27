import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const submissions = await prisma.submission.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: {
      submittedBy: { select: { name: true, email: true } },
      reviewedBy: { select: { name: true } },
    },
  });
  return NextResponse.json(submissions);
}
