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

  const { title, body, externalLinks, contactInfo } = await req.json();

  if (!title) {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }

  if (title.length > 255) {
    return NextResponse.json({ error: "Input exceeds maximum length" }, { status: 400 });
  }

  if (body && body.length > 50000) {
    return NextResponse.json({ error: "Body exceeds maximum length" }, { status: 400 });
  }

  if (contactInfo && contactInfo.length > 500) {
    return NextResponse.json({ error: "Contact info exceeds maximum length" }, { status: 400 });
  }

  // Only allow http/https — blocks javascript:, data:, blob:, etc.
  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  if (externalLinks && externalLinks.length > 20) {
    return NextResponse.json({ error: "Too many links (max 20)" }, { status: 400 });
  }

  if (externalLinks?.some((l: { url: string }) =>
    !isValidUrl(l.url) || l.url.length > 2048
  )) {
    return NextResponse.json({ error: "Invalid URL in external links" }, { status: 400 });
  }

  const submission = await prisma.submission.create({
    data: {
      title,
      body: body || null,
      type: "",
      externalLinks: externalLinks ?? [],
      contactInfo: contactInfo || null,
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
          ...(externalLinks?.length ? externalLinks.map((l: { url: string }) => `Link: ${l.url}`) : []),
          contactInfo ? `Contact: ${contactInfo}` : null,
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
