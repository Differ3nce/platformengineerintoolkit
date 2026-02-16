import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const submissions = await prisma.submission.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: {
      submittedBy: { select: { name: true, email: true } },
      reviewedBy: { select: { name: true } },
    },
  });
  return NextResponse.json(submissions);
}
