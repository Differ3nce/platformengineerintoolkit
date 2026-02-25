-- Enable RLS on Prisma's own migrations table.
-- The postgres superuser bypasses RLS so migrate deploy continues to work.
ALTER TABLE "_prisma_migrations" ENABLE ROW LEVEL SECURITY;
