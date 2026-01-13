# Commit Command

Create a semantic commit following the project's commit rules. This command ensures correct formatting, atomic commits, and scope-aware commit messages.

## Purpose

Use this command when finalizing a task to:

1. Validate commit message structure
2. Ensure atomic, single-purpose commits
3. Enforce project commit standards
4. Apply correct scope classification

---

# Commit Message Format

```
<type>([<scope>]): <subject>

[optional body]

[optional footer]
```

### Scope (Optional but Recommended)

Scopes help categorize changes by area of the codebase:

* `app` - Next.js App Router pages and routes
* `components` - UI components (blog, home, layout, resume, ui)
* `lib` - Library utilities (constants, mdx, resume, utils)
* `types` - TypeScript type definitions
* `api` - API routes and endpoints
* `ui` - UI components and styling
* `config` - Configuration files (next.config.ts, tailwind.config.ts, etc.)
* `deps` - Dependency updates
* `ci` - CI/CD configurations
* `docs` - Documentation
* `content` - Content files (blog posts, resume data)

**Note**: For simple changes that don't fit a specific scope, you can omit the scope.

Correct examples:

```
feat(components): add blog card component
fix(ui): resolve dark-mode hover bug
chore(deps): update next to 15.1.0
feat(app): add resume page
fix(lib): resolve MDX parsing issue
docs: update deployment guide
```

Incorrect examples:

```
feat: add feature (too vague, should include scope)
fix(web:ui): resolve issue (no package prefix needed)
```

---

# Commit Types

* **feat**: New feature or enhancement
* **fix**: Bug fix
* **docs**: Documentation only
* **style**: Format-only changes (whitespace, formatting)
* **refactor**: Code modification without feature/fix
* **perf**: Performance improvements
* **test**: Test additions or updates
* **chore**: Tooling, build, dependency updates
* **ci**: CI/CD implementations
* **revert**: Reverting a previous commit
* **db**: Database schema/migration changes
* **log**: Centralized logging changes

---

# Scope Guidelines

### App Router (`app`)

Use for Next.js App Router pages, layouts, and route handlers:

```
feat(app): add competition detail page
fix(app): resolve locale routing issue
refactor(app): restructure admin layout
```

### Components (`components`)

Use for UI components in `src/components/`:

```
feat(components): add event card component
fix(components): resolve button alignment in navbar
refactor(components): optimize image gallery rendering
```

### Library (`lib`)

Use for utilities and library code:

```
feat(lib): add resume data parser
fix(lib): resolve MDX frontmatter parsing
refactor(lib): restructure constants
```

### API Routes (`api`)

Use for API route handlers:

```
feat(api): add competition registration endpoint
fix(api): resolve authentication middleware issue
refactor(api): optimize event list response
```

### UI/Styling (`ui`)

Use for styling, design tokens, and UI-related changes:

```
feat(ui): add dark mode support
fix(ui): resolve responsive layout breakpoint
style(ui): update button hover states
```

---

# Subject Rules

* Use imperative mood ("add" not "added", "fix" not "fixed")
* Max 72 characters
* No ending period
* Start with lowercase

```
feat(api): add refresh token endpoint
fix(ui): resolve dark mode hover state
docs: update deployment guide
```

---

# Examples

### Features

```
feat(components): add blog card component
feat(app): add resume page
feat(lib): add MDX content parser
feat(components): add certifications section
feat(content): add new blog post
```

### Bug Fixes

```
fix(ui): resolve dark mode hover state
fix(components): resolve image gallery layout shift
fix(lib): resolve MDX frontmatter parsing issue
fix(app): handle missing blog post gracefully
fix(components): resolve responsive layout breakpoint
```

### Documentation

```
docs: update deployment guide
docs(api): add authentication endpoint documentation
docs: update README with new environment variables
```

### Refactoring

```
refactor(lib): restructure resume data types
refactor(components): optimize blog list rendering
refactor(app): restructure layout structure
refactor(components): consolidate UI components
```

### Chores

```
chore(deps): update next to 15.1.0
chore(config): update next.config.ts with new image domains
chore(ci): add GitHub Actions workflow for testing
chore(release): bump version to 0.6.4
```

---

# Pre-Commit Checklist

1. **Code Quality**

   * Run `pnpm lint` and `pnpm type-check`
   * Fix any linting or type errors
   * Run `pnpm format:check` to ensure code formatting

2. **Atomicity**

   * Commit only one logical change
   * Add only relevant files
   * Group related changes together

3. **Message Validity**

   * Correct type (feat, fix, docs, etc.)
   * Appropriate scope (if applicable)
   * Imperative subject
   * Max 72 characters

4. **Documentation**

   * Update docs when needed
   * Update `CHANGELOG.md` for user-facing impacts
   * Update version if releasing

---

# Atomic Commit Principles

**Good**

```
feat(auth): implement email verification flow
- add verification endpoint
- add token validation
- update email templates
- add tests
```

**Bad**

```
chore: various updates
- fix bug
- add feature
- update deps
```

---

# Git Usage Rules for AI Agents

* Commit only files modified during this task session
* Do not inspect `git status` or history
* Always specify explicit file paths
* Track changes mentally based on what you actually edited

Example:

```bash
git add src/app/api/auth/verify.ts src/lib/auth/verification.ts
git commit -m "feat(auth): implement email verification flow"
```

**Windows Environment Notes:**

* Use CMD or PowerShell commands
* Paths use backslashes: `src\app\page.tsx`
* Git commands work the same across platforms

---

# Version Management (SemVer)

### Version Format

`MAJOR.MINOR.PATCH`

* **MAJOR**: Breaking changes
* **MINOR**: New features
* **PATCH**: Fixes, docs, small changes

### Version Files

The project maintains version in two places:

1. `package.json` - `"version": "0.6.3"`
2. `lib/constants.ts` - `export const VERSION = '0.6.3'`

### Version Update Process

1. Determine the correct bump type (major/minor/patch)
2. Manually update both version files:
   - `package.json`
   - `lib/constants.ts`
3. Commit version changes with:

```
chore(release): bump version to X.Y.Z
```

4. Optionally create a git tag:

```bash
git tag -a vX.Y.Z -m "Release version X.Y.Z"
```

### Version Update Examples

```
chore(release): bump version to 0.7.0
chore(release): bump version to 0.6.4
chore(release): bump version to 1.0.0
```

---

# Project-Specific Notes

### Next.js 15+ Patterns

* Use Server Components by default
* Client Components only when needed (`'use client'`)
* Follow App Router structure
* Implement error.tsx and not-found.tsx for route segments

### Content Changes

* Use `content` scope for blog posts and resume data changes
* Ensure MDX frontmatter is properly formatted
* Test content rendering after changes

---

# Common Mistakes to Avoid

* Missing or incorrect scope
* Mixing unrelated changes in one commit
* Incorrect semantic version decision
* Manually editing version files without committing
* Using package prefixes (backend/web/mobile) - not needed for single project
* Vague commit messages without scope
* Forgetting to update both `package.json` and `lib/constants.ts` for version bumps

---

# Updating This Documentation

When modifying `.cursor/commands/commit.md`, use:

```
docs(commands): update commit command documentation
```

or

```
docs: clarify commit message guidelines
```

---

# Windows Environment

Generate git commands and other commands for Windows environment (CMD or PowerShell).

**Important**: Do not use `git status` or `git diff` commands to understand changes. Look at your changes in your chat context. Only commit files you actually modified during the session.

---

# Project-Specific Notes

### Next.js 15+ Patterns

* Use Server Components by default
* Client Components only when needed (`'use client'`)
* Follow App Router structure
* Implement error.tsx and not-found.tsx for route segments
* Use MDX for blog content with proper frontmatter
