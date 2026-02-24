-- Fix resource type fields: convert space-separated multi-values to comma-separated
-- Run this in the Supabase SQL Editor.
--
-- Step 1: Check current type values in the database
SELECT slug, title, type FROM "Resource" ORDER BY title;

-- Step 2: Update types to use comma-separated format
-- (run after reviewing Step 1 output)
--
-- Only resources whose type contains a space need updating.
-- Single-word types (Article, Workshop, Canvas, Framework, Guide, etc.) are fine as-is.
-- Multi-word single-concept types (e.g. "Maturity Model", "Video series") are also fine as-is.
--
-- Update Wardley Mapping resource (type = "Book Guide Video series")
UPDATE "Resource"
SET type = 'Book,Guide,Video series'
WHERE slug = 'wardley-mapping';

-- If other resources have space-separated multi-value types, add UPDATE statements here.
-- Pattern: 'Value1 Value2 Value3' -> 'Value1,Value2,Value3'
-- Be careful with multi-word single concepts like "Maturity Model" or "Video series" –
-- those should NOT be split.
