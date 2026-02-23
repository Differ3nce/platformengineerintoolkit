-- =============================================================================
-- Platform Engineering Toolkit - Comprehensive Content Fix
-- Updates ALL resource content to match the original website exactly
-- Run in Supabase SQL Editor
-- =============================================================================

-- =============================================================================
-- WHAT AND WHY CATEGORY
-- =============================================================================

-- 1. Introduction to Platform Engineering
UPDATE "Resource"
SET
  title = 'Introduction to platform engineering',
  description = 'A friendly introduction to platform engineering: what it is, how it works, and what it needs to succeed.',
  body = E'## Platform Engineering: A Friendly Introduction\n\nEngineering for platforms has existed for decades. What has evolved is **what** is engineered, **how**, and **for what purpose**. Advances in technology, new practices, and growing complexity have reshaped the discipline. The drive to optimise and automate remains constant, but the reasons behind it and the mechanisms used have changed significantly.\n\nThink of a **theme park**: a network of rides, shows, and services, all interdependent. For visitors to have a seamless experience, everything must work reliably, safely, and in coordination. Behind the scenes sits a layered, complex system ensuring this happens.\n\nOrganisations and their platforms operate in the same way. A platform is not just technology \u2014 it is a system of people, processes, and tools working together to deliver value through services. Platforms usually exist at different levels of abstraction \u2014 from infrastructure foundations to developer enablement \u2014 and often share critical dependencies.\n\nRooted in DevOps principles, **Platform Engineering** provides a structured approach to reduce complexity, embed automation, standardise what can be standardised, and minimise errors. Its objective is clear: accelerate delivery and improve consistency. Done well, it enables cohesiveness, scalability, speed, and effective governance across the organisation.\n\nReturning to the theme park analogy: Platform Engineering allows each \"ride\" or product team to focus on its unique experience while relying on standardised, on-demand, self-service, and reliable components.\n\nThese services may be provided through an **Internal Developer Platform (IDP)**. While the name suggests developers, consumers are not always developers, nor do they always see themselves as such. The way services are consumed follows the familiar **X-as-a-Service (XaaS)** model, rooted in service provision and ease of access.\n\nContinue exploring the toolkit, share it if it resonates with you, and contribute where you can \u2014 then apply what fits in your context.\n\n## What Does Platform Engineering Need?\n\nTechnology and tooling are important, but success depends just as much \u2014 if not more \u2014 on capabilities and ways of working. At a high level, it relies on:\n\n- **Clear vision and objectives** to guide the platform\u2019s purpose.\n- **Investment** in both people and technology.\n- **Engineering expertise** to support modern practices.\n- **A product mindset** so the platform continually evolves as a product.\n- **A service mindset** so platform services are reliable and well-managed.\n- **Adoption focus**, ensuring the people who use the platform can succeed with it.\n- **Platform teams** with the right structure, flow-oriented ways of working, and mindset.\n\nTo assess these capabilities, explore the **Platform Engineering Maturity Models** under the *Starting & Progressing* section of this site.\n\n## Further Reading\n\n- [Platform Engineering Guide - Microsoft Learn](https://learn.microsoft.com/en-us/platform-engineering/)\n- [Google Cloud: Platform Engineering](https://cloud.google.com/solutions/platform-engineering)\n- [AWS Platform Perspective](https://docs.aws.amazon.com/prescriptive-guidance/latest/aws-caf-platform-perspective/platform-eng.html)\n- [PlatformEngineering.org: What is Platform Engineering](https://platformengineering.org/blog/what-is-platform-engineering)',
  type = 'Article',
  "readTime" = '10 min read',
  "targetAudience" = ARRAY['Anyone interested'],
  "externalLinks" = '[{"label": "Platform Engineering Guide - Microsoft Learn", "url": "https://learn.microsoft.com/en-us/platform-engineering/"}, {"label": "Google Cloud: Platform Engineering", "url": "https://cloud.google.com/solutions/platform-engineering"}, {"label": "AWS Platform Perspective", "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/aws-caf-platform-perspective/platform-eng.html"}, {"label": "PlatformEngineering.org: What is Platform Engineering", "url": "https://platformengineering.org/blog/what-is-platform-engineering"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'introduction-to-platform-engineering';

-- 2. PlatformOps - Platforms as systems of value (Conditions for Success)
UPDATE "Resource"
SET
  title = 'PlatformOps - Platforms as systems of value',
  description = 'A position paper on why organisations that deliberately evolve internal platforms can become engines of resilience, adaptability, and sustained business impact.',
  body = E'## Conditions for Success\n\nPlatforms form part of a connected landscape. Whether they succeed depends not just on tooling, but on how they are designed, operated, governed, and evolved.\n\nThis position paper, by Gielen Rojas-L\u00f3pez, explores why organisations that deliberately evolve internal platforms can become engines of resilience, adaptability, and sustained business impact \u2014 and what happens when they don\u2019t.\n\n### Use it when you want to\n\n- Understand why platform engineering matters strategically, not just technically\n- Identify the conditions needed for platform and team success\n- Leverage industry patterns that support your perspective\n\n### Resources\n\n- [PlatformOps - Platforms as systems of value](https://valuecraftstudio.com/platform-engineering-1) - The full position paper\n- [LinkedIn articles on platform engineering](https://www.linkedin.com/in/gielen/recent-activity/articles/) - Related articles by Gielen Rojas-L\u00f3pez\n- [Evolutionary PlatformOps](https://valuecraftstudio.com/) - ValueCraft Studio resources',
  type = 'Article',
  "readTime" = '15 min read',
  "targetAudience" = ARRAY['C-Board', 'Tech Leads', 'Transformation & Platform Leaders'],
  "externalLinks" = '[{"label": "PlatformOps - Platforms as systems of value", "url": "https://valuecraftstudio.com/platform-engineering-1"}, {"label": "LinkedIn articles on platform engineering", "url": "https://www.linkedin.com/in/gielen/recent-activity/articles/"}, {"label": "Evolutionary PlatformOps", "url": "https://valuecraftstudio.com/"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'creating-platform-as-value-system';

-- 3. Case Study: Explain your what and why to different levels
UPDATE "Resource"
SET
  title = 'Case Study: Explain your what and why to different levels',
  description = 'A conference talk highlighting lessons learned from a successful communication strategy on platform engineering in a large enterprise.',
  body = E'## Conference talk: Combining Team Topologies and Platform Engineering at ASML IT\n\nThe what and why of platform engineering need to be broadcasted to the rest of an organization for its success. This conference talk highlights several lessons learned from a successful communication strategy on the topic in a large enterprise.\n\n### Summary\n\nIn an IT landscape of a few thousand people, getting things done often felt like navigating a maze of shared services and dependencies. To address this, a cross-functional approach was used, leveraging Team Topologies and Platform Engineering to pinpoint pain points and enable better collaboration. The analysis revealed that streamlining dependencies in shared services was key to unlocking value flow.\n\n### Key Takeaways\n\n- Create traction by involving different layers with an appropriate message\n- Leverage industry knowledge\n- Involve line management\n- \"Repeat your story 10x more than you think is necessary\"\n\n### Resources\n\n- [Unlocking Flow: Combining Team Topologies and Platform Engineering at ASML IT](https://www.youtube.com/watch?v=UuY9VREki40&t=3s) - Conference talk recording',
  type = 'Video Case Study',
  "readTime" = '30 min watch',
  "targetAudience" = ARRAY['Transformation & Platform Leaders', 'Change Managers', 'Product Managers'],
  "externalLinks" = '[{"label": "Unlocking Flow: Combining Team Topologies and Platform Engineering at ASML IT", "url": "https://www.youtube.com/watch?v=UuY9VREki40&t=3s"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'storytelling-on-different-levels';

-- =============================================================================
-- WHERE TO START CATEGORY
-- =============================================================================

-- 4. Wardley Mapping
UPDATE "Resource"
SET
  title = 'Wardley mapping - Strategic Platform Planning',
  description = 'A tool and approach to map out different systems, determine strategy, and provide insights in how platforms support other systems.',
  body = E'## Strategic Platform Planning with Wardley Maps\n\nA tool and approach to map out different systems and how they are connected. Determine strategy to evolve the landscape. Provides insights in how platforms support other systems and determine organization level strategy towards different platforms.\n\n### What is Wardley Mapping?\n\nWardley mapping is a strategic planning technique that helps you:\n\n- Visualize the value chain of your platform ecosystem\n- Understand the evolution of different components\n- Identify strategic opportunities and threats\n- Make informed decisions about build vs. buy vs. partner\n- Align organizational strategy with platform development\n\n### Platform Engineering Applications\n\nUse Wardley maps for platform engineering to:\n\n- Map your current platform landscape and dependencies\n- Identify which components should be commoditized vs. differentiated\n- Plan platform evolution and technology adoption\n- Understand competitive dynamics in your technology space\n- Guide investment decisions and resource allocation\n\n### Learning Resources\n\n**Free Book:**\n- [Learn Wardley Mapping](https://learnwardleymapping.com/) - Introduction and resources\n- [Free Wardley Mapping Book](https://learnwardleymapping.com/book/) - Complete free book\n\n**Simon Wardley Video Series:**\n- [Part 1](https://www.youtube.com/watch?v=KkePAhnkHeg)\n- [Part 2](https://www.youtube.com/watch?v=xsDT7L-tARs)\n- [Part 3](https://www.youtube.com/watch?v=58iLrw6-4x4)\n- [Part 4](https://www.youtube.com/watch?v=gPDVA6uVAlU)\n\n### Getting Started\n\nBegin your Wardley mapping journey through the suggested progression of resources and team workshops.',
  type = 'Book Guide Video series',
  "readTime" = '20 min read',
  "targetAudience" = ARRAY['Strategic planners', 'Architects'],
  "externalLinks" = '[{"label": "Learn Wardley Mapping", "url": "https://learnwardleymapping.com/"}, {"label": "Free Wardley Mapping Book", "url": "https://learnwardleymapping.com/book/"}, {"label": "Simon Wardley - Part 1", "url": "https://www.youtube.com/watch?v=KkePAhnkHeg"}, {"label": "Simon Wardley - Part 2", "url": "https://www.youtube.com/watch?v=xsDT7L-tARs"}, {"label": "Simon Wardley - Part 3", "url": "https://www.youtube.com/watch?v=58iLrw6-4x4"}, {"label": "Simon Wardley - Part 4", "url": "https://www.youtube.com/watch?v=gPDVA6uVAlU"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'wardley-mapping';

-- 5. PlatformOps - Understanding your landscape (Theme Park) tool
UPDATE "Resource"
SET
  title = 'PlatformOps - Understanding your landscape (Theme Park) tool',
  description = 'A canvas tool to map and discuss the services provided by internal platforms in a simple, visual way.',
  body = E'## PlatformOps \u2013 Platform Services Landscape Canvas\n\nThe canvas tool aims to help teams map and discuss the services provided by internal platforms (or platform-like functions) in a simple, visual way. Understanding existing platforms and their offerings is the first step towards improving at Enterprise level.\n\nDesigned to spark shared understanding across roles, reveal gaps or overlaps, and provide a common base for further analysis, planning and improvement discussions. Ideal for quick, collaborative workshops (30\u201360 minutes).\n\n### Resources\n\n- [Summary, downloadable PDF, and guide](https://valuecraftstudio.com/platformops-landscape) - Explore the canvas',
  type = 'Tool',
  "readTime" = '45 min workshop',
  "targetAudience" = ARRAY['Change Facilitators', 'Platform Engineers', 'Product Managers', 'Architects'],
  "externalLinks" = '[{"label": "Summary, downloadable PDF, and guide", "url": "https://valuecraftstudio.com/platformops-landscape"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'platformops-landscape';

-- 6. Team Topologies
UPDATE "Resource"
SET
  title = 'Team Topologies - Organizing Teams for Platform Engineering Success',
  description = 'The leading approach to organizing business and technology teams for a fast flow of value.',
  body = E'## People Organised to Enable Platform Engineering Success\n\nTeam Topologies is the leading approach to organizing business and technology teams for a fast flow of value.\n\n### Platform Engineering & Team Topologies\n\nTeam Topologies supports platform engineering achievement through multiple mechanisms: shaping the platform team structure itself and applying core principles around Platform as Product, team design, interaction modes, and cognitive load management. These elements create the conditions for platforms to be adopted, deliver value, and evolve.\n\n### Resources\n\n- [The Platform Manifesto](https://teamtopologies.com/platform-manifesto) - Principles for platform engineering as a discipline\n- [Team Topologies Site](https://teamtopologies.com/) - In-depth resources on team design and interaction',
  type = 'Framework',
  "readTime" = '10 min read',
  "targetAudience" = ARRAY['Team leads', 'Organizational designers'],
  "externalLinks" = '[{"label": "The Platform Manifesto", "url": "https://teamtopologies.com/platform-manifesto"}, {"label": "Team Topologies Site", "url": "https://teamtopologies.com/"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'team-topologies';

-- =============================================================================
-- STARTING AND PROGRESSING CATEGORY
-- =============================================================================

-- 7. Platform Engineering Maturity Model (by CNCF)
UPDATE "Resource"
SET
  title = 'Platform Engineering Maturity Model (by CNCF)',
  description = 'A framework for reflection and for identifying opportunities for improvement in any organization leveraging platforms.',
  body = E'## Platform Engineering Maturity Model\n\nThe CNCF Platform Engineering Maturity Model is a framework for reflection and for identifying opportunities for improvement in any organization leveraging platforms.\n\nThe model is not just a checklist \u2014 the conversation driven by the model can help you mature. The value lies in organizational dialogue and reflection rather than completing assessment items.\n\n### Resources\n\n- [Maturity model by CNCF](https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/#model-table) - The model table\n- [Full article on the model](https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/) - Introduction to the maturity model\n- [Platform Engineering Capability Model](https://learn.microsoft.com/en-us/platform-engineering/platform-engineering-capability-model) - Microsoft\u2019s derivative framework',
  type = 'Workshop Tool',
  "readTime" = '15 min read',
  "targetAudience" = ARRAY['Product managers', 'Platform Engineers', 'Architects', 'Transformation leads'],
  "externalLinks" = '[{"label": "Maturity model by CNCF", "url": "https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/#model-table"}, {"label": "Full article on the model", "url": "https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/"}, {"label": "Platform Engineering Capability Model", "url": "https://learn.microsoft.com/en-us/platform-engineering/platform-engineering-capability-model"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'pe-maturity-model';

-- 8. Service Blueprint
UPDATE "Resource"
SET
  title = 'Service Blueprint - Visualizing how your platform is consumed',
  description = 'A UX-derived tool for visualizing how users interact with your platform and where they feel pain.',
  body = E'## Service Blueprint\n\nDoing product management for a platform has many similarities with normal product management. One of the tools coming out of UX in this relation we found incredibly valuable when starting with a platform engineering journey, is the service blueprint.\n\nThe service blueprint combines user journey mapping (your internal user) with how they interact with the underlying systems of your platform. This tool can be used in workshops and interviews to make it more explicit how the users are interacting with your platform, but also where they feel pain. At the same time, it highlights the need for easy usage/onboarding of your platform, one of the typical pitfalls of traditional IT Service management.\n\n### Resources\n\nMany resources exist, but we found this article especially helpful:\n\n- [Service blueprint](https://www.nngroup.com/articles/service-blueprints-definition/) - Article by NN Group\n- [Miro template](https://miro.com/templates/service-blueprint-journey-operations/) - Service Blueprint template',
  type = 'Workshop Tool',
  "readTime" = '10 min read',
  "targetAudience" = ARRAY['Product managers'],
  "externalLinks" = '[{"label": "Service blueprint - NN Group", "url": "https://www.nngroup.com/articles/service-blueprints-definition/"}, {"label": "Miro template", "url": "https://miro.com/templates/service-blueprint-journey-operations/"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'service-blueprint';

-- 9. User Needs Mapping
UPDATE "Resource"
SET
  title = 'User Needs Mapping - Aligning systems and teams to user needs',
  description = 'A quick way to start with Wardley Mapping in practice, placing users centrally and developing systems and team structures accordingly.',
  body = E'## User Needs Mapping\n\nUser needs mapping, created by Rich Allen, serves as a quick way to start with Wardley Mapping in practice. The approach places users centrally and develops technical systems and team structures accordingly.\n\n### Use it when you want to\n\n- Create a shared picture of your users needs and whether they align to your organizational goals\n- Visualize link between user needs and capabilities, including dependencies\n- Determine whether the current team setup can be improved by optimizing team boundaries\n\nThe approach shares similarities with [Architecture for flow](article-architecture-for-flow.html).\n\n### Resources\n\n- [User needs mapping](https://userneedsmapping.com/) - Canvas and instructions\n- [From Inside Out to Outside-In: Aligning Teams Around What Matters](https://www.youtube.com/watch?v=UYbTZzvk_C0) - Overview presentation\n- [Exploring Team and Service Boundaries with User Needs Mapping](https://teamtopologies.com/key-concepts-content/exploring-team-and-service-boundaries-with-user-needs-mapping) - Overview article',
  type = 'Workshop Tool Book',
  "readTime" = '15 min read',
  "targetAudience" = ARRAY['Product Managers', 'UX Researchers', 'Platform Teams', 'Architects'],
  "externalLinks" = '[{"label": "User needs mapping - Canvas and instructions", "url": "https://userneedsmapping.com/"}, {"label": "From Inside Out to Outside-In: Aligning Teams Around What Matters", "url": "https://www.youtube.com/watch?v=UYbTZzvk_C0"}, {"label": "Exploring Team and Service Boundaries with User Needs Mapping", "url": "https://teamtopologies.com/key-concepts-content/exploring-team-and-service-boundaries-with-user-needs-mapping"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'user-needs-mapping';

-- 10. Architecture for Flow Canvas
UPDATE "Resource"
SET
  title = 'Architecture for flow canvas - designing adaptive, socio-technical systems',
  description = 'A canvas combining Wardley Mapping, Domain-Driven Design, and Team Topologies for designing adaptive, socio-technical systems.',
  body = E'## Architecture for Flow Canvas\n\nThe Architecture for Flow Canvas, created by Susanne Kaiser, provides guidance for designing adaptive, socio-technical systems. It combines Wardley Mapping, Domain-Driven Design, and Team Topologies in a structured way so that organizations can explore and align strategy, architecture, and team design.\n\n### Use it when you want to\n\n- Create a shared picture of how systems and teams should evolve\n- Align business, technical, and organizational perspectives\n- Support decision-making in complex, fast-changing environments\n\nThe approach shares similarities with User needs mapping but has a broader and more thorough scope.\n\n### Resources\n\n- [Architecture for Flow Canvas](https://susannekaiser.net/architecture-for-flow-canvas/) - Canvas and instructions\n- [Video Introduction](https://youtu.be/Mm0ctgk-uIM?feature=shared) - Overview presentation',
  type = 'Workshop Tool Book',
  "readTime" = '15 min read',
  "targetAudience" = ARRAY['System Architects', 'Platform Engineers'],
  "externalLinks" = '[{"label": "Architecture for Flow Canvas", "url": "https://susannekaiser.net/architecture-for-flow-canvas/"}, {"label": "Video Introduction", "url": "https://youtu.be/Mm0ctgk-uIM?feature=shared"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'architecture-for-flow';

-- 11. Platform Enablement Services Canvas
UPDATE "Resource"
SET
  title = 'Platform enablement services canvas - Mapping services of a platform beyond tech',
  description = 'A canvas to determine the different types of services needed to consume a platform, thinking beyond just the tech.',
  body = E'## Platform Enablement Services Canvas\n\nWhen we think about platforms, we often jump straight to the technical components: CI/CD pipelines, infrastructure automation, developer portals. These matter \u2014 but they represent only part of the value a platform can deliver.\n\nThe Platform Enablement Services Canvas helps you think beyond the tech and determine the different types of services that are needed to consume a platform. It directs attention toward broader enablement services including onboarding, documentation, support mechanisms, feedback systems, and innovation capabilities.\n\n### Use it when you want to\n\n- Structure conversations with platform teams and its users\n- Identify service gaps beyond technical infrastructure\n- Increase stakeholder visibility into platform offerings\n- Achieve consensus on improvement priorities\n\n### Resources\n\n- [Platform Enablement Services Canvas](https://www.linkedin.com/posts/tomslenders_platform-enablement-services-canvas-activity-7382067347148210176-FaUH) - Canvas and instruction manual by Tom Slenders',
  type = 'Canvas',
  "readTime" = '15 min read',
  "targetAudience" = ARRAY['Product managers', 'Service Designers', 'Platform Teams', 'Architects'],
  "externalLinks" = '[{"label": "Platform Enablement Services Canvas", "url": "https://www.linkedin.com/posts/tomslenders_platform-enablement-services-canvas-activity-7382067347148210176-FaUH"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'pe-enablement-services-canvas';

-- 12. Platform Tooling Landscape
UPDATE "Resource"
SET
  title = 'Platform tooling landscape',
  description = 'An overview of a typical platform landscape with several tool examples.',
  body = E'## Platform Tooling Landscape\n\nAn overview of a typical platform landscape with several tool examples.\n\nWhile not a full reference architecture, it does provide insights in several tools that typically are provided within an enterprise and its platforms.\n\n### Resources\n\nTo get started, find the overview here:\n\n- [Platform tooling landscape](https://platformengineering.org/platform-tooling) - The landscape overview itself\n- [Platformengineering.org](https://platformengineering.org/) - The community behind with useful in depth resources',
  type = 'Architecture',
  "readTime" = '10 min read',
  "targetAudience" = ARRAY['Platform Engineers', 'Architects', 'Product managers'],
  "externalLinks" = '[{"label": "Platform tooling landscape", "url": "https://platformengineering.org/platform-tooling"}, {"label": "Platformengineering.org", "url": "https://platformengineering.org/"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'platform-tooling-landscape';

-- 13. Platform Engineering Metrics Overview
UPDATE "Resource"
SET
  title = 'Platform Engineering metrics overview',
  description = 'An overview of prominent metrics frameworks for platform engineering, with guidance on contextual adaptation and culture.',
  body = E'## Platform Engineering Metrics Overview\n\nMany metrics for platform engineering exist. This overview introduces five prominent frameworks, referencing Lothar Schulz\u2019s comprehensive comparison.\n\nMetrics frameworks are based on research and serve as strong foundations, yet we recommend contextual adaptation.\n\n### Important: Metrics and Culture\n\nMetrics can provide an organization with many invaluable insights. However, without psychological safety, they can easily be gamified and at that point become useless. Consider the cultural context before implementing any metrics framework.\n\n### Frameworks\n\n**DORA** \u2014 Originally designed for DevOps teams measuring delivery outcomes. Applicable to both platform and stream-aligned teams.\n\n**SPACE** \u2014 A newer, more flexible framework covering five domains with multiple potential metrics per domain. Valuable for measuring platform impact across teams.\n\n**DevEx** \u2014 Explicitly focused on developer experience and platform engineering effectiveness, though lacking adoption and ROI metrics.\n\n**DX Core 4 and ESSP** \u2014 Recently released (end 2024/early 2025) frameworks attempting holistic approaches combining insights from other frameworks, with explicit executive focus. Due to their newness, we hesitate to recommend them wholeheartedly yet.\n\n### Resources\n\n- [Engineering Metrics Frameworks comparison](https://www.lotharschulz.info/2025/05/04/engineering-metrics-frameworks-dora-devex-space-dx-core-4-essp-comparison/) - Comprehensive comparison by Lothar Schulz\n- [DORA](https://dora.dev/research/) - DevOps Research and Assessment\n- [SPACE](https://queue.acm.org/detail.cfm?id=3454124) - SPACE framework paper\n- [DevEx metrics](https://shipyard.build/blog/devex-framework/) - DevEx framework overview',
  type = 'Framework Article',
  "readTime" = '15 min read',
  "targetAudience" = ARRAY['Product managers', 'Platform teams', 'Platform leaders'],
  "externalLinks" = '[{"label": "Engineering Metrics Frameworks comparison", "url": "https://www.lotharschulz.info/2025/05/04/engineering-metrics-frameworks-dora-devex-space-dx-core-4-essp-comparison/"}, {"label": "DORA", "url": "https://dora.dev/research/"}, {"label": "SPACE", "url": "https://queue.acm.org/detail.cfm?id=3454124"}, {"label": "DevEx metrics", "url": "https://shipyard.build/blog/devex-framework/"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'pe-metrics-overview';

-- 14. Platform Engineering Tool Map
-- NOTE: This resource does not exist as a separate page on the original website.
-- The original site has "Platform tooling landscape" (already updated above).
-- Setting this to DRAFT status since it's not on the original site.
-- If you want to keep it, update the content. If not, it can be deleted.
UPDATE "Resource"
SET
  status = 'DRAFT',
  description = 'Note: This resource does not have a corresponding page on the original website. Consider removing or merging with Platform Tooling Landscape.',
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'platform-engineering-tool-map';

-- =============================================================================
-- Fix internal links in body content to use new site URLs instead of .html
-- The body content references like "article-architecture-for-flow.html" should
-- point to the new site structure instead.
-- =============================================================================

-- Fix the cross-reference in user-needs-mapping body
UPDATE "Resource"
SET
  body = REPLACE(body, '[Architecture for flow](article-architecture-for-flow.html)', '[Architecture for flow](/starting-and-progressing/architecture-for-flow)'),
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'user-needs-mapping' AND body LIKE '%article-architecture-for-flow.html%';

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Check all resources
SELECT
  slug,
  title,
  status,
  type,
  "readTime",
  length(body) as body_length,
  array_length("targetAudience", 1) as audience_count,
  jsonb_array_length("externalLinks") as link_count
FROM "Resource"
ORDER BY status, slug;
