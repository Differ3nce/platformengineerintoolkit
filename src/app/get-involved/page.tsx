import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import SubmissionForm from "@/components/resources/SubmissionForm";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Contribute to the Platform Engineering Toolkit with your own resources, case studies, and feedback.",
};

export default async function GetInvolvedPage() {
  const session = await auth();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-primary">Get Involved</h1>

      <section className="mb-10">
        <p className="mb-4 text-card-foreground leading-relaxed">
          The Platform Engineering Toolkit is a community effort. We welcome
          contributions that help practitioners navigate the people and
          organizational side of platform engineering.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          What You Can Contribute
        </h2>
        <ul className="ml-6 list-disc space-y-2 text-card-foreground">
          <li>
            <strong>Practical methodologies</strong> &mdash; Methods,
            frameworks, or approaches you&apos;ve used successfully in real-world
            platform engineering work
          </li>
          <li>
            <strong>Tools and resources</strong> &mdash; Templates, references,
            and community-built utilities
          </li>
          <li>
            <strong>Feedback</strong> &mdash; Suggestions for improving
            organization and accessibility
          </li>
          <li>
            <strong>Case studies</strong> &mdash; Real-world examples
            demonstrating platform engineering principles
          </li>
          <li>
            <strong>Corrections</strong> &mdash; Reports of outdated or
            inaccurate information
          </li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          We welcome community-focused tools rather than paid services.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Submit a Resource
        </h2>
        <p className="mb-4 text-card-foreground leading-relaxed">
          Sign in with your Google account and use the form below to propose a
          new resource. Our team will review your submission and get back to you.
        </p>

        <SubmissionForm isAuthenticated={!!session?.user} />
      </section>

      <section>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Please note that we maintain this toolkit in our free time. We read
          all submissions and respond when we can. Thank you for your patience
          and contributions!
        </p>
      </section>
    </div>
  );
}
