import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const body = await request.json();
  const { action, reviewNote, categoryId } = body;

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
      await prisma.resource.create({
        data: {
          title: submission.title,
          slug: slugify(submission.title),
          description: submission.description,
          body: submission.body ?? "",
          type: submission.type,
          status: "DRAFT",
          categoryId,
          externalLinks: submission.externalUrl
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
