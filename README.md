# Platform Engineering Toolkit

Proven practices to shape the people and organizational side of platform engineering.

**Tech stack:** Next.js 16 · TypeScript · Tailwind CSS · Prisma · PostgreSQL · Auth.js

## Getting Started

### Option A: Docker (Recommended)

The fastest way to get a consistent dev environment on any machine.

**Prerequisites:** [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
# 1. Clone the repo
git clone git@github.com:Differ3nce/platformengineerintoolkit.git
cd platformengineerintoolkit

# 2. Create your env file for Docker
cp .env.example .env.docker
# Edit .env.docker — set DATABASE_URL host to 'db':
#   DATABASE_URL="postgresql://postgres:postgres@db:5432/platform_toolkit_dev"
# Add your Google OAuth credentials and generate an AUTH_SECRET.

# 3. Start everything (builds app image + starts PostgreSQL)
npm run docker:up

# 4. In a separate terminal, run the database migration
npm run docker:migrate

# 5. (Optional) Seed the database with initial content
npm run docker:seed
```

The app is now running at **http://localhost:3000**.

**Other Docker commands:**
```bash
npm run docker:down       # Stop all containers
npm run docker:studio     # Open Prisma Studio (DB browser)
npm run docker:seed       # Run seed script
```

### Option B: Local Development

**Prerequisites:** [Node.js 22+](https://nodejs.org/) · [PostgreSQL 17](https://www.postgresql.org/download/)

```bash
# 1. Clone the repo
git clone git@github.com:Differ3nce/platformengineerintoolkit.git
cd platformengineerintoolkit

# 2. Install dependencies
npm install

# 3. Create your env file
cp .env.example .env
# Edit .env — add your PostgreSQL password, Google OAuth credentials, AUTH_SECRET

# 4. Create the database
psql -U postgres -c "CREATE DATABASE platform_toolkit_dev;"

# 5. Run migrations
npm run db:migrate

# 6. Start the dev server
npm run dev
```

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    admin/                # Admin panel (protected)
    api/                  # API route handlers
    [categorySlug]/       # Public category + resource pages
    about/                # Static about page
    get-involved/         # Contribution page
  components/             # React components
    admin/                # Admin-specific components
    layout/               # Header, Footer
    resources/            # ResourceCard, MarkdownContent
  lib/                    # Shared utilities (prisma, auth, utils)
prisma/
  schema.prisma           # Database schema
  migrations/             # Migration history
  seed.ts                 # Seed script
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed the database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run docker:up` | Start Docker dev environment |
| `npm run docker:down` | Stop Docker containers |
