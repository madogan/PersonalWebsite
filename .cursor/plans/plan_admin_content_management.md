# Plan: Admin Content Management (Hero, Resume, Certifications, Blogs)

## Project Overview

Add a protected **admin panel** that allows editing the site’s main content: (1) **hero** (name and summary), (2) **resume** (experience, education, skills, etc.), (3) **certifications and achievements**, and (4) **blogs** (list, create, edit, delete). All content is file-based today (`content/resume/resume.json`, `content/blog/*.mdx`). The plan introduces write paths, validation, and admin UI only for these four areas—no Gemini, LinkedIn, or blog index in scope.

**Goals:**

1. Update name and summary in the first section (hero).
2. Update resume section (experience, education, skills, etc.).
3. Update certifications and achievements.
4. Manage blogs (list, create, edit, delete).

---

## Scope & Environment

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript 5.7.2
- **Styling:** Tailwind CSS 3.4.17
- **Package Manager:** PNPM
- **Existing data**
  - Hero + resume + certifications: `content/resume/resume.json` — read via `getResumeData()` in `lib/resume.ts`. No write API today.
  - Blog posts: `content/blog/*.mdx` — frontmatter (title, description, date, tags, optional locale, alternateLocale, alternateSlug) + body; read via `getAllPosts()`, `getPostBySlug()` in `lib/mdx.ts`. No write/delete today.
- **Consumers:** `PersonalHero` (personal + summary), `ExperienceSection`, `SkillsSection`, `CertificationsSection`, `LatestBlogsSection`, blog list and post pages.

**New dependencies (to add):**

- **Auth:** `next-auth@^5.0.0-beta` (compatible with Next 15.1 and React 19). Protect `/admin` via credentials provider or middleware + env-based secret.
- **Validation:** `zod@^3.23` for all admin payloads (resume and blog create/update).

**Required environment variables (auth):**

- `NEXTAUTH_URL` — site base URL (e.g. `http://localhost:3232` in dev).
- `NEXTAUTH_SECRET` — secret for signing sessions (generate with `openssl rand -base64 32` or project script if available).
- Credentials option: `ADMIN_EMAIL`, `ADMIN_PASSWORD` for credentials provider (store securely; do not commit).

---

## Interface Specifications

### 1. Resume / Hero

Use existing `ResumeData` from `lib/resume.ts`. No new types. Admin edits:

- **Hero:** `personal` (name, title, tagline, email, location, website, linkedin, github), `summary`
- **Resume:** `experience`, `education`, `coreSkills`, `keyStrengths`, `workWithMe`, `skills`, optional `aiMlopsExperience`, `caseStudy`
- **Certifications:** `certifications` — array of `{ name, version?, issuer, issueDate?, expirationDate?, credentialId?, credentialUrl?, skills? }`

Validate partial updates with Zod schemas that match these shapes (e.g. `ResumeData.personal`, `ResumeData.experience`, etc.).

### 2. Blog

Existing type in `lib/mdx.ts`:

```typescript
type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: number
  content: string
  locale: 'en' | 'tr'
  alternateLocale?: 'en' | 'tr'
  alternateSlug?: string
}
```

**Payload for create/update (API or form):**

```typescript
type BlogPostPayload = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  locale: 'en' | 'tr'
  alternateLocale?: 'en' | 'tr'
  alternateSlug?: string
  content: string
}
```

MDX frontmatter must include: `title`, `description`, `date`, `tags`, `locale`; optionally `alternateLocale`, `alternateSlug`. Body = raw Markdown/MDX after frontmatter.

### 3. Write Helpers (new, server-only)

- **Resume:** `writeResumeData(data: ResumeData): Promise<void>` — write the given (full) data to `content/resume/resume.json` atomically using `fs.promises`: write to a temp file in the same directory (e.g. `resume.json.<timestamp>.tmp`), then `fs.promises.rename` to the target path. Caller (API or server action) is responsible for reading existing data via `getResumeData()`, merging partial payload with Zod, then calling `writeResumeData(merged)`.
- **Blog:** `writeBlogPost(payload: BlogPostPayload): Promise<void>` — serialize frontmatter + body to MDX (e.g. via `gray-matter` or manual YAML) and write atomically to `content/blog/{slug}.mdx` (temp file in same dir, then rename). `deleteBlogPost(slug: string): Promise<void>` — delete `content/blog/{slug}.mdx` with `fs.promises.unlink`. Slug must be validated before use (see slug rules below).

---

## Step-by-Step Execution Plan

### Phase 1: Foundation

1. **Protect admin routes**
   - Add authentication (e.g. NextAuth credentials provider with `ADMIN_EMAIL`, `ADMIN_PASSWORD`, or middleware that checks a shared secret/cookie). All routes under `app/admin/` require auth; redirect unauthenticated users to a login page.
   - **Verification:** Unauthenticated access to `/admin` redirects to login; authenticated user can access admin pages.

2. **Admin layout and nav**
   - Create `app/admin/layout.tsx` (server component that checks session; redirect if not authenticated). Sidebar or top nav: Hero & Summary, Resume, Certifications, Blogs.
   - **Verification:** Navigating to `/admin`, `/admin/hero-summary`, `/admin/resume`, `/admin/certifications`, `/admin/blogs` works when authenticated.

### Phase 2: Hero & Summary

3. **Hero and summary edit page**
   - Page: `app/admin/hero-summary/page.tsx`. Load `getResumeData()` and bind to a form: `personal.name`, `personal.title`, `personal.tagline`, `personal.email`, `personal.location`, `personal.website`, `personal.linkedin`, `personal.github`, `summary`. Use a client component for the form; submit via server action or `PATCH /api/admin/resume`.
   - **Verification:** After save, the home page hero shows updated name and summary.

4. **Resume write API**
   - Add `writeResumeData(data: ResumeData): Promise<void>` in `lib/resume.ts` (async, `fs.promises`, atomic write: temp file in same dir then rename). Implement a server action or `PATCH /api/admin/resume` that: reads existing via `getResumeData()`, validates request body with Zod (partial `ResumeData` schema), deep-merges body into existing, calls `writeResumeData(merged)`.
   - **Verification:** Updating only `summary` or only `personal.name` does not clear other fields; file remains valid JSON.

### Phase 3: Resume Section

5. **Resume section edit page**
   - Page: `app/admin/resume/page.tsx`. Load full resume; form for `experience`, `education`, `coreSkills` (and any other resume fields displayed on the site). Use dynamic list UI (add/remove entries) for `experience` and `education`. Submit via the same resume update mechanism as step 4.
   - **Verification:** Changes to experience or education appear on the home page resume section.

### Phase 4: Certifications

6. **Certifications edit page**
   - Page: `app/admin/certifications/page.tsx`. List `resume.certifications`; allow add, edit, delete. Fields per item: name, version, issuer, issueDate, expirationDate, credentialId, credentialUrl, skills (array). Submit by updating resume (e.g. send only `certifications` and merge into full resume before write).
   - **Verification:** Adding, editing, or removing a certification updates the home page certifications section.

### Phase 5: Blog Management

7. **Blog list page**
   - Page: `app/admin/blogs/page.tsx`. List all posts via `getAllPosts()` with columns such as title, slug, date, locale, tags. Actions: Edit, Delete. Delete: confirm then call `deleteBlogPost(slug)` (server action or API).
   - **Verification:** List shows all posts; delete removes the file and the post disappears from the public blog list.

8. **Blog create and edit**
   - Routes: `app/admin/blogs/new/page.tsx` (create) and `app/admin/blogs/[slug]/edit/page.tsx` (edit). Form fields: slug, title, description, date, tags, locale, optional alternateLocale, optional alternateSlug, body (MDX content). Validate slug with Zod (e.g. `z.string().regex(/^[a-z0-9-]+$/)`); on create, slug must be unique. On edit when slug changes: call `writeBlogPost(newPayload)` first, then `deleteBlogPost(oldSlug)` so content is not lost on write failure. Use shared `writeBlogPost` and `deleteBlogPost` in `lib/mdx.ts` (or a server-only module that uses `lib/mdx` types). Serialize frontmatter + body with gray-matter or equivalent.
   - **Next.js 15+:** For `app/admin/blogs/[slug]/edit/page.tsx`, use `params: Promise<{ slug: string }>` and `const { slug } = await params`.
   - **Verification:** New post appears in blog list and at `/blog/[slug]`; editing updates the existing post; slug change creates new file and removes old file.

### Phase 6: Error Handling

9. **Admin error boundary and validation**
   - Add `app/admin/error.tsx` (client component, same pattern as `app/error.tsx`: receive `error`, `reset`, show a short message and “Try again”). Use Zod for all resume and blog payloads; return 400 with a clear message on validation failure.
   - **Verification:** Invalid payload returns 400 with message; unhandled errors show the error boundary.

---

## Verification Criteria Summary

| Task | Verification |
|------|--------------|
| Auth | Unauthenticated user cannot access `/admin`; login works. |
| Hero & Summary | Edits to name/summary appear on home hero. |
| Resume write | Partial update does not wipe other fields; experience/education edits appear on home. |
| Certifications | Add/edit/delete certifications; home certifications section updates. |
| Blog list | All posts listed; delete removes file and post from site. |
| Blog create/edit | New post appears at `/blog/[slug]`; edit updates existing post. |
| Errors | Invalid input returns 400; runtime errors show error boundary. |

---

## Best Practices and Notes

- **DRY:** Reuse `getResumeData()`, `getAllPosts()`, `getPostBySlug()`. Add only the minimal write layer: `writeResumeData`, `writeBlogPost`, `deleteBlogPost`.
- **Security:** Admin routes and write APIs must be protected; validate all inputs with Zod; use atomic writes for `resume.json` and MDX files (write to temp file, then rename).
- **Files:** Use `fs.promises` for new write code; keep existing read paths as-is unless refactoring for consistency.
- **Next.js 15+:** Server Components for layout and data loading; Client Components for forms and interactive lists; server actions or route handlers for mutations. Dynamic route params typed as `Promise<{ slug: string }>` and awaited.
- **Blog slug:** Sanitize and validate slug before any file operation: allow only `[a-z0-9-]` (e.g. Zod regex `z.string().regex(/^[a-z0-9-]+$/)`), reject empty, enforce max length (e.g. 200). Reject path segments (no `/`, `..`). On create, ensure slug is unique (no existing `content/blog/{slug}.mdx`). On edit when slug changes: write new file first via `writeBlogPost(newPayload)`, then call `deleteBlogPost(oldSlug)` so content is not lost if write fails.

---

## Review Notes

- **Dependency audit:** Plan specifies `next-auth@^5.0.0-beta` and `zod@^3.23` to align with existing `next@^15.1.0` and `react@^19.0.0` in `package.json`; no deprecated APIs used.
- **Pattern alignment:** Dynamic route params follow Next.js 15+ convention (`params: Promise<{ slug: string }>`, `await params`) as already used in `app/blog/[slug]/page.tsx`. Admin `error.tsx` mirrors root `app/error.tsx` (client component, `error`/`reset`, “Try again” button).
- **Reuse:** Write layer is minimal; all reads use existing `getResumeData()`, `getAllPosts()`, `getPostBySlug()` from `lib/resume.ts` and `lib/mdx.ts`. No duplication of types or read logic.
- **Risks mitigated:** (1) Atomic writes (temp file + rename in same directory) avoid partial writes. (2) Slug validation and “write new then delete old” on slug change avoid path traversal and data loss. (3) Zod on all admin inputs and 400 on validation failure keep invalid data out of the filesystem.
- **Consistency:** New write helpers use `fs.promises`; existing sync read APIs are unchanged to avoid broad refactors. Project has no `lib/logging`; admin APIs may use structured error responses and optional `console.error` in dev until a logger is introduced.

---

## Out of Scope (this plan)

- Gemini, LinkedIn, blog JSON index, git automation, i18n for admin UI. These can be added in separate plans or later phases.
