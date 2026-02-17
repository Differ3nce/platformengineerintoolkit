import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST a new submission
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description, body, type, externalUrl } = await req.json();

  if (!title || !description || !type) {
    return NextResponse.json(
      { error: "Title, description, and type are required" },
      { status: 400 }
    );
  }

  const submission = await prisma.submission.create({
    data: {
      title,
      description,
      body: body || null,
      type,
      externalUrl: externalUrl || null,
      submittedById: session.user.id,
    },
  });

  return NextResponse.json(submission, { status: 201 });
}
