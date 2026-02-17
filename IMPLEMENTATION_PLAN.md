# Platform Engineering Toolkit - Implementation Plan

## Project Overview

Recreate [platformengineeringtoolkit.com](https://platformengineeringtoolkit.com) as a fullstack Next.js application with a proper backend, admin panel, and user interaction features.

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router, TypeScript) |
| Database | PostgreSQL (Neon, via Vercel integration) |
| ORM | Prisma |
| Auth | Auth.js v5 (Google + Facebook OAuth) |
| Styling | Tailwind CSS |
| Rich Text | Markdown (MDEditor for admin, react-markdown for rendering) |
| File Storage | Vercel Blob (thumbnails/images) |
| Hosting | Vercel |
| Monorepo | Single Next.js project |

### Data Model (Prisma Schema)

```prisma
enum Role {
  VISITOR
  CONTRIBUTOR
  ADMIN
}

enum ResourceStatus {
  DRAFT
  PUBLISHED
  COMING_SOON
}

enum SubmissionStatus {
  PENDING
  APPROVED
  REJECTED
}

model User {
  id            String       @id @default(cuid())
  name          String?
  email         String       @unique
  image         String?
  role          Role         @default(VISITOR)
  accounts      Account[]
  sessions      Session[]
  likes         Like[]
  comments      Comment[]
  submissions   Submission[] @relation("SubmittedBy")
  reviewed      Submission[] @relation("ReviewedBy")
  resources     Resource[]   @relation("AuthoredBy")
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
}

model Account { /* Auth.js managed */ }
model Session { /* Auth.js managed */ }

model Category {
  id           String     @id @default(cuid())
  name         String     @unique
  slug         String     @unique
  description  String?
  displayOrder Int        @default(0)
  resources    Resource[]
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
}

model Resource {
  id              String         @id @default(cuid())
  title           String
  slug            String         @unique
  description     String         // Short description for card
  body            String         // Markdown content for detail page
  type            String         // Article, Tool, Framework, Canvas, Video, Workshop, etc.
  status          ResourceStatus @default(DRAFT)
  readTime        String?        // e.g. "8 min read", "45 min workshop"
  targetAudience  String[]       // Array of audience labels
  thumbnailUrl    String?
  externalLinks   Json?          // Array of { label, url } for "Further Reading"
  category        Category       @relation(fields: [categoryId], references: [id])
  categoryId      String
  author          User?          @relation("AuthoredBy", fields: [authorId], references: [id])
  authorId        String?
  tags            Tag[]
  likes           Like[]
  comments        Comment[]
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
}

model Tag {
  id        String     @id @default(cuid())
  name      String     @unique
  slug      String     @unique
  resources Resource[]
}

model Like {
  id         String   @id @default(cuid())
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId     String
  resource   Resource @relation(fields: [resourceId], references: [id], onDelete: Cascade)
  resourceId String
  createdAt  DateTime @default(now())

  @@unique([userId, resourceId]) // One like per user per resource
}

model Comment {
  id         String   @id @default(cuid())
  body       String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId     String
  resource   Resource @relation(fields: [resourceId], references: [id], onDelete: Cascade)
  resourceId String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Submission {
  id            String           @id @default(cuid())
  title         String
  description   String
  body          String?          // Optional detailed content
  type          String
  externalUrl   String?
  status        SubmissionStatus @default(PENDING)
  submittedBy   User             @relation("SubmittedBy", fields: [submittedById], references: [id])
  submittedById String
  reviewedBy    User?            @relation("ReviewedBy", fields: [reviewedById], references: [id])
  reviewedById  String?
  reviewNote    String?
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt
}
```

---

## Stage 1: Project Foundation

**Goal**: Scaffolded Next.js project with database, auth, and CI working.

**Success Criteria**:
- Next.js app runs locally with TypeScript, Tailwind, ESLint
- Prisma schema migrated to local PostgreSQL (or Neon dev branch)
- Auth.js configured with Google OAuth (Facebook added later)
- Users can sign in, session persists, role is stored
- GitHub repo initialized with CI (lint + type-check on PR)

**Tasks**:
1. `npx create-next-app@latest` with TypeScript, Tailwind, App Router, ESLint
2. Install dependencies: `prisma`, `@prisma/client`, `next-auth`, `@auth/prisma-adapter`
3. Create Prisma schema (as above), run initial migration
4. Configure Auth.js with Google provider + Prisma adapter
5. Create basic layout shell (header with sign-in button)
6. Set up environment variables (.env.local, .env.example)
7. Initialize git repo, create .gitignore, push to GitHub
8. Add GitHub Actions workflow for lint + typecheck

**Tests**:
- Auth flow: sign in → session created → user in DB with VISITOR role
- Prisma client generates without errors
- `npm run build` succeeds

**Status**: Complete

---

## Stage 2: Public Pages

**Goal**: All visitor-facing pages render with real data from the database.

**Success Criteria**:
- Homepage with hero section, embedded video, category navigation
- Category pages display resource cards (filterable by type/audience)
- Resource detail pages render markdown body, metadata, external links
- About page renders (code-managed)
- Pages are statically generated where possible (ISR)
- Mobile-responsive layout

**Tasks**:
1. Create shared layout component (header nav, footer)
2. Build homepage (`/`): hero, video embed, 3 category cards
3. Build category page (`/[category-slug]`): resource card grid with type badges
4. Build resource detail page (`/[category-slug]/[resource-slug]`):
   - Metadata bar (type, read time, audience)
   - Markdown body rendering (react-markdown + rehype plugins)
   - External links / "Further Reading" section
   - Back navigation (breadcrumb to category)
5. Build About page (`/about`): code-managed static content
6. Build Get Involved page (`/get-involved`): info + submission form (form wired in Stage 4)
7. Add loading states, error boundaries, not-found pages
8. Implement ISR (revalidate on resource/category update)

**Tests**:
- Category page shows only resources belonging to that category
- Resource detail page renders markdown correctly
- Coming Soon resources display but are not clickable / show badge
- 404 for non-existent slugs
- Pages pass Lighthouse accessibility audit (score > 90)

**Status**: Complete

---

## Stage 3: Admin Panel

**Goal**: Admins can fully manage all content through a web UI.

**Success Criteria**:
- `/admin` routes protected (ADMIN role only)
- CRUD for Resources (with markdown editor, image upload)
- CRUD for Categories (with drag-to-reorder)
- CRUD for Tags
- Submission review queue (approve → creates draft resource, reject with note)
- Comment moderation view (delete inappropriate comments)

**Tasks**:
1. Create admin layout with sidebar navigation
2. Add middleware to protect `/admin/*` routes (check session + role)
3. Build Resource management:
   - List view with search, filter by status/category/type
   - Create/Edit form: title, slug (auto-generated), description, markdown editor (body), type dropdown, status, read time, target audience (multi-select/tags input), category selector, tag selector, thumbnail upload, external links (dynamic add/remove)
   - Delete with confirmation
4. Build Category management:
   - List with reorder (displayOrder)
   - Create/Edit form: name, slug, description
   - Delete (only if no resources attached)
5. Build Tag management:
   - List, create, edit, delete
   - Show resource count per tag
6. Build Submission review:
   - Queue view (PENDING first, then APPROVED/REJECTED)
   - Review action: Approve (creates draft Resource) / Reject (add note)
   - Detail view showing full submission
7. Build Comment moderation:
   - List all comments with resource context
   - Delete action
8. Create API route handlers:
   - `POST/PUT/DELETE /api/admin/resources`
   - `POST/PUT/DELETE /api/admin/categories`
   - `POST/PUT/DELETE /api/admin/tags`
   - `PUT /api/admin/submissions/[id]/review`
   - `DELETE /api/admin/comments/[id]`

**Tests**:
- Non-admin users get 403 on admin routes
- Creating a resource makes it appear on the public page (when published)
- Approving a submission creates a draft resource
- Deleting a category with resources fails with error message
- Slug auto-generation produces URL-safe strings

**Status**: Complete

---

## Stage 4: User Interactions

**Goal**: Visitors can like resources, comment, and submit contributions.

**Success Criteria**:
- Visitors can like/unlike resources (persisted, shown as count)
- Visitors can comment on resource detail pages
- Contributors can submit new resource proposals via form
- All interactions require authentication (sign-in prompt if not)

**Tasks**:
1. Build Like feature:
   - Heart/like button on resource cards and detail pages
   - `POST/DELETE /api/resources/[id]/like`
   - Optimistic UI update
   - Like count displayed on cards
2. Build Comments section on resource detail page:
   - Comment list (newest first)
   - "Add comment" textarea (visible when signed in, prompt to sign in otherwise)
   - `POST /api/resources/[id]/comments`
   - `DELETE /api/resources/[id]/comments/[commentId]` (own comments only, or admin)
3. Build Submission form on `/get-involved`:
   - Fields: title, type, description, body (markdown), external URL
   - Requires sign-in
   - `POST /api/submissions`
   - Success confirmation with "We'll review your submission" message
4. Add Facebook OAuth provider to Auth.js
5. User profile dropdown in header (name, avatar, sign out)

**Tests**:
- Liking twice doesn't create duplicate (unique constraint)
- Unlike removes the like
- Comment appears immediately after posting (no moderation)
- Only comment author or admin can delete a comment
- Submission creates record with PENDING status
- Unauthenticated users are prompted to sign in

**Status**: In Progress

---

## Stage 5: Seed Data, Polish & Deploy

**Goal**: Site is live on Vercel with all existing content migrated.

**Success Criteria**:
- All 19 existing resources seeded into database
- 3 categories created with correct assignments
- Site deployed to Vercel, accessible via preview URL
- Performance: Lighthouse score > 90 for performance, accessibility, SEO
- DNS ready to switch when confirmed

**Tasks**:
1. Create seed script (`prisma/seed.ts`):
   - 3 admin users (Tom, Gielen, Andrea)
   - 3 categories (What And Why, Where To Start, Starting And Progressing)
   - 19 resources with full content scraped from existing pages
   - Appropriate tags
2. Polish UI:
   - Ensure consistent card layout across categories
   - Responsive design testing (mobile, tablet, desktop)
   - Dark mode support (optional / stretch goal)
   - Meta tags & Open Graph for social sharing
   - Favicon and site metadata
3. Set up Vercel project:
   - Connect GitHub repo
   - Add environment variables (auth secrets, database URL)
   - Configure Vercel Postgres (or Neon integration)
   - Run Prisma migration on production
   - Run seed script
4. Test deployment:
   - All pages render correctly
   - Auth flow works with production OAuth credentials
   - Admin panel accessible to admin users
   - Like/comment features work
5. Performance & SEO:
   - Verify ISR is working
   - Add sitemap.xml generation
   - Add robots.txt
   - Test Open Graph tags

**Tests**:
- All 19 resources render on correct category pages
- Seed script is idempotent (can run multiple times safely)
- Production build has no console errors
- All API routes return correct status codes
- OAuth works with production redirect URIs

**Status**: Not Started

---

## Resource Inventory (for Seed Data)

### What And Why (3 resources)
1. Introduction to platform engineering (Article, 8 min read) - PUBLISHED
2. PlatformOps - Platforms as systems of value (Article) - PUBLISHED
3. Explain your what and why to different levels (Video Case Study) - PUBLISHED

### Where To Start (6 resources)
1. Wardley mapping - Strategic Platform Planning (Book/Guide/Video) - PUBLISHED
2. PlatformOps - Understanding your landscape / Theme Park tool (Tool, 45 min workshop) - PUBLISHED
3. Team Topologies (Framework) - PUBLISHED
4. Platform Flow, Quick Evaluation (Canvas) - COMING_SOON
5. Describe your vision and the problem you want to solve (Article) - COMING_SOON
6. Platform Engineering pilot characteristics (Tool) - COMING_SOON

### Starting And Progressing (10 resources)
1. Platform Engineering Maturity Model by CNCF (Maturity Model) - PUBLISHED
2. Service Blueprint (Workshop Tool) - PUBLISHED
3. User Needs Mapping (Workshop Tool/Book) - PUBLISHED
4. Architecture for Flow Canvas (Workshop Tool/Book) - PUBLISHED
5. Platform Enablement Services Canvas (Canvas) - PUBLISHED
6. Platform Tooling Landscape (Architecture/Article) - PUBLISHED
7. Platform Engineering Metrics Overview (Framework/Article) - PUBLISHED
8. Platform Engineering Kickoff Change Approach (Change Approach) - COMING_SOON
9. Platform Engineering Change Engagement Canvas (Canvas) - COMING_SOON
10. Platform Funding Design (Workshop Tool) - COMING_SOON

**Total: 19 resources (12 published, 7 coming soon)**

---

## Folder Structure

```
platform-engineering-toolkit/
├── .github/
│   └── workflows/
│       └── ci.yml                    # Lint + typecheck on PR
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts                       # Seed data script
├── public/
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout (header, footer, providers)
│   │   ├── page.tsx                  # Homepage
│   │   ├── about/
│   │   │   └── page.tsx              # About (code-managed)
│   │   ├── get-involved/
│   │   │   └── page.tsx              # Get Involved + submission form
│   │   ├── [categorySlug]/
│   │   │   ├── page.tsx              # Category page (resource cards)
│   │   │   └── [resourceSlug]/
│   │   │       └── page.tsx          # Resource detail page
│   │   ├── admin/
│   │   │   ├── layout.tsx            # Admin layout (sidebar)
│   │   │   ├── page.tsx              # Admin dashboard
│   │   │   ├── resources/
│   │   │   │   ├── page.tsx          # Resource list
│   │   │   │   ├── new/page.tsx      # Create resource
│   │   │   │   └── [id]/edit/page.tsx# Edit resource
│   │   │   ├── categories/
│   │   │   │   └── page.tsx          # Category management
│   │   │   ├── tags/
│   │   │   │   └── page.tsx          # Tag management
│   │   │   ├── submissions/
│   │   │   │   └── page.tsx          # Submission review queue
│   │   │   └── comments/
│   │   │       └── page.tsx          # Comment moderation
│   │   └── api/
│   │       ├── auth/[...nextauth]/
│   │       │   └── route.ts          # Auth.js route handler
│   │       ├── resources/
│   │       │   └── [id]/
│   │       │       ├── like/route.ts
│   │       │       └── comments/route.ts
│   │       ├── submissions/
│   │       │   └── route.ts
│   │       └── admin/
│   │           ├── resources/route.ts
│   │           ├── categories/route.ts
│   │           ├── tags/route.ts
│   │           ├── submissions/[id]/review/route.ts
│   │           └── comments/[id]/route.ts
│   ├── components/
│   │   ├── ui/                       # Reusable UI primitives
│   │   ├── layout/                   # Header, Footer, Sidebar
│   │   ├── resources/                # ResourceCard, ResourceDetail, etc.
│   │   ├── comments/                 # CommentList, CommentForm
│   │   └── admin/                    # Admin-specific components
│   ├── lib/
│   │   ├── prisma.ts                 # Prisma client singleton
│   │   ├── auth.ts                   # Auth.js config
│   │   └── utils.ts                  # Shared utilities
│   └── types/
│       └── index.ts                  # Shared TypeScript types
├── .env.example
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── IMPLEMENTATION_PLAN.md
```
