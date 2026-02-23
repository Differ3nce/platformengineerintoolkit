-- =============================================================================
-- Platform Engineering Toolkit - Content Seed Fix
-- Updates ALL resource content from markdown source files
-- Uses PostgreSQL dollar-quoting ($body$...$body$) for safe body content
-- externalLinks now include optional "description" field
-- Run in Supabase SQL Editor
-- Generated: 2026-02-23
-- =============================================================================

-- 1. Introduction to Platform Engineering
UPDATE "Resource"
SET
  title = 'Introduction to platform engineering',
  description = 'A friendly introduction to platform engineering: what it is, how it works, and what it needs to succeed.',
  body = $body$## Platform Engineering: A Friendly Introduction

Engineering for platforms has existed for decades. What has evolved is **what** is engineered, **how**, and **for what purpose**. Advances in technology, new practices, and growing complexity have reshaped the discipline. The drive to optimise and automate remains constant, but the reasons behind it and the mechanisms used have changed significantly.

Think of a **theme park**: a network of rides, shows, and services, all interdependent. For visitors to have a seamless experience, everything must work reliably, safely, and in coordination. Behind the scenes sits a layered, complex system ensuring this happens.

Organisations and their platforms operate in the same way. A platform is not just technology — it is a system of people, processes, and tools working together to deliver value through services. Platforms usually exist at different levels of abstraction — from infrastructure foundations to developer enablement — and often share critical dependencies.

Rooted in DevOps principles, **Platform Engineering** provides a structured approach to reduce complexity, embed automation, standardise what can be standardised, and minimise errors. Its objective is clear: accelerate delivery and improve consistency. Done well, it enables cohesiveness, scalability, speed, and effective governance across the organisation.

Returning to the theme park analogy: Platform Engineering allows each "ride" or product team to focus on its unique experience while relying on standardised, on-demand, self-service, and reliable components.

These services may be provided through an **Internal Developer Platform (IDP)**. While the name suggests developers, consumers are not always developers, nor do they always see themselves as such. The way services are consumed follows the familiar **X-as-a-Service (XaaS)** model, rooted in service provision and ease of access.

Continue exploring the toolkit, share it if it resonates with you, and contribute where you can — then apply what fits in your context.

## What Does Platform Engineering Need?

Technology and tooling are important, but success depends just as much — if not more — on capabilities and ways of working. At a high level, it relies on:

- **Clear vision and objectives** to guide the platform's purpose.
- **Investment** in both people and technology.
- **Engineering expertise** to support modern practices.
- **A product mindset** so the platform continually evolves as a product.
- **A service mindset** so platform services are reliable and well-managed.
- **Adoption focus**, ensuring the people who use the platform can succeed with it.
- **Platform teams** with the right structure, flow-oriented ways of working, and mindset.

To assess these capabilities, explore the **Platform Engineering Maturity Models** under the *Starting & Progressing* section of this site.$body$,
  type = 'Article',
  "readTime" = '8 min read',
  "targetAudience" = ARRAY['Anyone interested'],
  "externalLinks" = '[
    {"label": "Platform Engineering Guide | Microsoft Learn", "url": "https://learn.microsoft.com/en-us/platform-engineering/"},
    {"label": "Google Cloud: Platform Engineering", "url": "https://cloud.google.com/solutions/platform-engineering"},
    {"label": "AWS Platform Perspective", "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/aws-caf-platform-perspective/platform-eng.html"},
    {"label": "PlatformEngineering.org: What is Platform Engineering", "url": "https://platformengineering.org/blog/what-is-platform-engineering"}
  ]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'introduction-to-platform-engineering';

-- 2. PlatformOps - Platforms as systems of value
UPDATE "Resource"
SET
  title = 'PlatformOps - Platforms as systems of value',
  description = 'A position paper on the key considerations that shape successful platform evolution in complex enterprises.',
  body = $body$## Platform Engineering: Conditions for Success

Organisations that do not deliberately evolve their internal platforms often struggle with slower change, rising operational complexity, and a widening gap between technology investment and realised business value.

Those that move ahead recognise that platforms form part of a connected landscape. Their success depends not only on tooling, but on how platforms are designed, operated, governed, and evolved over time. When treated as systems of value, platforms can become engines of resilience, adaptability, and sustained business impact.

This position paper by Gielen Rojas-López brings together years of hands-on experience to outline the key considerations that shape successful platform evolution in complex enterprises. It offers a structured lens — not a prescription — for understanding what needs attention and why.

The paper clarifies:

- **Why** Platform Engineering matters beyond the tech stack
- **What** conditions platforms and teams need in order to succeed
- Industry patterns and insights that support this perspective

## Use it when you want to

- Understand the key considerations influencing Platform Engineering outcomes.
- Frame platform evolution conversations in a structured and practice-informed way.
- Identify areas and stakeholders that require deliberate attention.$body$,
  type = 'Article',
  "readTime" = '15 min read',
  "targetAudience" = ARRAY['C-Board', 'Transformation', 'Change', 'ITSM & Platform Leaders'],
  "externalLinks" = '[
    {"label": "PlatformOps - Platforms as systems of value", "url": "https://valuecraftstudio.com/platform-engineering-1", "description": "Full paper"},
    {"label": "Platform Engineering, beyond the Tech stack", "url": "https://www.linkedin.com/pulse/platform-engineering-beyond-tech-stack-gielen-rojas-lopez-ae7ne/?trackingId=mU1CYGp%2BR6GZDD2x7H7kmw%3D%3D", "description": "Related article"},
    {"label": "From Anti-patterns to Evolutionary PlatformOps", "url": "https://www.linkedin.com/pulse/from-anti-patterns-evolutionary-platform-ops-gielen-rojas-lopez-iydbe/?trackingId=G9ievlrtRk6r3K53xzjb%2Bw%3D%3D", "description": "Related article"}
  ]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'creating-platform-as-value-system';

-- 3. Case Study: Explain your what and why to different levels
UPDATE "Resource"
SET
  title = 'Case Study: Explain your what and why to different levels',
  description = 'A conference talk highlighting lessons learned from a successful communication strategy on platform engineering in a large enterprise.',
  body = $body$## Conference talk: Combining Team Topologies and Platform Engineering at ASML IT

The what and why of platform engineering need to be broadcasted to the rest of an organization for its success. This conference talk highlights several lessons learned from a successful communication strategy on the topic in a large enterprise.

## Summary

In an IT landscape of a few thousand people, getting things done often felt like navigating a maze of shared services and dependencies. To address this, a cross-functional approach was used, leveraging Team Topologies and Platform Engineering to pinpoint pain points and enable better collaboration. The analysis revealed that streamlining dependencies in shared services was key to unlocking value flow.

## Key Takeaways

- Create traction by involving different layers with an appropriate message
- Leverage industry knowledge
- Involve line management
- Repeat your story 10x more than you think is necessary$body$,
  type = 'Video Case Study',
  "readTime" = '30 min watch',
  "targetAudience" = ARRAY['Transformation & Platform Leaders', 'Change Managers', 'Product Managers'],
  "externalLinks" = '[
    {"label": "Unlocking Flow: Combining Team Topologies and Platform Engineering at ASML IT", "url": "https://www.youtube.com/watch?v=UuY9VREki40&t=3s", "description": "Conference talk recording"}
  ]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'storytelling-on-different-levels';

-- 4. Wardley Mapping
UPDATE "Resource"
SET
  title = 'Wardley Mapping',
  description = 'A tool and approach to map out different systems, determine strategy, and provide insights in how platforms support other systems.',
  body = $body$## Strategic Platform Planning with Wardley Maps

A tool and approach to map out different systems and how they are connected. Determine strategy to evolve the landscape. Provides insights in how platforms support other systems and determine organization level strategy towards different platforms.

## What is Wardley Mapping?

Wardley mapping is a strategic planning technique that helps you:

- Visualize the value chain of your platform ecosystem
- Understand the evolution of different components
- Identify strategic opportunities and threats
- Make informed decisions about build vs. buy vs. partner
- Align organizational strategy with platform development

## Platform Engineering Applications

Use Wardley maps for platform engineering to:

- Map your current platform landscape and dependencies
- Identify which components should be commoditized vs. differentiated
- Plan platform evolution and technology adoption
- Understand competitive dynamics in your technology space
- Guide investment decisions and resource allocation

## Getting Started

Begin your Wardley mapping journey:

- Start with the free online book to understand core concepts
- Watch Simon Wardley's video series for practical examples
- Create your first map of a simple platform component
- Practice mapping with your team in workshop format
- Apply insights to your platform strategy and roadmap$body$,
  type = 'Book Guide Video series',
  "readTime" = '20 min read',
  "targetAudience" = ARRAY['Strategic planners', 'Architects'],
  "externalLinks" = '[
    {"label": "Learn Wardley Mapping", "url": "https://learnwardleymapping.com/", "description": "Complete online resource"},
    {"label": "Free Wardley Mapping Book", "url": "https://learnwardleymapping.com/book/", "description": "Comprehensive guide"},
    {"label": "Part 1: How and why to map your business", "url": "https://www.youtube.com/watch?v=KkePAhnkHeg", "description": "Simon Wardley video series"},
    {"label": "Part 2: How to spot patterns", "url": "https://www.youtube.com/watch?v=xsDT7L-tARs", "description": "Simon Wardley video series"},
    {"label": "Part 3: How to anticipate change", "url": "https://www.youtube.com/watch?v=58iLrw6-4x4", "description": "Simon Wardley video series"},
    {"label": "Part 4: How to use doctrine and gameplay", "url": "https://www.youtube.com/watch?v=gPDVA6uVAlU", "description": "Simon Wardley video series"}
  ]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'wardley-mapping';

-- 5. PlatformOps - Understanding your landscape (Theme Park) tool
UPDATE "Resource"
SET
  title = 'PlatformOps - Understanding your landscape (Theme Park) tool',
  description = 'A canvas tool to map and discuss the services provided by internal platforms in a simple, visual way.',
  body = $body$## PlatformOps – Platform Services Landscape Canvas

Understanding what platforms exist, what they offer and how they're perceived—is the first step towards improving at Enteprise level. The **Platform Services Landscape Canvas** helps teams map and discuss the services provided by internal platforms (or platform-like functions) in a simple, visual way. It's designed to spark shared understanding across roles, reveal gaps or overlaps, and provide a common base for further analysis, planning and improvement discussions. Ideal for quick, collaborative workshops (30–60 minutes) that bring platform, product, and operations perspectives together.$body$,
  type = 'Tool',
  "readTime" = '45 min workshop',
  "targetAudience" = ARRAY['Change facilitators', 'Platform Engineers', 'Product managers', 'Architects'],
  "externalLinks" = '[
    {"label": "Summary, downloadable PDF, and guide", "url": "https://valuecraftstudio.com/platformops-landscape"}
  ]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'platformops-landscape';

-- 6. Team Topologies
UPDATE "Resource"
SET
  title = 'Team Topologies',
  description = 'The leading approach to organizing business and technology teams for a fast flow of value.',
  body = $body$## People Organised to Enable Platform Engineering Success

**Team Topologies** is the leading approach to organizing business and technology teams for a fast flow of value.

### Platform Engineering & Team Topologies

**Team Topologies** is essential for platform engineering success—not just in shaping the platform team itself, but in applying its principles of Platform as Product, team design, interaction modes, and cognitive load management. These concepts create the conditions for platforms to be adopted, deliver value, and evolve.$body$,
  type = 'Framework',
  "readTime" = '10 min read',
  "targetAudience" = ARRAY['Team leads', 'Organizational designers'],
  "externalLinks" = '[
    {"label": "The Platform Manifesto", "url": "https://teamtopologies.com/platform-manifesto", "description": "Principles for platform engineering as a discipline"},
    {"label": "Team Topologies Site", "url": "https://teamtopologies.com/", "description": "In-depth resources on team design and interaction"}
  ]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'team-topologies';

-- 7. Platform Engineering Maturity Model (by CNCF)
UPDATE "Resource"
SET
  title = 'Platform Engineering Maturity Model (by CNCF)',
  description = 'A framework for reflection and for identifying opportunities for improvement in any organization leveraging platforms.',
  body = $body$## Overview

A framework for reflection and for identifying opportunities for improvement in any organization leveraging platforms. The model is relatively simple with only 5 categories to measure. However, they are categories that are essential and a good place to start for any platform.

Note that, as with any maturity model, it is not about checking the boxes and move on. The conversation driven by the model can help you mature.$body$,
  type = 'Assessment Framework',
  "readTime" = '15 min read',
  "targetAudience" = ARRAY['Product managers', 'Platform Engineers', 'Architects', 'Transformation leads'],
  "externalLinks" = '[
    {"label": "Maturity model by CNCF", "url": "https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/#model-table"},
    {"label": "Full article on the model", "url": "https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/", "description": "Article introducing the canvas"},
    {"label": "Platform Engineering Capability Model", "url": "https://learn.microsoft.com/en-us/platform-engineering/platform-engineering-capability-model", "description": "A derivative model by Microsoft which extends the model, but is focused more on cloud computing and less generic."}
  ]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'pe-maturity-model';

-- 8. Service Blueprint - Visualizing how your platform is consumed
UPDATE "Resource"
SET
  title = 'Service Blueprint - Visualizing how your platform is consumed',
  description = 'A UX-derived tool for visualizing how users interact with your platform and where they feel pain.',
  body = $body$## Overview

Doing product management for a platform has many similarities with normal product management. One of the tools coming out of UX in this relation we found incredibly valuable when starting with a platform engineering journey, is the service blueprint.

The service blueprint combines user journey mapping (your internal user) with how they interact with the underlying systems of your platform. This tool can be used in workshops and interviews to make it more explicit how the users are interacting with your platform, but also where they feel pain. At the same time, it highlights the need for easy usage/onboarding of your platform, one of the typical pitfalls of traditional IT Service management.$body$,
  type = 'Workshop Tool',
  "readTime" = '10 min read',
  "targetAudience" = ARRAY['Product managers'],
  "externalLinks" = '[
    {"label": "Service blueprint", "url": "https://www.nngroup.com/articles/service-blueprints-definition/", "description": "Article by NN Group"},
    {"label": "Miro template", "url": "https://miro.com/templates/service-blueprint-journey-operations/"}
  ]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'service-blueprint';

-- 9. User Needs Mapping - Aligning systems and teams to user needs
UPDATE "Resource"
SET
  title = 'User Needs Mapping - Aligning systems and teams to user needs',
  description = 'A quick way to start with Wardley Mapping in practice, placing users centrally and developing systems and team structures accordingly.',
  body = $body$## Overview

User needs mapping, created by Rich Allen, serves as a quick way to start with Wardley Mapping in practice. It puts the users at the center and builds up the technical systems and team structures from there.

## Use it when you want to

- Create a shared picture of your users needs and whether they align to your organizational goals
- Visualize link between user needs and capabilities, including dependencies
- Determine whether the current team setup can be improved by optimizing team boundaries

Note that the approach has similarities with Architecture for flow.$body$,
  type = 'Workshop Tool',
  "readTime" = '15 min read',
  "targetAudience" = ARRAY['Product Managers', 'UX Researchers', 'Platform Teams', 'Architects'],
  "externalLinks" = '[
    {"label": "User needs mapping", "url": "https://userneedsmapping.com/", "description": "Canvas and instructions"},
    {"label": "From Inside Out to Outside-In: Aligning Teams Around What Matters", "url": "https://www.youtube.com/watch?v=UYbTZzvk_C0", "description": "Overview presentation"},
    {"label": "Exploring Team and Service Boundaries with User Needs Mapping", "url": "https://teamtopologies.com/key-concepts-content/exploring-team-and-service-boundaries-with-user-needs-mapping", "description": "Overview article"}
  ]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'user-needs-mapping';

-- 10. Architecture for flow canvas - designing adaptive, socio-technical systems
UPDATE "Resource"
SET
  title = 'Architecture for flow canvas - designing adaptive, socio-technical systems',
  description = 'A canvas combining Wardley Mapping, Domain-Driven Design, and Team Topologies for designing adaptive systems.',
  body = $body$## Overview

The Architecture for Flow Canvas, created by Susanne Kaiser, provides guidance for designing adaptive, socio-technical systems. It combines Wardley Mapping, Domain-Driven Design, and Team Topologies in a structured way so that organizations can explore and align strategy, architecture, and team design.

## Use it when you want to

- Create a shared picture of how systems and teams should evolve
- Align business, technical, and organizational perspectives
- Support decision-making in complex, fast-changing environments

Note that the approach has similarities with User needs mapping, but has a broader and more thorough scope.$body$,
  type = 'Workshop Tool',
  "readTime" = '15 min read',
  "targetAudience" = ARRAY['System Architects', 'Platform Engineers'],
  "externalLinks" = '[
    {"label": "Architecture for Flow Canvas", "url": "https://susannekaiser.net/architecture-for-flow-canvas/", "description": "Interactive canvas and toolkit"},
    {"label": "Video Introduction", "url": "https://youtu.be/Mm0ctgk-uIM?feature=shared", "description": "Watch the foundational concepts explained"}
  ]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'architecture-for-flow';

-- 11. Platform enablement services canvas
UPDATE "Resource"
SET
  title = 'Platform enablement services canvas',
  description = 'A canvas to determine the different types of services needed to consume a platform, thinking beyond just the tech.',
  body = $body$## Overview

A canvas that helps to determine the different types of services that are needed to consume a platform. It can serve to determine the current state of a platform, but also to determine the future state where it wants to grow towards.

When building or improving a platform, it's easy to dive deep into the technical aspects — CI/CD pipelines, infrastructure automation, security, and so on. While these are essential, they're only part of the picture.

## Why this canvas

The canvas helps platform teams think beyond the tech. It brings visibility to the broader set of services and capabilities that make a platform truly valuable and usable — from onboarding and documentation to support, feedback loops, and innovation enablement.

It's a simple yet powerful tool to:

- Structure conversations with platform teams and its users
- Identify gaps in the platform services in a broader sense
- Make platform capabilities transparent to stakeholders
- Align on platform improvements$body$,
  type = 'Canvas',
  "readTime" = '15 min read',
  "targetAudience" = ARRAY['Product managers', 'Service Designers', 'Platform Teams', 'Architects'],
  "externalLinks" = '[
    {"label": "Platform Enablement Services Canvas", "url": "https://www.linkedin.com/posts/tomslenders_platform-enablement-services-canvas-activity-7382067347148210176-FaUH", "description": "Article with the canvas and manual"}
  ]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'pe-enablement-services-canvas';

-- 12. Platform tooling landscape
UPDATE "Resource"
SET
  title = 'Platform tooling landscape',
  description = 'An overview of a typical platform landscape with several tool examples.',
  body = $body$## Overview

An overview of a typical platform landscape with several tool examples.

While not a full reference architecture, it does provide insights in several tools that typically are provided within an enterprise and its platforms.$body$,
  type = 'Architecture',
  "readTime" = '10 min read',
  "targetAudience" = ARRAY['Platform Engineers', 'Architects', 'Product managers'],
  "externalLinks" = '[
    {"label": "Platform tooling landscape", "url": "https://platformengineering.org/platform-tooling", "description": "The landscape overview itself"},
    {"label": "Platformengineering.org", "url": "https://platformengineering.org", "description": "The community behind with useful in depth resources"}
  ]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'platform-tooling-landscape';

-- 13. Platform Engineering metrics overview
UPDATE "Resource"
SET
  title = 'Platform Engineering metrics overview',
  description = 'An overview of prominent metrics frameworks for platform engineering, with guidance on contextual adaptation and culture.',
  body = $body$## Overview

Many metrics for platform engineering exist. We provide a short overview of well-known metrics frameworks, but will mostly refer to the excellent article by Lothar Schulz who covers all of them in more depth.

## Summary

There are many metrics available to measure developer productivity and effectiveness of platforms. As of writing, there are five that stand out, which are compared in the excellent article of Lothar Schulz. We will give the quick rundown of each.

These metrics frameworks are based on research, and are therefore a strong basis. Nonetheless, we do recommend you consider your own context and adapt metrics based on that.

A note on **metrics and culture**. Metrics can provide an organization with many invaluable insights in where to invest and how to grow as an organization. However, if there is no safety culture installed, we have seen them also being abused. Most metrics can easily be gamified and at that point become useless. This means, that you need to be very aware and careful on how these metrics will be used to make them effective.

### DORA

DORA was the first of these metrics frameworks and has a very specific set of metrics. They are aimed at DevOps teams measuring delivery outcomes. While they can be used by platform teams, they might be even more valuable for stream-aligned teams leveraging the platforms. This means they're interesting both to measure as a platform team, as well as providing easy insights through the platform towards stream-aligned teams.

### SPACE

The SPACE Framework is newer, but quite well established by now. It focuses on deliver productivity as well, but has a broader scope. It has 5 domains, but advices to only pick a few to focus on. For each domain, it provides multiple potential metrics to use. This makes it more flexible and can be adjusted for your organization or teams needs. Similar to DORA, it can be valuable for a platform team to measure their own performance. But it's especially valuable to measure the impact of your platform on the stream-aligned teams. As it contains a wider suite of metrics, it will be harder to provide insights into all of them for your platform users.

### DevEx

The DevEx framework is the only framework in this list that has a very explicit focus on platform engineering. Developer Experience is at the heart of platform engineering. Therefore, this framework can provide valuable insights into your platform usage and effectiveness as a platform team. However, it is missing elements such as adoption or ROI of your platform. Therefore, it is unlikely to cover all your metric needs.

### DX Core 4 and ESSP

Both DX Core 4 and Github Engineering System Success Playbook (ESSP) are relatively new (end of 2024 and early 2025). Both frameworks try to provide a way to combine insights from the other frameworks into a more holistic approach. Also, both have more explicit focus on executives, which is a very valuable addition missing in the others. While both frameworks seem to be based on thorough research, they are releatively new and we haven't used them. Therefore, we are hesitant to wholeheartedly recommend them at this point in time.$body$,
  type = 'Framework Article',
  "readTime" = '15 min read',
  "targetAudience" = ARRAY['Product managers', 'Platform teams', 'Platform leaders'],
  "externalLinks" = '[
    {"label": "Engineering Metrics Frameworks: DORA, DevEx, SPACE, DX Core 4, ESSP Comparison", "url": "https://www.lotharschulz.info/2025/05/04/engineering-metrics-frameworks-dora-devex-space-dx-core-4-essp-comparison/", "description": "Article with many more details on all five metric frameworks"},
    {"label": "DORA", "url": "https://dora.dev/research/", "description": "Good starting point for generic productivity metrics"},
    {"label": "SPACE", "url": "https://queue.acm.org/detail.cfm?id=3454124", "description": "Framework for generic productivity metrics"},
    {"label": "DevEx metrics", "url": "https://shipyard.build/blog/devex-framework/", "description": "Metrics more specific to platform engineering"}
  ]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'pe-metrics-overview';

-- platform-engineering-tool-map does not exist on the original website — keep as DRAFT
UPDATE "Resource"
SET
  status = 'DRAFT',
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'platform-engineering-tool-map';

-- =============================================================================
-- VERIFICATION
-- =============================================================================
SELECT slug, title, status, type, "readTime", length(body) as body_length,
       array_length("targetAudience", 1) as audience_count,
       jsonb_array_length("externalLinks") as link_count
FROM "Resource"
ORDER BY status, slug;
