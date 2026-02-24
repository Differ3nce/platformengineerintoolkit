-- ============================================================
-- Migrate Resource.authorId → authors many-to-many relation
-- Run this in the Supabase SQL Editor
-- ============================================================

-- OPTIONAL: Run this first to see current author assignments before migrating.
-- SELECT r.slug, u.name FROM "Resource" r LEFT JOIN "User" u ON u.id = r."authorId" ORDER BY r.slug;

-- Step 1: Create the new join table (safe to re-run)
CREATE TABLE IF NOT EXISTS "_AuthoredBy" (
  "A" TEXT NOT NULL,
  "B" TEXT NOT NULL,
  CONSTRAINT "_AuthoredBy_AB_pkey" PRIMARY KEY ("A", "B")
);

CREATE INDEX IF NOT EXISTS "_AuthoredBy_B_index" ON "_AuthoredBy"("B");

-- Add foreign key constraints only if they don't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = '_AuthoredBy_A_fkey'
  ) THEN
    ALTER TABLE "_AuthoredBy"
      ADD CONSTRAINT "_AuthoredBy_A_fkey"
      FOREIGN KEY ("A") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = '_AuthoredBy_B_fkey'
  ) THEN
    ALTER TABLE "_AuthoredBy"
      ADD CONSTRAINT "_AuthoredBy_B_fkey"
      FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- Step 2: Migrate existing authorId data into the join table
INSERT INTO "_AuthoredBy" ("A", "B")
SELECT id, "authorId"
FROM "Resource"
WHERE "authorId" IS NOT NULL
ON CONFLICT DO NOTHING;

-- Step 3: Drop the old column
ALTER TABLE "Resource" DROP COLUMN IF EXISTS "authorId";

-- Step 4: Verify — shows each resource with its authors
SELECT
  r.slug,
  r.title,
  array_agg(u.name ORDER BY u.name) FILTER (WHERE u.name IS NOT NULL) AS authors
FROM "Resource" r
LEFT JOIN "_AuthoredBy" ab ON ab."A" = r.id
LEFT JOIN "User" u ON u.id = ab."B"
GROUP BY r.slug, r.title
ORDER BY r.slug;
