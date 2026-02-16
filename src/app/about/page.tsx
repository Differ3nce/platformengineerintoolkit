import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the team behind the Platform Engineering Toolkit and learn about our mission.",
};

const authors = [
  {
    name: "Gielen Rojas-Lopez",
    org: "ValueCraft Studio",
    bio: "25+ years of experience across Microsoft, VMware, and the public sector. Synthesizes systems thinking with Platform Engineering, DevOps, Team Topologies, IT Service Management, and organizational change.",
    linkedin: "https://www.linkedin.com/in/gielenrojaslopez/",
  },
  {
    name: "Tom Slenders",
    org: "ASML",
    bio: "Transitioned from software development to organizational optimization. Drives Platform Engineering and Team Topologies initiatives at the organizational level, focused on building effective teams.",
    linkedin: "https://www.linkedin.com/in/tomslenders/",
  },
  {
    name: "Dr. Andrea Klettke",
    org: "Alliander",
    bio: "Combines physics training with change management and coaching expertise. Specializes in translating technical initiatives for management audiences and facilitating organizational flow improvements.",
    linkedin: "https://www.linkedin.com/in/andreaklettke/",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">About</h1>

      <section className="mb-12">
        <p className="mb-4 text-gray-700 leading-relaxed">
          The Platform Engineering Toolkit was built to address a specific gap in
          the landscape. While technical resources abound, there isn&apos;t much
          guidance on everything around the technology &mdash; the practices,
          approaches, and ways of working that establish platform engineering as
          a true discipline.
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Rather than functioning as a simple link repository, this toolkit
          serves as an organized guide helping practitioners navigate the
          field&apos;s complexities at any stage of their journey. It draws
          wisdom from multiple disciplines beyond Platform Engineering itself.
        </p>
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-semibold text-gray-900">
          The Team
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {authors.map((author) => (
            <div
              key={author.name}
              className="rounded-lg border border-gray-200 p-6"
            >
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                {author.name}
              </h3>
              <p className="mb-3 text-sm text-blue-600">{author.org}</p>
              <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                {author.bio}
              </p>
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                LinkedIn &rarr;
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
