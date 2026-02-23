-- Fix platform-tooling-landscape: update status to PUBLISHED
UPDATE "Resource"
SET
  status = 'PUBLISHED',
  description = 'An overview of a typical platform landscape with several tool examples.',
  body = E'## Platform Tooling Landscape\n\nAn overview of a typical platform landscape with several tool examples. While not comprehensive, it does provide insights in several tools that typically are provided within an enterprise and its platforms.\n\n### Resources\n\n- Platform tooling landscape overview at platformengineering.org\n- The community behind it with useful in-depth resources',
  type = 'Architecture',
  "readTime" = '10 min read',
  "targetAudience" = ARRAY['Platform Engineers', 'Architects', 'Product managers'],
  "externalLinks" = '[{"label": "Platform tooling landscape overview", "url": "https://platformengineering.org/platform-tooling"}, {"label": "Platformengineering.org community resources", "url": "https://platformengineering.org/"}]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'platform-tooling-landscape';

-- Verify
SELECT slug, status, length(body) as body_length FROM "Resource" WHERE slug = 'platform-tooling-landscape';
