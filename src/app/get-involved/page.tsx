import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Contribute to the Platform Engineering Toolkit with your own resources, case studies, and feedback.",
};

export default function GetInvolvedPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Get Involved</h1>

      <section className="mb-10">
        <p className="mb-4 text-gray-700 leading-relaxed">
          The Platform Engineering Toolkit is a community effort. We welcome
          contributions that help practitioners navigate the people and
          organizational side of platform engineering.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          What You Can Contribute
        </h2>
        <ul className="ml-6 list-disc space-y-2 text-gray-700">
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
        <p className="mt-4 text-sm text-gray-500">
          We welcome community-focused tools rather than paid services.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          How to Submit
        </h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Sign in with your Google account and use the submission form below to
          propose a new resource. Our team will review your submission and get
          back to you.
        </p>

        {/* Submission form placeholder — wired in Stage 4 */}
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <p className="text-gray-500">
            Submission form coming soon. In the meantime, feel free to reach out
            via email.
          </p>
          <a
            href="mailto:platformengineeringtoolkit@gmail.com"
            className="mt-3 inline-block text-blue-600 hover:text-blue-800"
          >
            platformengineeringtoolkit@gmail.com
          </a>
        </div>
      </section>

      <section>
        <p className="text-sm text-gray-500 leading-relaxed">
          Please note that we maintain this toolkit in our free time. We read
          all submissions and respond when we can. Thank you for your patience
          and contributions!
        </p>
      </section>
    </div>
  );
}
