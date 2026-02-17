import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...\n");

  // ─── Admin Users ──────────────────────────────────────────────────────────
  // These are created without accounts — they'll link when they first sign in via Google OAuth.
  const tom = await prisma.user.upsert({
    where: { email: "tom.slenders@gmail.com" },
    update: { role: "ADMIN" },
    create: {
      email: "tom.slenders@gmail.com",
      name: "Tom Slenders",
      role: "ADMIN",
    },
  });
  console.log(`  ✓ Admin user: ${tom.name}`);

  const gielen = await prisma.user.upsert({
    where: { email: "gielen@valuecraftstudio.com" },
    update: { role: "ADMIN" },
    create: {
      email: "gielen@valuecraftstudio.com",
      name: "Gielen Rojas-Lopez",
      role: "ADMIN",
    },
  });
  console.log(`  ✓ Admin user: ${gielen.name}`);

  const andrea = await prisma.user.upsert({
    where: { email: "andrea.klettke@gmail.com" },
    update: { role: "ADMIN" },
    create: {
      email: "andrea.klettke@gmail.com",
      name: "Dr. Andrea Klettke",
      role: "ADMIN",
    },
  });
  console.log(`  ✓ Admin user: ${andrea.name}`);

  // ─── Categories ───────────────────────────────────────────────────────────
  const whatAndWhy = await prisma.category.upsert({
    where: { slug: "what-and-why" },
    update: {},
    create: {
      name: "What And Why",
      slug: "what-and-why",
      description:
        "Start your platform engineering journey by understanding the fundamentals. These resources will help you grasp what platform engineering is and why it matters for your organization.",
      displayOrder: 1,
    },
  });
  console.log(`  ✓ Category: ${whatAndWhy.name}`);

  const whereToStart = await prisma.category.upsert({
    where: { slug: "where-to-start" },
    update: {},
    create: {
      name: "Where To Start",
      slug: "where-to-start",
      description:
        "Ready to begin your platform engineering implementation? Here's your roadmap to getting started with the right tools, frameworks, and approaches.",
      displayOrder: 2,
    },
  });
  console.log(`  ✓ Category: ${whereToStart.name}`);

  const startingAndProgressing = await prisma.category.upsert({
    where: { slug: "starting-and-progressing" },
    update: {},
    create: {
      name: "Starting And Progressing",
      slug: "starting-and-progressing",
      description:
        "Get inspired by real-world examples and learn how to advance your platform engineering maturity. Discover success stories and progression strategies.",
      displayOrder: 3,
    },
  });
  console.log(`  ✓ Category: ${startingAndProgressing.name}`);

  // ─── Tags ─────────────────────────────────────────────────────────────────
  const tagNames = [
    "platform-engineering",
    "devops",
    "developer-experience",
    "strategy",
    "tooling",
    "architecture",
    "team-topologies",
    "maturity-model",
    "workshop",
    "canvas",
    "methodology",
    "adoption",
    "funding",
    "communication",
  ];

  const tags: Record<string, { id: string }> = {};
  for (const name of tagNames) {
    const tag = await prisma.tag.upsert({
      where: { slug: name },
      update: {},
      create: { name: name.replace(/-/g, " "), slug: name },
    });
    tags[name] = tag;
  }
  console.log(`  ✓ Created ${tagNames.length} tags`);

  // ─── Resources: What And Why (3 published articles) ───────────────────────
  await prisma.resource.upsert({
    where: { slug: "introduction-to-platform-engineering" },
    update: {},
    create: {
      title: "Introduction to platform engineering",
      slug: "introduction-to-platform-engineering",
      description:
        "Learn the fundamentals of platform engineering and understand how it transforms software delivery teams.",
      body: `## What is Platform Engineering?

Platform engineering is the discipline of designing and building toolchains and workflows that enable self-service capabilities for software engineering organizations in the cloud-native era.

## Why Platform Engineering Matters

As organizations scale their software delivery, they face increasing complexity in managing infrastructure, tooling, and workflows. Platform engineering addresses this by:

- **Reducing cognitive load** on development teams
- **Standardizing workflows** and best practices
- **Enabling faster time-to-market**
- **Improving security** and compliance

## Key Components

A successful platform typically includes:

- **Developer Portal:** Central hub for documentation and services
- **Self-Service Infrastructure:** Automated provisioning and management
- **CI/CD Pipelines:** Standardized deployment workflows
- **Observability:** Monitoring and logging capabilities

## Getting Started

Begin your platform engineering journey by understanding your organization's specific needs and pain points. Focus on solving real problems rather than building technology for its own sake.`,
      type: "Article",
      status: "PUBLISHED",
      readTime: "8 min read",
      targetAudience: ["Developers", "Engineering Managers"],
      categoryId: whatAndWhy.id,
      authorId: tom.id,
      tags: {
        connect: [
          { slug: "platform-engineering" },
          { slug: "devops" },
          { slug: "developer-experience" },
        ],
      },
    },
  });
  console.log("  ✓ Resource: Introduction to platform engineering");

  await prisma.resource.upsert({
    where: { slug: "creating-platform-as-value-system" },
    update: {},
    create: {
      title: "Creating a platform as a system of value",
      slug: "creating-platform-as-value-system",
      description:
        "Discover how to build platforms that deliver measurable business value and drive organizational success.",
      body: `## Workshop: Building Value-Driven Platforms

This interactive workshop guides you through creating platforms that deliver measurable business value.

## Part 1: Value Identification (15 minutes)

Identify the core value propositions your platform should deliver:

- Developer productivity gains
- Operational efficiency improvements
- Security and compliance benefits
- Cost optimization opportunities

## Part 2: Metrics Definition (15 minutes)

Define measurable outcomes for your platform:

- **Deployment frequency** — how often you release to production
- **Lead time for changes** — time from commit to deploy
- **Mean time to recovery** — how quickly you recover from incidents
- **Developer satisfaction scores** — qualitative feedback from your users

## Part 3: Implementation Strategy (15 minutes)

Create a roadmap that prioritizes value delivery:

- Quick wins and early adopters
- Incremental feature rollout
- Feedback loops and iteration
- Success measurement and communication`,
      type: "Workshop",
      status: "PUBLISHED",
      readTime: "45 min workshop",
      targetAudience: ["CTOs", "Platform Leaders"],
      categoryId: whatAndWhy.id,
      authorId: gielen.id,
      tags: {
        connect: [
          { slug: "platform-engineering" },
          { slug: "strategy" },
          { slug: "workshop" },
        ],
      },
    },
  });
  console.log("  ✓ Resource: Creating a platform as a system of value");

  await prisma.resource.upsert({
    where: { slug: "platform-engineering-tool-map" },
    update: {},
    create: {
      title: "The Platform Engineering Tool Map",
      slug: "platform-engineering-tool-map",
      description:
        "Navigate the complex landscape of platform engineering tools with our comprehensive visual guide.",
      body: `## Platform Engineering Tool Landscape

Navigate the complex ecosystem of platform engineering tools with this comprehensive guide.

## Infrastructure as Code

- **Terraform:** Multi-cloud infrastructure provisioning
- **Pulumi:** Infrastructure as code with programming languages
- **AWS CDK:** Cloud Development Kit for AWS

## Container Orchestration

- **Kubernetes:** Container orchestration platform
- **Docker:** Containerization technology
- **Helm:** Kubernetes package manager

## CI/CD Tools

- **GitLab CI/CD:** Integrated DevOps platform
- **GitHub Actions:** Workflow automation
- **Jenkins:** Open-source automation server

## Observability

- **Prometheus:** Monitoring and alerting
- **Grafana:** Visualization and dashboards
- **Jaeger:** Distributed tracing

## Developer Portals

- **Backstage:** Developer portal framework by Spotify
- **Port:** Developer portal platform
- **Cortex:** Internal developer portal`,
      type: "Canvas",
      status: "PUBLISHED",
      readTime: "Interactive guide",
      targetAudience: ["Platform Engineers", "DevOps Teams"],
      categoryId: whatAndWhy.id,
      authorId: andrea.id,
      tags: {
        connect: [
          { slug: "platform-engineering" },
          { slug: "tooling" },
          { slug: "canvas" },
        ],
      },
    },
  });
  console.log("  ✓ Resource: The Platform Engineering Tool Map");

  // ─── Resources: Where To Start (coming soon content) ──────────────────────
  await prisma.resource.upsert({
    where: { slug: "architecture-for-flow" },
    update: {},
    create: {
      title: "Architecture for Flow",
      slug: "architecture-for-flow",
      description:
        "Guidance in designing adaptive, socio-technical systems. A combination of tools (Wardley Mapping, Domain Driven Design & Team Topologies) that complement each other in a structured way.",
      body: `## Architecture for Flow

Guidance in designing adaptive, socio-technical systems using a combination of strategic tools that complement each other.

## Key Components

### Wardley Mapping
Strategic tool for understanding your landscape and the evolution of components. Helps you make better decisions about build vs. buy and identify where to invest.

### Domain Driven Design
Modeling approach for complex business domains. Focuses on creating a shared understanding between technical and business stakeholders through bounded contexts and ubiquitous language.

### Team Topologies
Organizational patterns for effective team structures. Defines four fundamental team types (stream-aligned, enabling, complicated subsystem, and platform) and three interaction modes.

## How They Work Together

These three tools complement each other by addressing different aspects of socio-technical system design:

1. **Wardley Mapping** tells you *where* to focus
2. **Domain Driven Design** tells you *what* to build
3. **Team Topologies** tells you *who* should build it

## External Resources

- [Canvas & Resources](https://susannekaiser.net/architecture-for-flow-canvas/)
- [Video Introduction](https://youtu.be/Mm0ctgk-uIM?feature=shared)`,
      type: "Framework",
      status: "PUBLISHED",
      readTime: "15 min read",
      targetAudience: ["System Architects", "Platform Engineers"],
      externalLinks: {
        canvas: "https://susannekaiser.net/architecture-for-flow-canvas/",
        video: "https://youtu.be/Mm0ctgk-uIM?feature=shared",
      },
      categoryId: whereToStart.id,
      authorId: gielen.id,
      tags: {
        connect: [
          { slug: "architecture" },
          { slug: "team-topologies" },
          { slug: "strategy" },
        ],
      },
    },
  });
  console.log("  ✓ Resource: Architecture for Flow");

  await prisma.resource.upsert({
    where: { slug: "pe-maturity-model" },
    update: {},
    create: {
      title: "PE Maturity Model (by CNCF)",
      slug: "pe-maturity-model",
      description:
        "A framework for reflection and for identifying opportunities for improvement in any organization leveraging platforms.",
      body: `## Platform Engineering Maturity Model

A framework developed by the CNCF for reflection and for identifying opportunities for improvement in any organization leveraging platforms.

## Key Areas Evaluated

### Platform Strategy
Alignment with business objectives and organizational goals. How well does your platform strategy serve the broader business needs?

### Developer Experience
Self-service capabilities and tooling. Can developers easily discover, use, and contribute to the platform without bottlenecks?

### Platform Operations
Reliability, observability, and automation. How mature are your operational practices for keeping the platform healthy?

### Platform Evolution
Continuous improvement and adaptation. Do you have feedback loops and processes to evolve the platform based on user needs?

### Organizational Alignment
Culture, skills, and governance. Is the organization structured to support and sustain the platform effectively?

## How To Use This Model

1. Assess your current state across each dimension
2. Identify gaps and opportunities
3. Create a roadmap for improvement
4. Revisit periodically to track progress

## External Resources

- [CNCF Maturity Model](https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/#model-table)`,
      type: "Maturity Model",
      status: "PUBLISHED",
      readTime: "10 min read",
      targetAudience: ["Platform Leaders", "CTOs"],
      externalLinks: {
        cncf: "https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/#model-table",
      },
      categoryId: whereToStart.id,
      authorId: andrea.id,
      tags: {
        connect: [
          { slug: "maturity-model" },
          { slug: "platform-engineering" },
          { slug: "strategy" },
        ],
      },
    },
  });
  console.log("  ✓ Resource: PE Maturity Model (by CNCF)");

  await prisma.resource.upsert({
    where: { slug: "platform-tooling-landscape" },
    update: {},
    create: {
      title: "Platform Tooling Landscape",
      slug: "platform-tooling-landscape",
      description:
        "Comprehensive overview of the tools and technologies that make up a modern platform engineering ecosystem.",
      body: "Content coming soon.",
      type: "Guide",
      status: "COMING_SOON",
      readTime: "15 min read",
      targetAudience: ["Platform Engineers", "DevOps Teams"],
      categoryId: whereToStart.id,
      authorId: tom.id,
      tags: {
        connect: [{ slug: "tooling" }, { slug: "platform-engineering" }],
      },
    },
  });
  console.log("  ✓ Resource: Platform Tooling Landscape (coming soon)");

  await prisma.resource.upsert({
    where: { slug: "platform-engineering-kickoff-approach" },
    update: {},
    create: {
      title: "Platform Engineering Kickoff Approach",
      slug: "platform-engineering-kickoff-approach",
      description:
        "Step-by-step methodology for initiating and launching your platform engineering transformation journey.",
      body: "Content coming soon.",
      type: "Methodology",
      status: "COMING_SOON",
      readTime: "20 min read",
      targetAudience: ["Platform Leaders", "Engineering Managers"],
      categoryId: whereToStart.id,
      authorId: gielen.id,
      tags: {
        connect: [{ slug: "methodology" }, { slug: "platform-engineering" }],
      },
    },
  });
  console.log(
    "  ✓ Resource: Platform Engineering Kickoff Approach (coming soon)"
  );

  // ─── Resources: Starting And Progressing ──────────────────────────────────
  await prisma.resource.upsert({
    where: { slug: "pe-engagement-canvas" },
    update: {},
    create: {
      title: "PE Engagement Canvas",
      slug: "pe-engagement-canvas",
      description:
        "Visual framework for understanding and planning stakeholder engagement in platform engineering initiatives.",
      body: "Content coming soon.",
      type: "Canvas",
      status: "COMING_SOON",
      readTime: "30 min workshop",
      targetAudience: ["Product Managers", "Platform Leaders"],
      categoryId: startingAndProgressing.id,
      authorId: gielen.id,
      tags: {
        connect: [{ slug: "canvas" }, { slug: "adoption" }],
      },
    },
  });
  console.log("  ✓ Resource: PE Engagement Canvas (coming soon)");

  await prisma.resource.upsert({
    where: { slug: "pe-enablement-services-canvas" },
    update: {},
    create: {
      title: "PE Enablement Services Canvas",
      slug: "pe-enablement-services-canvas",
      description:
        "Map and design the services your platform will provide to enable development teams effectively.",
      body: "Content coming soon.",
      type: "Canvas",
      status: "COMING_SOON",
      readTime: "30 min workshop",
      targetAudience: ["Platform Engineers", "Service Designers"],
      categoryId: startingAndProgressing.id,
      authorId: andrea.id,
      tags: {
        connect: [{ slug: "canvas" }, { slug: "developer-experience" }],
      },
    },
  });
  console.log("  ✓ Resource: PE Enablement Services Canvas (coming soon)");

  await prisma.resource.upsert({
    where: { slug: "platform-funding-design" },
    update: {},
    create: {
      title: "Platform Funding Design",
      slug: "platform-funding-design",
      description:
        "Strategic approaches to securing sustainable funding and business case development for platform initiatives.",
      body: "Content coming soon.",
      type: "Framework",
      status: "COMING_SOON",
      readTime: "15 min read",
      targetAudience: ["Platform Leaders", "Finance Teams"],
      categoryId: startingAndProgressing.id,
      authorId: tom.id,
      tags: {
        connect: [{ slug: "funding" }, { slug: "strategy" }],
      },
    },
  });
  console.log("  ✓ Resource: Platform Funding Design (coming soon)");

  await prisma.resource.upsert({
    where: { slug: "user-needs-mapping" },
    update: {},
    create: {
      title: "User Needs Mapping",
      slug: "user-needs-mapping",
      description:
        "Systematic approach to understanding and documenting the needs of developers and teams using your platform.",
      body: "Content coming soon.",
      type: "Method",
      status: "COMING_SOON",
      readTime: "20 min read",
      targetAudience: ["Product Managers", "UX Designers"],
      categoryId: startingAndProgressing.id,
      authorId: andrea.id,
      tags: {
        connect: [
          { slug: "developer-experience" },
          { slug: "methodology" },
        ],
      },
    },
  });
  console.log("  ✓ Resource: User Needs Mapping (coming soon)");

  await prisma.resource.upsert({
    where: { slug: "storytelling-on-different-levels" },
    update: {},
    create: {
      title: "Story Telling on Different Levels",
      slug: "storytelling-on-different-levels",
      description:
        "Effective communication strategies for platform engineering across organizational levels and stakeholders.",
      body: "Content coming soon.",
      type: "Guide",
      status: "COMING_SOON",
      readTime: "12 min read",
      targetAudience: ["Platform Leaders", "Communication Teams"],
      categoryId: startingAndProgressing.id,
      authorId: gielen.id,
      tags: {
        connect: [{ slug: "communication" }, { slug: "adoption" }],
      },
    },
  });
  console.log(
    "  ✓ Resource: Story Telling on Different Levels (coming soon)"
  );

  await prisma.resource.upsert({
    where: { slug: "find-sponsors-and-core-team" },
    update: {},
    create: {
      title: "Find Sponsors and Core Team",
      slug: "find-sponsors-and-core-team",
      description:
        "Strategies for identifying, engaging, and building relationships with key sponsors and assembling your core platform team.",
      body: "Content coming soon.",
      type: "Strategy",
      status: "COMING_SOON",
      readTime: "15 min read",
      targetAudience: ["Platform Leaders", "HR Partners"],
      categoryId: startingAndProgressing.id,
      authorId: tom.id,
      tags: {
        connect: [{ slug: "adoption" }, { slug: "strategy" }],
      },
    },
  });
  console.log("  ✓ Resource: Find Sponsors and Core Team (coming soon)");

  // ─── Summary ──────────────────────────────────────────────────────────────
  const userCount = await prisma.user.count();
  const categoryCount = await prisma.category.count();
  const resourceCount = await prisma.resource.count();
  const tagCount = await prisma.tag.count();

  console.log(`
🎉 Seeding complete!
   ${userCount} users (${userCount} admins)
   ${categoryCount} categories
   ${resourceCount} resources
   ${tagCount} tags
`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
