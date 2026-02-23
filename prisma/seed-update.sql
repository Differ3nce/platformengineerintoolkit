-- =============================================================================
-- Platform Engineering Toolkit - Content Update
-- Adds missing resources and updates COMING_SOON items with actual content
-- Run in Supabase SQL Editor
-- =============================================================================

-- ─── New Tags ──────────────────────────────────────────────────────────────────

INSERT INTO "Tag" (id, name, slug)
VALUES
  ('cm7t2x9c30015tg0kwardleymp', 'wardley mapping', 'wardley-mapping'),
  ('cm7t2x9c30016tg0kmetricsxx', 'metrics', 'metrics'),
  ('cm7t2x9c30017tg0kservicexx', 'service design', 'service-design'),
  ('cm7t2x9c30018tg0kframewrkx', 'framework', 'framework')
ON CONFLICT (slug) DO NOTHING;

-- ─── NEW RESOURCES: Where To Start ─────────────────────────────────────────────

-- 1. Wardley Mapping
INSERT INTO "Resource" (id, title, slug, description, body, type, status, "readTime", "targetAudience", "externalLinks", "categoryId", "createdAt", "updatedAt")
VALUES (
  'cm7t2x9d40020rs0kwardleymp',
  'Wardley Mapping - Strategic Platform Planning',
  'wardley-mapping',
  'A strategic planning technique that helps you visualize the value chain of your platform ecosystem, understand component evolution, and develop informed strategy.',
  '## Wardley Mapping

Wardley Mapping is a strategic planning technique that helps you visualize the value chain of your platform ecosystem. It enables organizations to map system connections, understand component evolution, and develop strategy for their technology landscape.

### Why it matters for Platform Engineering

Wardley Mapping helps determine how platforms support other systems and informs organization-wide platform strategy. It is particularly valuable for:

- Mapping platform landscapes and dependencies
- Distinguishing between components to commoditize versus differentiate
- Planning platform evolution and technology adoption
- Understanding competitive dynamics
- Guiding investment and resource allocation decisions

### Getting Started

1. Start with the free book to understand the fundamentals
2. Progress through Simon Wardley''s video series
3. Create your first maps of your platform landscape
4. Run team workshops to build shared understanding
5. Apply insights to platform strategy and roadmaps',
  'Book, Guide, Video series',
  'PUBLISHED',
  '10 min read',
  ARRAY['Strategic planners', 'Architects'],
  '[{"label": "Learn Wardley Mapping - Free book and guide", "url": "https://learnwardleymapping.com/"}, {"label": "Simon Wardley Video Series", "url": "https://www.youtube.com/playlist?list=PLP0vnsXbJsRVZSbkzku-ApmJnPmwZMhgp"}]'::jsonb,
  'cm7t2x9b20002ct0kwherestart',
  now(), CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO NOTHING;

-- 2. PlatformOps - Understanding your landscape
INSERT INTO "Resource" (id, title, slug, description, body, type, status, "readTime", "targetAudience", "externalLinks", "categoryId", "createdAt", "updatedAt")
VALUES (
  'cm7t2x9d40021rs0kplatopslan',
  'PlatformOps - Understanding your landscape (Theme Park) tool',
  'platformops-landscape',
  'A diagnostic canvas for understanding what platforms exist, what they offer and how they are perceived — the first step towards improving at the organizational level.',
  '## PlatformOps - Platform Services Landscape Canvas

Understanding what platforms exist, what they offer and how they are perceived is the first step towards improving at the organizational level.

### What is it?

The Platform Services Landscape Canvas is a diagnostic instrument for organizations seeking to enhance enterprise-level operations. It facilitates visual mapping and discussion of internal platform services, designed to generate alignment across departments.

### Key Benefits

- Reveals service gaps in your platform landscape
- Identifies overlapping functions across teams
- Establishes a foundation for strategic platform discussions
- Generates alignment across departments

### How to use it

Run a collaborative workshop lasting 30-60 minutes that integrates perspectives from platform, product, and operations teams. Use the canvas to map out your current platform services landscape and identify opportunities for improvement.',
  'Tool',
  'PUBLISHED',
  '45 min workshop',
  ARRAY['Change Facilitators', 'Platform Engineers', 'Product Managers', 'Architects'],
  '[{"label": "PlatformOps Landscape - Summary and downloadable PDF", "url": "https://valuecraftstudio.com/platformops-landscape"}]'::jsonb,
  'cm7t2x9b20002ct0kwherestart',
  now(), CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO NOTHING;

-- 3. Team Topologies
INSERT INTO "Resource" (id, title, slug, description, body, type, status, "readTime", "targetAudience", "externalLinks", "categoryId", "createdAt", "updatedAt")
VALUES (
  'cm7t2x9d40022rs0kteamtopol',
  'Team Topologies - Organizing Teams for Platform Engineering Success',
  'team-topologies',
  'The leading approach to organizing business and technology teams for a fast flow of value, essential for platform engineering success.',
  '## Team Topologies

Team Topologies is the leading approach to organizing business and technology teams for a fast flow of value.

### Platform Engineering and Team Topologies

Team Topologies is essential for platform engineering success — not just in shaping the platform team itself, but in applying its principles of Platform as Product, team design, interaction modes, and cognitive load management.

The framework establishes conditions enabling platforms to gain adoption, provide measurable benefits, and adapt over time.

### Getting Started

Two primary resources to begin with:

1. **The Platform Manifesto** — Outlines core principles defining platform engineering as a formal discipline
2. **Team Topologies Site** — Comprehensive guidance on structuring teams and defining how they interact',
  'Framework',
  'PUBLISHED',
  '8 min read',
  ARRAY['Team leads', 'Organizational designers'],
  '[{"label": "The Platform Manifesto", "url": "https://teamtopologies.com/platform-manifesto"}, {"label": "Team Topologies", "url": "https://teamtopologies.com/"}]'::jsonb,
  'cm7t2x9b20002ct0kwherestart',
  now(), CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO NOTHING;

-- ─── NEW RESOURCES: Starting And Progressing ────────────────────────────────────

-- 4. Service Blueprint
INSERT INTO "Resource" (id, title, slug, description, body, type, status, "readTime", "targetAudience", "externalLinks", "categoryId", "createdAt", "updatedAt")
VALUES (
  'cm7t2x9d40023rs0kserviceblu',
  'Service Blueprint - Visualizing how your platform is consumed',
  'service-blueprint',
  'A valuable UX technique adapted for platform product management, synthesizing user journey mapping alongside platform system engagement.',
  '## Service Blueprint

The service blueprint is a valuable instrument borrowed from UX practices for platform product management. This tool synthesizes user journey mapping (focusing on internal users) alongside their engagement with underlying platform systems.

### When to use it

Organizations can deploy this technique during workshops and interviews to clarify how users interact with platforms and identify friction points. It particularly emphasizes the importance of straightforward platform onboarding and usability — addressing a common shortcoming in conventional IT Service management approaches.

### Resources

- NN Group article on service blueprints — definitions and applications
- Miro template for a structured format for service blueprint journey operations',
  'Workshop',
  'PUBLISHED',
  '30 min workshop',
  ARRAY['Product managers'],
  '[{"label": "Service Blueprint - NN Group article", "url": "https://www.nngroup.com/articles/service-blueprints-definition/"}, {"label": "Miro Service Blueprint Template", "url": "https://miro.com/templates/service-blueprint/"}]'::jsonb,
  'cm7t2x9b20003ct0kstartprogr',
  now(), CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO NOTHING;

-- 5. PE Metrics Overview
INSERT INTO "Resource" (id, title, slug, description, body, type, status, "readTime", "targetAudience", "externalLinks", "categoryId", "createdAt", "updatedAt")
VALUES (
  'cm7t2x9d40024rs0kpemetricsv',
  'Platform Engineering metrics overview',
  'pe-metrics-overview',
  'An overview of multiple metrics frameworks for measuring developer productivity and platform effectiveness, including DORA, SPACE, and DevEx.',
  '## Platform Engineering Metrics Overview

There are many metrics available to measure developer productivity and effectiveness of platforms. This resource provides an overview of the most prominent frameworks.

### Important note on culture

While metrics offer organizational insights, they require a safety culture to prevent misuse. Most metrics can easily be gamified and at that point become useless.

### Frameworks

**DORA** — Originally designed for DevOps teams measuring delivery outcomes, applicable to both platform teams and stream-aligned teams using platforms.

**SPACE** — A newer framework with broader scope covering five domains, offering flexibility for organizational customization. Valuable for measuring platform impact on stream-aligned teams.

**DevEx** — Explicitly focused on platform engineering and developer experience effectiveness, though lacking adoption and ROI metrics.

**DX Core 4 and ESSP** — Recently released frameworks (end of 2024 and early 2025) attempting holistic approaches combining multiple frameworks, with explicit executive focus.',
  'Framework',
  'PUBLISHED',
  '10 min read',
  ARRAY['Product managers', 'Platform teams', 'Platform leaders'],
  '[{"label": "Comprehensive metrics comparison by Lothar Schulz", "url": "https://lotharschulz.info/2025/01/20/developer-productivity-metrics-frameworks/"}, {"label": "DORA metrics", "url": "https://dora.dev/"}, {"label": "SPACE framework", "url": "https://queue.acm.org/detail.cfm?id=3454124"}, {"label": "DevEx framework", "url": "https://dl.acm.org/doi/10.1145/3639443"}]'::jsonb,
  'cm7t2x9b20003ct0kstartprogr',
  now(), CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO NOTHING;

-- ─── NEW COMING SOON RESOURCES: Where To Start ──────────────────────────────────

-- Platform Flow Quick Evaluation
INSERT INTO "Resource" (id, title, slug, description, body, type, status, "readTime", "targetAudience", "externalLinks", "categoryId", "createdAt", "updatedAt")
VALUES (
  'cm7t2x9d40025rs0kplatflowqe',
  'Platform Flow, Quick Evaluation',
  'platform-flow-quick-evaluation',
  'A canvas for quickly evaluating the flow of value through your platform ecosystem.',
  'Content coming soon.',
  'Canvas',
  'COMING_SOON',
  NULL,
  ARRAY['Transformation & Platform Leaders', 'Change Managers', 'Product Managers'],
  NULL,
  'cm7t2x9b20002ct0kwherestart',
  now(), CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO NOTHING;

-- Describe your vision
INSERT INTO "Resource" (id, title, slug, description, body, type, status, "readTime", "targetAudience", "externalLinks", "categoryId", "createdAt", "updatedAt")
VALUES (
  'cm7t2x9d40026rs0kdescvision',
  'Describe your vision and the problem you want to solve',
  'describe-vision',
  'Guidance on articulating your platform engineering vision and the problems you aim to solve.',
  'Content coming soon.',
  'Article',
  'COMING_SOON',
  NULL,
  ARRAY['Platform leaders', 'Product managers'],
  NULL,
  'cm7t2x9b20002ct0kwherestart',
  now(), CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO NOTHING;

-- PE Pilot Characteristics
INSERT INTO "Resource" (id, title, slug, description, body, type, status, "readTime", "targetAudience", "externalLinks", "categoryId", "createdAt", "updatedAt")
VALUES (
  'cm7t2x9d40027rs0kpepilotchr',
  'Platform Engineering pilot characteristics - What makes a good pilot candidate?',
  'pe-pilot-characteristics',
  'A tool for identifying the characteristics that make a good pilot candidate for platform engineering initiatives.',
  'Content coming soon.',
  'Tool',
  'COMING_SOON',
  NULL,
  ARRAY['Transformation leads'],
  NULL,
  'cm7t2x9b20002ct0kwherestart',
  now(), CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO NOTHING;

-- ─── UPDATE COMING_SOON → PUBLISHED with real content ───────────────────────────

-- 6. Storytelling on Different Levels
UPDATE "Resource"
SET
  status = 'PUBLISHED',
  title = 'Case Study: Explain your what and why to different levels',
  description = 'A conference talk sharing communication strategy lessons from a large enterprise implementation of Team Topologies and Platform Engineering.',
  body = '## Story Telling on Different Levels

The what and why of platform engineering need to be broadcasted to the rest of an organization for its success.

### Conference Talk: Combining Team Topologies and Platform Engineering at ASML IT

Within an IT organization of thousands, the company faced challenges navigating interdependent shared services. Through cross-functional analysis using Team Topologies and Platform Engineering frameworks, they identified that streamlining dependencies in shared services was key to unlocking value flow.

### Key Takeaways

- Create traction by involving different layers with an appropriate message
- Leverage industry knowledge
- Involve line management
- Repeat your story 10x more than you think is necessary',
  type = 'Video Case Study',
  "readTime" = '30 min watch',
  "targetAudience" = ARRAY['Transformation & Platform Leaders', 'Change Managers', 'Product Managers'],
  "externalLinks" = '[{"label": "Unlocking Flow: Combining Team Topologies and Platform Engineering at ASML IT - YouTube", "url": "https://www.youtube.com/watch?v=o8MzMj2ol4w"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'storytelling-on-different-levels';

-- 7. User Needs Mapping
UPDATE "Resource"
SET
  status = 'PUBLISHED',
  description = 'A quick way to start with Wardley Mapping in practice by centering on users and constructing technical systems and organizational structures from that foundation.',
  body = '## User Needs Mapping

Developed by Rich Allen, User Needs Mapping offers a quick way to start with Wardley Mapping in practice by centering on users and constructing technical systems and organizational structures from that foundation.

### Use it when you want to:

- Create a shared picture of your users needs and whether they align to your organizational goals
- Visualize link between user needs and capabilities, including dependencies
- Determine whether the current team setup can be improved by optimizing team boundaries

This approach has similarities with Architecture for Flow.

### Resources

- User Needs Mapping canvas and instructions
- From Inside Out to Outside-In: Aligning Teams Around What Matters (overview presentation)
- Exploring Team and Service Boundaries with User Needs Mapping (overview article)',
  type = 'Mapping, Book',
  "readTime" = '15 min read',
  "targetAudience" = ARRAY['Product Managers', 'UX Researchers', 'Platform Teams', 'Architects'],
  "externalLinks" = '[{"label": "User Needs Mapping - Canvas and instructions", "url": "https://userneedsmapping.com/"}, {"label": "From Inside Out to Outside-In - Overview presentation", "url": "https://www.youtube.com/watch?v=UYbTZzvk_C0"}, {"label": "Exploring Team and Service Boundaries with User Needs Mapping", "url": "https://teamtopologies.com/key-concepts-content/exploring-team-and-service-boundaries-with-user-needs-mapping"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'user-needs-mapping';

-- 8. Platform Enablement Services Canvas
UPDATE "Resource"
SET
  status = 'PUBLISHED',
  description = 'A canvas for determining what types of services teams need to leverage a platform, looking beyond purely technical elements.',
  body = '## Platform Enablement Services Canvas

When building or enhancing platforms, it is straightforward to focus exclusively on technical elements — CI/CD, infrastructure automation, security — but these represent only partial value delivery.

### Why this canvas?

This tool directs focus beyond purely technical considerations. It provides visibility into the comprehensive range of services that genuinely establish platform value and usability, encompassing areas like onboarding and documentation to support, feedback loops, and innovation enablement.

### Key Benefits

- Structuring conversations between platform teams and users
- Identifying service gaps within the broader platform context
- Making capabilities clear to decision-makers
- Creating alignment around enhancement priorities

### Resources

The introduction article contains the canvas framework and manual.',
  type = 'Canvas',
  "readTime" = '15 min read',
  "targetAudience" = ARRAY['Product managers', 'Service Designers', 'Platform Teams', 'Architects'],
  "externalLinks" = '[{"label": "Platform Enablement Services Canvas - LinkedIn article with canvas and manual", "url": "https://www.linkedin.com/pulse/platform-enablement-services-canvas-gielen-rojas-l%25C3%25B3pez-eqive/"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'pe-enablement-services-canvas';

-- 9. Platform Tooling Landscape
UPDATE "Resource"
SET
  status = 'PUBLISHED',
  description = 'An overview of a typical platform landscape with several tool examples, providing insights into tools typically provided within an enterprise.',
  body = '## Platform Tooling Landscape

An overview of a typical platform landscape with several tool examples. While not comprehensive, it does provide insights in several tools that typically are provided within an enterprise and its platforms.

### Resources

- Platform tooling landscape overview at platformengineering.org
- The community behind it with useful in-depth resources',
  type = 'Architecture',
  "readTime" = '10 min read',
  "targetAudience" = ARRAY['Platform Engineers', 'Architects', 'Product managers'],
  "externalLinks" = '[{"label": "Platform tooling landscape overview", "url": "https://platformengineering.org/platform-tooling"}, {"label": "Platformengineering.org community resources", "url": "https://platformengineering.org/"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'platform-tooling-landscape';

-- ─── REMOVE resources not on original site ──────────────────────────────────────

-- "Find Sponsors and Core Team" doesn't exist on original site
DELETE FROM "_ResourceToTag" WHERE "A" = (SELECT id FROM "Resource" WHERE slug = 'find-sponsors-and-core-team');
DELETE FROM "Resource" WHERE slug = 'find-sponsors-and-core-team';

-- "PE Engagement Canvas" doesn't exist on original (original has "PE Change Engagement Canvas" as coming soon)
-- Update it to match the original
UPDATE "Resource"
SET
  title = 'Platform Engineering Change Engagement Canvas',
  slug = 'pe-change-engagement-canvas',
  description = 'A canvas tool for change communication in platform engineering initiatives.',
  "targetAudience" = ARRAY['Change manager', 'Transformation lead'],
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'pe-engagement-canvas';

-- ─── UPDATE existing published content to better match original ─────────────────

-- Update Introduction article
UPDATE "Resource"
SET
  body = '## Platform Engineering: A Friendly Introduction

Platform engineering is a discipline with deep roots spanning decades, though its focus, methods, and applications have substantially transformed. While optimization and automation have remained priorities, the underlying drivers and execution approaches have shifted dramatically.

### The Theme Park Analogy

Think of organizational platforms like a theme park — interconnected attractions and services requiring flawless coordination. A platform is not just technology — it is a system of people, processes, and tools working together to deliver value through services.

### Core Objectives

Grounded in DevOps traditions, platform engineering emphasizes reducing system complexity, embedding automated processes, establishing consistent standards, and preventing failures. The primary aims center on quickening delivery timelines and ensuring uniformity. Successfully implemented, it cultivates organizational alignment, enables growth, accelerates operations, and establishes sound oversight structures.

Platform Engineering enables individual product teams to concentrate on their distinctive offerings while depending on consistent, accessible, dependable resources.

### Service Delivery Model

Organizations often deliver these capabilities through an Internal Developer Platform (IDP). Though developers represent a typical audience, users encompass broader constituencies. Service consumption follows the X-as-a-Service (XaaS) model emphasizing accessibility.

### Success Requirements

Achievement depends significantly on organizational capabilities and operational approaches:

- **Clear vision and objectives** directing platform intent
- **Investment** spanning personnel and infrastructure
- **Engineering expertise** supporting contemporary methodologies
- **Product mindset** enabling continuous platform development
- **Service mindset** guaranteeing dependable, well-maintained offerings
- **Adoption focus** supporting user success
- **Platform teams** possessing appropriate structure, flow-oriented processes, and suitable perspectives',
  "readTime" = '8 min read',
  "targetAudience" = ARRAY['Anyone interested'],
  "externalLinks" = '[{"label": "Microsoft Learn: Platform Engineering Guide", "url": "https://learn.microsoft.com/en-us/platform-engineering/"}, {"label": "Google Cloud: Platform Engineering", "url": "https://cloud.google.com/resources/platform-engineering"}, {"label": "PlatformEngineering.org: What is Platform Engineering", "url": "https://platformengineering.org/blog/what-is-platform-engineering"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'introduction-to-platform-engineering';

-- Update "Creating a platform as a system of value" to match original title and content
UPDATE "Resource"
SET
  title = 'Platform Engineering: Conditions for Success',
  description = 'A position paper synthesizing practical field experience to describe important factors supporting platform advancement in enterprise environments.',
  body = '## Platform Engineering: Conditions for Success

Organizations failing to intentionally modernize their internal platforms often encounter slower delivery cycles, mounting operational challenges, and a disconnect between technology spending and tangible business returns.

Platforms form part of a connected landscape. Their success depends not only on tooling, but on how platforms are designed, operated, governed, and evolved over time.

This position paper by Gielen Rojas-Lopez synthesizes practical field experience to describe important factors supporting platform advancement in enterprise environments, offering a structured lens — not a prescription.

### What the paper clarifies

- **Why** Platform Engineering extends beyond technology tooling
- **What** conditions teams and platforms require for achievement
- Industry patterns validating this viewpoint

### Use this when you want to:

- Grasp core factors affecting Platform Engineering results
- Approach platform development discussions methodically
- Pinpoint areas needing focused stakeholder engagement',
  type = 'Article',
  "readTime" = '15 min read',
  "targetAudience" = ARRAY['C-Board', 'Tech Leads', 'Transformation & Platform Leaders'],
  "externalLinks" = '[{"label": "Full paper: Platform Engineering, Conditions for Success", "url": "https://valuecraftstudio.com/platform-engineering-1"}, {"label": "Platform Engineering, beyond the Tech stack (LinkedIn)", "url": "https://www.linkedin.com/pulse/platform-engineering-beyond-tech-stack-gielen-rojas-l%25C3%25B3pez-blfge/"}, {"label": "From Anti-patterns to Evolutionary PlatformOps (LinkedIn)", "url": "https://www.linkedin.com/pulse/from-anti-patterns-evolutionary-platformops-gielen-rojas-l%25C3%25B3pez-tlkge/"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'creating-platform-as-value-system';

-- Update Architecture for Flow to match original
UPDATE "Resource"
SET
  description = 'Guidance for designing adaptive, socio-technical systems using a combination of Wardley Mapping, Domain-Driven Design, and Team Topologies.',
  body = '## Architecture for Flow Canvas

Developed by Susanne Kaiser, the Architecture for Flow Canvas offers guidance for designing adaptive, socio-technical systems. It combines Wardley Mapping, Domain-Driven Design, and Team Topologies into a structured way so that organizations can explore and align strategy, architecture, and team design.

### Use it when you want to:

- Create a shared picture of how systems and teams should evolve
- Align business, technical, and organizational perspectives
- Support decision-making in complex, fast-changing environments

This approach has similarities with User Needs Mapping, but has a broader and more thorough scope.',
  "targetAudience" = ARRAY['System Architects', 'Platform Engineers'],
  "externalLinks" = '[{"label": "Architecture for Flow Canvas - Interactive canvas and toolkit", "url": "https://architectureforflow.com/"}, {"label": "Video introduction to the foundational concepts", "url": "https://www.youtube.com/watch?v=Kkb1aOmjJDM"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'architecture-for-flow';

-- Update PE Maturity Model to match original
UPDATE "Resource"
SET
  description = 'A framework for reflection and for identifying opportunities for improvement in any organization leveraging platforms.',
  body = '## Platform Engineering Maturity Model (by CNCF)

A framework for reflection and for identifying opportunities for improvement in any organization leveraging platforms. The model uses five measurement categories suited for platform implementation.

### Key Insight

Maturity models are not merely checklists — the conversation driven by the model can help you mature. Use it as a tool for reflection and discussion rather than a scorecard.

### Resources

- Maturity model by CNCF (direct model table)
- Full introductory article on the model
- Platform Engineering Capability Model by Microsoft — a derivative extending CNCF''s work with a cloud-computing focus',
  "targetAudience" = ARRAY['Product managers', 'Platform Engineers', 'Architects', 'Transformation leads'],
  "externalLinks" = '[{"label": "CNCF Platform Engineering Maturity Model", "url": "https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/"}, {"label": "Introduction to the maturity model", "url": "https://www.cncf.io/blog/2023/04/11/platform-engineering-maturity-model/"}, {"label": "Microsoft Platform Engineering Capability Model", "url": "https://learn.microsoft.com/en-us/platform-engineering/capability-model"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'pe-maturity-model';

-- ─── Tag new resources ──────────────────────────────────────────────────────────

-- Wardley Mapping tags
INSERT INTO "_ResourceToTag" ("A", "B")
VALUES
  ((SELECT id FROM "Resource" WHERE slug = 'wardley-mapping'), (SELECT id FROM "Tag" WHERE slug = 'wardley-mapping')),
  ((SELECT id FROM "Resource" WHERE slug = 'wardley-mapping'), (SELECT id FROM "Tag" WHERE slug = 'strategy')),
  ((SELECT id FROM "Resource" WHERE slug = 'wardley-mapping'), (SELECT id FROM "Tag" WHERE slug = 'platform-engineering'))
ON CONFLICT DO NOTHING;

-- PlatformOps Landscape tags
INSERT INTO "_ResourceToTag" ("A", "B")
VALUES
  ((SELECT id FROM "Resource" WHERE slug = 'platformops-landscape'), (SELECT id FROM "Tag" WHERE slug = 'canvas')),
  ((SELECT id FROM "Resource" WHERE slug = 'platformops-landscape'), (SELECT id FROM "Tag" WHERE slug = 'platform-engineering')),
  ((SELECT id FROM "Resource" WHERE slug = 'platformops-landscape'), (SELECT id FROM "Tag" WHERE slug = 'workshop'))
ON CONFLICT DO NOTHING;

-- Team Topologies tags
INSERT INTO "_ResourceToTag" ("A", "B")
VALUES
  ((SELECT id FROM "Resource" WHERE slug = 'team-topologies'), (SELECT id FROM "Tag" WHERE slug = 'team-topologies')),
  ((SELECT id FROM "Resource" WHERE slug = 'team-topologies'), (SELECT id FROM "Tag" WHERE slug = 'platform-engineering')),
  ((SELECT id FROM "Resource" WHERE slug = 'team-topologies'), (SELECT id FROM "Tag" WHERE slug = 'framework'))
ON CONFLICT DO NOTHING;

-- Service Blueprint tags
INSERT INTO "_ResourceToTag" ("A", "B")
VALUES
  ((SELECT id FROM "Resource" WHERE slug = 'service-blueprint'), (SELECT id FROM "Tag" WHERE slug = 'service-design')),
  ((SELECT id FROM "Resource" WHERE slug = 'service-blueprint'), (SELECT id FROM "Tag" WHERE slug = 'workshop')),
  ((SELECT id FROM "Resource" WHERE slug = 'service-blueprint'), (SELECT id FROM "Tag" WHERE slug = 'developer-experience'))
ON CONFLICT DO NOTHING;

-- PE Metrics tags
INSERT INTO "_ResourceToTag" ("A", "B")
VALUES
  ((SELECT id FROM "Resource" WHERE slug = 'pe-metrics-overview'), (SELECT id FROM "Tag" WHERE slug = 'metrics')),
  ((SELECT id FROM "Resource" WHERE slug = 'pe-metrics-overview'), (SELECT id FROM "Tag" WHERE slug = 'platform-engineering')),
  ((SELECT id FROM "Resource" WHERE slug = 'pe-metrics-overview'), (SELECT id FROM "Tag" WHERE slug = 'strategy'))
ON CONFLICT DO NOTHING;

-- Platform Flow Quick Evaluation tags
INSERT INTO "_ResourceToTag" ("A", "B")
VALUES
  ((SELECT id FROM "Resource" WHERE slug = 'platform-flow-quick-evaluation'), (SELECT id FROM "Tag" WHERE slug = 'canvas')),
  ((SELECT id FROM "Resource" WHERE slug = 'platform-flow-quick-evaluation'), (SELECT id FROM "Tag" WHERE slug = 'platform-engineering'))
ON CONFLICT DO NOTHING;

-- Describe Vision tags
INSERT INTO "_ResourceToTag" ("A", "B")
VALUES
  ((SELECT id FROM "Resource" WHERE slug = 'describe-vision'), (SELECT id FROM "Tag" WHERE slug = 'strategy')),
  ((SELECT id FROM "Resource" WHERE slug = 'describe-vision'), (SELECT id FROM "Tag" WHERE slug = 'platform-engineering'))
ON CONFLICT DO NOTHING;

-- PE Pilot Characteristics tags
INSERT INTO "_ResourceToTag" ("A", "B")
VALUES
  ((SELECT id FROM "Resource" WHERE slug = 'pe-pilot-characteristics'), (SELECT id FROM "Tag" WHERE slug = 'methodology')),
  ((SELECT id FROM "Resource" WHERE slug = 'pe-pilot-characteristics'), (SELECT id FROM "Tag" WHERE slug = 'platform-engineering'))
ON CONFLICT DO NOTHING;
