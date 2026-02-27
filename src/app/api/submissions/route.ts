import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

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

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      await resend.emails.send({
        from: "Platform Engineering Toolkit <onboarding@resend.dev>",
        to: "platformengineeringtoolkit@gmail.com",
        subject: `New submission: ${title}`,
        text: [
          `A new resource has been submitted.`,
          ``,
          `Title: ${title}`,
          `Type: ${type}`,
          `Description: ${description}`,
          externalUrl ? `URL: ${externalUrl}` : null,
          ``,
          `Submitted by: ${session.user.name} (${session.user.email})`,
        ]
          .filter(Boolean)
          .join("\n"),
      });
    } catch (err) {
      console.error("Failed to send submission notification email:", err);
    }
  }

  return NextResponse.json(submission, { status: 201 });
}
