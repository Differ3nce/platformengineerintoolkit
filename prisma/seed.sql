-- =============================================================================
-- Platform Engineering Toolkit - Seed Data
-- Generated from prisma/seed.ts
-- Run in Supabase SQL Editor
-- =============================================================================

-- ─── Users ──────────────────────────────────────────────────────────────────────

INSERT INTO "User" (id, name, email, role, "createdAt", "updatedAt")
VALUES
  ('cm7t2x9a10001pe0kslndrstm', 'Tom Slenders', 'tom.slenders@gmail.com', 'ADMIN', now(), CURRENT_TIMESTAMP),
  ('cm7t2x9a10002pe0kgielenrl', 'Gielen Rojas-Lopez', 'gielen@valuecraftstudio.com', 'ADMIN', now(), CURRENT_TIMESTAMP),
  ('cm7t2x9a10003pe0kandreakl', 'Dr. Andrea Klettke', 'andrea.klettke@gmail.com', 'ADMIN', now(), CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

-- ─── Categories ─────────────────────────────────────────────────────────────────

INSERT INTO "Category" (id, name, slug, description, "displayOrder", "createdAt", "updatedAt")
VALUES
  ('cm7t2x9b20001ct0kwhatandwhy', 'What And Why', 'what-and-why',
   'Start your platform engineering journey by understanding the fundamentals. These resources will help you grasp what platform engineering is and why it matters for your organization.',
   1, now(), CURRENT_TIMESTAMP),
  ('cm7t2x9b20002ct0kwherestart', 'Where To Start', 'where-to-start',
   'Ready to begin your platform engineering implementation? Here''s your roadmap to getting started with the right tools, frameworks, and approaches.',
   2, now(), CURRENT_TIMESTAMP),
  ('cm7t2x9b20003ct0kstartprogr', 'Starting And Progressing', 'starting-and-progressing',
   'Get inspired by real-world examples and learn how to advance your platform engineering maturity. Discover success stories and progression strategies.',
   3, now(), CURRENT_TIMESTAMP)
ON CONFLICT (slug) DO NOTHING;

-- ─── Tags ───────────────────────────────────────────────────────────────────────

INSERT INTO "Tag" (id, name, slug)
VALUES
  ('cm7t2x9c30001tg0kplatengine', 'platform engineering', 'platform-engineering'),
  ('cm7t2x9c30002tg0kdevopsrun', 'devops', 'devops'),
  ('cm7t2x9c30003tg0kdevexperx', 'developer experience', 'developer-experience'),
  ('cm7t2x9c30004tg0kstrategyp', 'strategy', 'strategy'),
  ('cm7t2x9c30005tg0ktoolingmp', 'tooling', 'tooling'),
  ('cm7t2x9c30006tg0karchitect', 'architecture', 'architecture'),
  ('cm7t2x9c30007tg0kteamtopol', 'team topologies', 'team-topologies'),
  ('cm7t2x9c30008tg0kmaturitym', 'maturity model', 'maturity-model'),
  ('cm7t2x9c30009tg0kworkshopx', 'workshop', 'workshop'),
  ('cm7t2x9c30010tg0kcanvasxxx', 'canvas', 'canvas'),
  ('cm7t2x9c30011tg0kmethodolx', 'methodology', 'methodology'),
  ('cm7t2x9c30012tg0kadoptionx', 'adoption', 'adoption'),
  ('cm7t2x9c30013tg0kfundingxx', 'funding', 'funding'),
  ('cm7t2x9c30014tg0kcommunctn', 'communication', 'communication')
ON CONFLICT (slug) DO NOTHING;

-- ─── Resources: What And Why ────────────────────────────────────────────────────

INSERT INTO "Resource" (id, title, slug, description, body, type, status, "readTime", "targetAudience", "thumbnailUrl", "externalLinks", "categoryId", "authorId", "createdAt", "updatedAt")
VALUES
  (
    'cm7t2x9d40001rs0kintroplat',
    'Introduction to platform engineering',
    'introduction-to-platform-engineering',
    'Learn the fundamentals of platform engineering and understand how it transforms software delivery teams.',
    E'## What is Platform Engineering?\n\nPlatform engineering is the discipline of designing and building toolchains and workflows that enable self-service capabilities for software engineering organizations in the cloud-native era.\n\n## Why Platform Engineering Matters\n\nAs organizations scale their software delivery, they face increasing complexity in managing infrastructure, tooling, and workflows. Platform engineering addresses this by:\n\n- **Reducing cognitive load** on development teams\n- **Standardizing workflows** and best practices\n- **Enabling faster time-to-market**\n- **Improving security** and compliance\n\n## Key Components\n\nA successful platform typically includes:\n\n- **Developer Portal:** Central hub for documentation and services\n- **Self-Service Infrastructure:** Automated provisioning and management\n- **CI/CD Pipelines:** Standardized deployment workflows\n- **Observability:** Monitoring and logging capabilities\n\n## Getting Started\n\nBegin your platform engineering journey by understanding your organization''s specific needs and pain points. Focus on solving real problems rather than building technology for its own sake.',
    'Article',
    'PUBLISHED',
    '8 min read',
    ARRAY['Developers', 'Engineering Managers'],
    NULL,
    NULL,
    'cm7t2x9b20001ct0kwhatandwhy',
    'cm7t2x9a10001pe0kslndrstm',
    now(),
    CURRENT_TIMESTAMP
  ),
  (
    'cm7t2x9d40002rs0kcreatplat',
    'Creating a platform as a system of value',
    'creating-platform-as-value-system',
    'Discover how to build platforms that deliver measurable business value and drive organizational success.',
    E'## Workshop: Building Value-Driven Platforms\n\nThis interactive workshop guides you through creating platforms that deliver measurable business value.\n\n## Part 1: Value Identification (15 minutes)\n\nIdentify the core value propositions your platform should deliver:\n\n- Developer productivity gains\n- Operational efficiency improvements\n- Security and compliance benefits\n- Cost optimization opportunities\n\n## Part 2: Metrics Definition (15 minutes)\n\nDefine measurable outcomes for your platform:\n\n- **Deployment frequency** — how often you release to production\n- **Lead time for changes** — time from commit to deploy\n- **Mean time to recovery** — how quickly you recover from incidents\n- **Developer satisfaction scores** — qualitative feedback from your users\n\n## Part 3: Implementation Strategy (15 minutes)\n\nCreate a roadmap that prioritizes value delivery:\n\n- Quick wins and early adopters\n- Incremental feature rollout\n- Feedback loops and iteration\n- Success measurement and communication',
    'Workshop',
    'PUBLISHED',
    '45 min workshop',
    ARRAY['CTOs', 'Platform Leaders'],
    NULL,
    NULL,
    'cm7t2x9b20001ct0kwhatandwhy',
    'cm7t2x9a10002pe0kgielenrl',
    now(),
    CURRENT_TIMESTAMP
  ),
  (
    'cm7t2x9d40003rs0ktoolmapxx',
    'The Platform Engineering Tool Map',
    'platform-engineering-tool-map',
    'Navigate the complex landscape of platform engineering tools with our comprehensive visual guide.',
    E'## Platform Engineering Tool Landscape\n\nNavigate the complex ecosystem of platform engineering tools with this comprehensive guide.\n\n## Infrastructure as Code\n\n- **Terraform:** Multi-cloud infrastructure provisioning\n- **Pulumi:** Infrastructure as code with programming languages\n- **AWS CDK:** Cloud Development Kit for AWS\n\n## Container Orchestration\n\n- **Kubernetes:** Container orchestration platform\n- **Docker:** Containerization technology\n- **Helm:** Kubernetes package manager\n\n## CI/CD Tools\n\n- **GitLab CI/CD:** Integrated DevOps platform\n- **GitHub Actions:** Workflow automation\n- **Jenkins:** Open-source automation server\n\n## Observability\n\n- **Prometheus:** Monitoring and alerting\n- **Grafana:** Visualization and dashboards\n- **Jaeger:** Distributed tracing\n\n## Developer Portals\n\n- **Backstage:** Developer portal framework by Spotify\n- **Port:** Developer portal platform\n- **Cortex:** Internal developer portal',
    'Canvas',
    'PUBLISHED',
    'Interactive guide',
    ARRAY['Platform Engineers', 'DevOps Teams'],
    NULL,
    NULL,
    'cm7t2x9b20001ct0kwhatandwhy',
    'cm7t2x9a10003pe0kandreakl',
    now(),
    CURRENT_TIMESTAMP
  )
ON CONFLICT (slug) DO NOTHING;

-- ─── Resources: Where To Start ──────────────────────────────────────────────────

INSERT INTO "Resource" (id, title, slug, description, body, type, status, "readTime", "targetAudience", "thumbnailUrl", "externalLinks", "categoryId", "authorId", "createdAt", "updatedAt")
VALUES
  (
    'cm7t2x9d40004rs0karchflow',
    'Architecture for Flow',
    'architecture-for-flow',
    'Guidance in designing adaptive, socio-technical systems. A combination of tools (Wardley Mapping, Domain Driven Design & Team Topologies) that complement each other in a structured way.',
    E'## Architecture for Flow\n\nGuidance in designing adaptive, socio-technical systems using a combination of strategic tools that complement each other.\n\n## Key Components\n\n### Wardley Mapping\nStrategic tool for understanding your landscape and the evolution of components. Helps you make better decisions about build vs. buy and identify where to invest.\n\n### Domain Driven Design\nModeling approach for complex business domains. Focuses on creating a shared understanding between technical and business stakeholders through bounded contexts and ubiquitous language.\n\n### Team Topologies\nOrganizational patterns for effective team structures. Defines four fundamental team types (stream-aligned, enabling, complicated subsystem, and platform) and three interaction modes.\n\n## How They Work Together\n\nThese three tools complement each other by addressing different aspects of socio-technical system design:\n\n1. **Wardley Mapping** tells you *where* to focus\n2. **Domain Driven Design** tells you *what* to build\n3. **Team Topologies** tells you *who* should build it\n\n## External Resources\n\n- [Canvas & Resources](https://susannekaiser.net/architecture-for-flow-canvas/)\n- [Video Introduction](https://youtu.be/Mm0ctgk-uIM?feature=shared)',
    'Framework',
    'PUBLISHED',
    '15 min read',
    ARRAY['System Architects', 'Platform Engineers'],
    NULL,
    '{"canvas": "https://susannekaiser.net/architecture-for-flow-canvas/", "video": "https://youtu.be/Mm0ctgk-uIM?feature=shared"}'::jsonb,
    'cm7t2x9b20002ct0kwherestart',
    'cm7t2x9a10002pe0kgielenrl',
    now(),
    CURRENT_TIMESTAMP
  ),
  (
    'cm7t2x9d40005rs0kmaturitym',
    'PE Maturity Model (by CNCF)',
    'pe-maturity-model',
    'A framework for reflection and for identifying opportunities for improvement in any organization leveraging platforms.',
    E'## Platform Engineering Maturity Model\n\nA framework developed by the CNCF for reflection and for identifying opportunities for improvement in any organization leveraging platforms.\n\n## Key Areas Evaluated\n\n### Platform Strategy\nAlignment with business objectives and organizational goals. How well does your platform strategy serve the broader business needs?\n\n### Developer Experience\nSelf-service capabilities and tooling. Can developers easily discover, use, and contribute to the platform without bottlenecks?\n\n### Platform Operations\nReliability, observability, and automation. How mature are your operational practices for keeping the platform healthy?\n\n### Platform Evolution\nContinuous improvement and adaptation. Do you have feedback loops and processes to evolve the platform based on user needs?\n\n### Organizational Alignment\nCulture, skills, and governance. Is the organization structured to support and sustain the platform effectively?\n\n## How To Use This Model\n\n1. Assess your current state across each dimension\n2. Identify gaps and opportunities\n3. Create a roadmap for improvement\n4. Revisit periodically to track progress\n\n## External Resources\n\n- [CNCF Maturity Model](https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/#model-table)',
    'Maturity Model',
    'PUBLISHED',
    '10 min read',
    ARRAY['Platform Leaders', 'CTOs'],
    NULL,
    '{"cncf": "https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/#model-table"}'::jsonb,
    'cm7t2x9b20002ct0kwherestart',
    'cm7t2x9a10003pe0kandreakl',
    now(),
    CURRENT_TIMESTAMP
  ),
  (
    'cm7t2x9d40006rs0ktoollands',
    'Platform Tooling Landscape',
    'platform-tooling-landscape',
    'Comprehensive overview of the tools and technologies that make up a modern platform engineering ecosystem.',
    'Content coming soon.',
    'Guide',
    'COMING_SOON',
    '15 min read',
    ARRAY['Platform Engineers', 'DevOps Teams'],
    NULL,
    NULL,
    'cm7t2x9b20002ct0kwherestart',
    'cm7t2x9a10001pe0kslndrstm',
    now(),
    CURRENT_TIMESTAMP
  ),
  (
    'cm7t2x9d40007rs0kkickoffap',
    'Platform Engineering Kickoff Approach',
    'platform-engineering-kickoff-approach',
    'Step-by-step methodology for initiating and launching your platform engineering transformation journey.',
    'Content coming soon.',
    'Methodology',
    'COMING_SOON',
    '20 min read',
    ARRAY['Platform Leaders', 'Engineering Managers'],
    NULL,
    NULL,
    'cm7t2x9b20002ct0kwherestart',
    'cm7t2x9a10002pe0kgielenrl',
    now(),
    CURRENT_TIMESTAMP
  )
ON CONFLICT (slug) DO NOTHING;

-- ─── Resources: Starting And Progressing ────────────────────────────────────────

INSERT INTO "Resource" (id, title, slug, description, body, type, status, "readTime", "targetAudience", "thumbnailUrl", "externalLinks", "categoryId", "authorId", "createdAt", "updatedAt")
VALUES
  (
    'cm7t2x9d40008rs0kengagecan',
    'PE Engagement Canvas',
    'pe-engagement-canvas',
    'Visual framework for understanding and planning stakeholder engagement in platform engineering initiatives.',
    'Content coming soon.',
    'Canvas',
    'COMING_SOON',
    '30 min workshop',
    ARRAY['Product Managers', 'Platform Leaders'],
    NULL,
    NULL,
    'cm7t2x9b20003ct0kstartprogr',
    'cm7t2x9a10002pe0kgielenrl',
    now(),
    CURRENT_TIMESTAMP
  ),
  (
    'cm7t2x9d40009rs0kenablecan',
    'PE Enablement Services Canvas',
    'pe-enablement-services-canvas',
    'Map and design the services your platform will provide to enable development teams effectively.',
    'Content coming soon.',
    'Canvas',
    'COMING_SOON',
    '30 min workshop',
    ARRAY['Platform Engineers', 'Service Designers'],
    NULL,
    NULL,
    'cm7t2x9b20003ct0kstartprogr',
    'cm7t2x9a10003pe0kandreakl',
    now(),
    CURRENT_TIMESTAMP
  ),
  (
    'cm7t2x9d40010rs0kfundingdx',
    'Platform Funding Design',
    'platform-funding-design',
    'Strategic approaches to securing sustainable funding and business case development for platform initiatives.',
    'Content coming soon.',
    'Framework',
    'COMING_SOON',
    '15 min read',
    ARRAY['Platform Leaders', 'Finance Teams'],
    NULL,
    NULL,
    'cm7t2x9b20003ct0kstartprogr',
    'cm7t2x9a10001pe0kslndrstm',
    now(),
    CURRENT_TIMESTAMP
  ),
  (
    'cm7t2x9d40011rs0kuserneedm',
    'User Needs Mapping',
    'user-needs-mapping',
    'Systematic approach to understanding and documenting the needs of developers and teams using your platform.',
    'Content coming soon.',
    'Method',
    'COMING_SOON',
    '20 min read',
    ARRAY['Product Managers', 'UX Designers'],
    NULL,
    NULL,
    'cm7t2x9b20003ct0kstartprogr',
    'cm7t2x9a10003pe0kandreakl',
    now(),
    CURRENT_TIMESTAMP
  ),
  (
    'cm7t2x9d40012rs0kstorytell',
    'Story Telling on Different Levels',
    'storytelling-on-different-levels',
    'Effective communication strategies for platform engineering across organizational levels and stakeholders.',
    'Content coming soon.',
    'Guide',
    'COMING_SOON',
    '12 min read',
    ARRAY['Platform Leaders', 'Communication Teams'],
    NULL,
    NULL,
    'cm7t2x9b20003ct0kstartprogr',
    'cm7t2x9a10002pe0kgielenrl',
    now(),
    CURRENT_TIMESTAMP
  ),
  (
    'cm7t2x9d40013rs0kfindsponx',
    'Find Sponsors and Core Team',
    'find-sponsors-and-core-team',
    'Strategies for identifying, engaging, and building relationships with key sponsors and assembling your core platform team.',
    'Content coming soon.',
    'Strategy',
    'COMING_SOON',
    '15 min read',
    ARRAY['Platform Leaders', 'HR Partners'],
    NULL,
    NULL,
    'cm7t2x9b20003ct0kstartprogr',
    'cm7t2x9a10001pe0kslndrstm',
    now(),
    CURRENT_TIMESTAMP
  )
ON CONFLICT (slug) DO NOTHING;

-- ─── Resource-to-Tag Join Table (_ResourceToTag) ────────────────────────────────
-- Prisma implicit many-to-many: column "A" = Resource ID, column "B" = Tag ID

INSERT INTO "_ResourceToTag" ("A", "B")
VALUES
  -- Introduction to platform engineering -> platform-engineering, devops, developer-experience
  ('cm7t2x9d40001rs0kintroplat', 'cm7t2x9c30001tg0kplatengine'),
  ('cm7t2x9d40001rs0kintroplat', 'cm7t2x9c30002tg0kdevopsrun'),
  ('cm7t2x9d40001rs0kintroplat', 'cm7t2x9c30003tg0kdevexperx'),

  -- Creating a platform as a system of value -> platform-engineering, strategy, workshop
  ('cm7t2x9d40002rs0kcreatplat', 'cm7t2x9c30001tg0kplatengine'),
  ('cm7t2x9d40002rs0kcreatplat', 'cm7t2x9c30004tg0kstrategyp'),
  ('cm7t2x9d40002rs0kcreatplat', 'cm7t2x9c30009tg0kworkshopx'),

  -- The Platform Engineering Tool Map -> platform-engineering, tooling, canvas
  ('cm7t2x9d40003rs0ktoolmapxx', 'cm7t2x9c30001tg0kplatengine'),
  ('cm7t2x9d40003rs0ktoolmapxx', 'cm7t2x9c30005tg0ktoolingmp'),
  ('cm7t2x9d40003rs0ktoolmapxx', 'cm7t2x9c30010tg0kcanvasxxx'),

  -- Architecture for Flow -> architecture, team-topologies, strategy
  ('cm7t2x9d40004rs0karchflow', 'cm7t2x9c30006tg0karchitect'),
  ('cm7t2x9d40004rs0karchflow', 'cm7t2x9c30007tg0kteamtopol'),
  ('cm7t2x9d40004rs0karchflow', 'cm7t2x9c30004tg0kstrategyp'),

  -- PE Maturity Model (by CNCF) -> maturity-model, platform-engineering, strategy
  ('cm7t2x9d40005rs0kmaturitym', 'cm7t2x9c30008tg0kmaturitym'),
  ('cm7t2x9d40005rs0kmaturitym', 'cm7t2x9c30001tg0kplatengine'),
  ('cm7t2x9d40005rs0kmaturitym', 'cm7t2x9c30004tg0kstrategyp'),

  -- Platform Tooling Landscape -> tooling, platform-engineering
  ('cm7t2x9d40006rs0ktoollands', 'cm7t2x9c30005tg0ktoolingmp'),
  ('cm7t2x9d40006rs0ktoollands', 'cm7t2x9c30001tg0kplatengine'),

  -- Platform Engineering Kickoff Approach -> methodology, platform-engineering
  ('cm7t2x9d40007rs0kkickoffap', 'cm7t2x9c30011tg0kmethodolx'),
  ('cm7t2x9d40007rs0kkickoffap', 'cm7t2x9c30001tg0kplatengine'),

  -- PE Engagement Canvas -> canvas, adoption
  ('cm7t2x9d40008rs0kengagecan', 'cm7t2x9c30010tg0kcanvasxxx'),
  ('cm7t2x9d40008rs0kengagecan', 'cm7t2x9c30012tg0kadoptionx'),

  -- PE Enablement Services Canvas -> canvas, developer-experience
  ('cm7t2x9d40009rs0kenablecan', 'cm7t2x9c30010tg0kcanvasxxx'),
  ('cm7t2x9d40009rs0kenablecan', 'cm7t2x9c30003tg0kdevexperx'),

  -- Platform Funding Design -> funding, strategy
  ('cm7t2x9d40010rs0kfundingdx', 'cm7t2x9c30013tg0kfundingxx'),
  ('cm7t2x9d40010rs0kfundingdx', 'cm7t2x9c30004tg0kstrategyp'),

  -- User Needs Mapping -> developer-experience, methodology
  ('cm7t2x9d40011rs0kuserneedm', 'cm7t2x9c30003tg0kdevexperx'),
  ('cm7t2x9d40011rs0kuserneedm', 'cm7t2x9c30011tg0kmethodolx'),

  -- Story Telling on Different Levels -> communication, adoption
  ('cm7t2x9d40012rs0kstorytell', 'cm7t2x9c30014tg0kcommunctn'),
  ('cm7t2x9d40012rs0kstorytell', 'cm7t2x9c30012tg0kadoptionx'),

  -- Find Sponsors and Core Team -> adoption, strategy
  ('cm7t2x9d40013rs0kfindsponx', 'cm7t2x9c30012tg0kadoptionx'),
  ('cm7t2x9d40013rs0kfindsponx', 'cm7t2x9c30004tg0kstrategyp')
ON CONFLICT DO NOTHING;
