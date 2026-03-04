import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const { action, reviewNote, categoryId } = body;

  const existing = await prisma.submission.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }
  if (existing.status !== "PENDING") {
    return NextResponse.json(
      { error: "Only PENDING submissions can be reviewed" },
      { status: 400 }
    );
  }

  if (action === "approve") {
    const submission = await prisma.submission.update({
      where: { id },
      data: {
        status: "APPROVED",
        reviewedById: session?.user?.id,
        reviewNote: reviewNote || null,
      },
    });

    // Create a draft resource from the approved submission
    if (categoryId) {
      const links = submission.externalLinks as { label: string; url: string }[] | null;
      await prisma.resource.create({
        data: {
          title: submission.title,
          slug: slugify(submission.title),
          description: submission.description,
          body: submission.body ?? "",
          status: "DRAFT",
          categoryId,
          externalLinks: links?.length
            ? links
            : submission.externalUrl
              ? [{ label: "Original Link", url: submission.externalUrl }]
              : [],
        },
      });
    }

    return NextResponse.json(submission);
  }

  if (action === "reject") {
    const submission = await prisma.submission.update({
      where: { id },
      data: {
        status: "REJECTED",
        reviewedById: session?.user?.id,
        reviewNote: reviewNote || null,
      },
    });

    return NextResponse.json(submission);
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
