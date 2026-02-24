-- ============================================================
-- Migrate Resource.type → Tag many-to-many relation
-- Tags match exactly what was shown on platformengineeringtoolkit.com
-- Run this in the Supabase SQL Editor
-- ============================================================

-- OPTIONAL: Run this first to see current state before migrating.
-- SELECT slug, title FROM "Resource" ORDER BY slug;

-- Step 1: Upsert all format tags used on the original site (safe to re-run)
INSERT INTO "Tag" (id, name, slug)
VALUES
  (gen_random_uuid(), 'Article',         'article'),
  (gen_random_uuid(), 'Architecture',    'architecture'),
  (gen_random_uuid(), 'Book',            'book'),
  (gen_random_uuid(), 'Canvas',          'canvas'),
  (gen_random_uuid(), 'Change Approach', 'change-approach'),
  (gen_random_uuid(), 'Guide',           'guide'),
  (gen_random_uuid(), 'Maturity model',  'maturity-model'),
  (gen_random_uuid(), 'Tool',            'tool'),
  (gen_random_uuid(), 'Video Case Study','video-case-study'),
  (gen_random_uuid(), 'Workshop tool',   'workshop-tool')
ON CONFLICT (slug) DO NOTHING;

-- Step 2: Delete any tags not in the correct set (cleanup old/unused tags)
DELETE FROM "Tag"
WHERE slug NOT IN (
  'article', 'architecture', 'book', 'canvas', 'change-approach',
  'guide', 'maturity-model', 'tool', 'video-case-study', 'workshop-tool'
);

-- Step 3: Clear ALL existing tag links on all resources (clean slate)
DELETE FROM "_ResourceToTag"
WHERE "A" IN (SELECT id FROM "Resource");

-- Step 4: Link each resource to its correct tags from the original site

-- Introduction to platform engineering → Article
INSERT INTO "_ResourceToTag" ("A", "B")
SELECT r.id, t.id FROM "Resource" r, "Tag" t
WHERE r.slug = 'introduction-to-platform-engineering' AND t.slug = 'article';

-- Creating a platform as a system of value → Article
INSERT INTO "_ResourceToTag" ("A", "B")
SELECT r.id, t.id FROM "Resource" r, "Tag" t
WHERE r.slug = 'creating-platform-as-value-system' AND t.slug = 'article';

-- The Platform Engineering Tool Map → Tool
INSERT INTO "_ResourceToTag" ("A", "B")
SELECT r.id, t.id FROM "Resource" r, "Tag" t
WHERE r.slug = 'platform-engineering-tool-map' AND t.slug = 'tool';

-- Architecture for Flow → Canvas, Workshop tool, Book
INSERT INTO "_ResourceToTag" ("A", "B")
SELECT r.id, t.id FROM "Resource" r, "Tag" t
WHERE r.slug = 'architecture-for-flow'
  AND t.slug IN ('canvas', 'workshop-tool', 'book');

-- PE Maturity Model (by CNCF) → Maturity model
INSERT INTO "_ResourceToTag" ("A", "B")
SELECT r.id, t.id FROM "Resource" r, "Tag" t
WHERE r.slug = 'pe-maturity-model' AND t.slug = 'maturity-model';

-- Platform Tooling Landscape → Architecture
INSERT INTO "_ResourceToTag" ("A", "B")
SELECT r.id, t.id FROM "Resource" r, "Tag" t
WHERE r.slug = 'platform-tooling-landscape' AND t.slug = 'architecture';

-- Platform Engineering Kickoff Approach → Change Approach
INSERT INTO "_ResourceToTag" ("A", "B")
SELECT r.id, t.id FROM "Resource" r, "Tag" t
WHERE r.slug = 'platform-engineering-kickoff-approach' AND t.slug = 'change-approach';

-- PE Engagement Canvas → Canvas
INSERT INTO "_ResourceToTag" ("A", "B")
SELECT r.id, t.id FROM "Resource" r, "Tag" t
WHERE r.slug = 'pe-engagement-canvas' AND t.slug = 'canvas';

-- PE Enablement Services Canvas → Canvas
INSERT INTO "_ResourceToTag" ("A", "B")
SELECT r.id, t.id FROM "Resource" r, "Tag" t
WHERE r.slug = 'pe-enablement-services-canvas' AND t.slug = 'canvas';

-- Platform Funding Design → Workshop tool
INSERT INTO "_ResourceToTag" ("A", "B")
SELECT r.id, t.id FROM "Resource" r, "Tag" t
WHERE r.slug = 'platform-funding-design' AND t.slug = 'workshop-tool';

-- User Needs Mapping → Workshop tool, Book
INSERT INTO "_ResourceToTag" ("A", "B")
SELECT r.id, t.id FROM "Resource" r, "Tag" t
WHERE r.slug = 'user-needs-mapping'
  AND t.slug IN ('workshop-tool', 'book');

-- Story Telling on Different Levels → Guide
INSERT INTO "_ResourceToTag" ("A", "B")
SELECT r.id, t.id FROM "Resource" r, "Tag" t
WHERE r.slug = 'storytelling-on-different-levels' AND t.slug = 'guide';

-- Find Sponsors and Core Team → Guide
INSERT INTO "_ResourceToTag" ("A", "B")
SELECT r.id, t.id FROM "Resource" r, "Tag" t
WHERE r.slug = 'find-sponsors-and-core-team' AND t.slug = 'guide';

-- Step 5: Drop the old columns
ALTER TABLE "Resource" DROP COLUMN IF EXISTS "type";
ALTER TABLE "Resource" DROP COLUMN IF EXISTS "readTime";

-- Step 6: Verify — shows each resource with its new tags
SELECT r.slug, r.title, array_agg(t.name ORDER BY t.name) AS tags
FROM "Resource" r
LEFT JOIN "_ResourceToTag" rt ON rt."A" = r.id
LEFT JOIN "Tag" t ON t.id = rt."B"
GROUP BY r.slug, r.title
ORDER BY r.slug;
