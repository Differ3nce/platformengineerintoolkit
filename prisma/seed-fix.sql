-- =============================================================================
-- Platform Engineering Toolkit - Content Fix #2
-- Fixes category assignments and remaining issues
-- Run in Supabase SQL Editor
-- =============================================================================

-- 1. Move "Storytelling on Different Levels" from starting-and-progressing to what-and-why
UPDATE "Resource"
SET
  "categoryId" = 'cm7t2x9b20001ct0kwhatandwhy',
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'storytelling-on-different-levels';

-- 2. Move "Platform Engineering Tool Map" from what-and-why to where-to-start
--    (The original site doesn't have it in what-and-why; it fits better in where-to-start)
UPDATE "Resource"
SET
  "categoryId" = 'cm7t2x9b20002ct0kwherestart',
  "updatedAt" = CURRENT_TIMESTAMP
WHERE slug = 'platform-engineering-tool-map';

-- 3. Check and fix platform-tooling-landscape status
--    (The previous UPDATE may not have run correctly)
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

-- Verify the results
SELECT slug, title, status, "categoryId" FROM "Resource" ORDER BY "categoryId", status, title;
