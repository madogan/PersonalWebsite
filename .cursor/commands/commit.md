# Commit Command

Create a semantic commit following THOF's commit rules. This command ensures correct formatting, atomic commits, and scope-aware commit messages.

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
* `components` - UI components (ui, public, admin, shared)
* `lib` - Library utilities (db, auth, services, utils, logging, monitoring)
* `i18n` - Internationalization and translations
* `types` - TypeScript type definitions
* `api` - API routes and endpoints
* `auth` - Authentication and authorization
* `db` - Database schema, migrations, Prisma
* `ui` - UI components and styling
* `config` - Configuration files
* `deps` - Dependency updates
* `ci` - CI/CD configurations
* `docs` - Documentation

**Note**: For simple changes that don't fit a specific scope, you can omit the scope.

Correct examples:

```
feat(api): add refresh token endpoint
fix(ui): resolve dark-mode hover bug
chore(deps): update next-auth to 5.0.0-beta.25
feat(components): add language switcher component
fix(db): resolve migration conflict
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

Use for utilities, services, and library code:

```
feat(lib:auth): implement JWT refresh flow
fix(lib:db): resolve connection pool leak
refactor(lib:services): restructure content service
log(lib:logging): standardize request-id propagation
```

### Internationalization (`i18n`)

Use for translation and locale-related changes:

```
feat(i18n): add English translations for events
fix(i18n): correct Turkish date formatting
refactor(i18n): restructure translation namespaces
```

### Database (`db`)

Use for Prisma schema, migrations, and database-related changes:

```
db(migrations): add index to competitions.created_at
db(schema): add event registration table
fix(db): resolve migration conflict
```

### API Routes (`api`)

Use for API route handlers:

```
feat(api): add competition registration endpoint
fix(api): resolve authentication middleware issue
refactor(api): optimize event list response
```

### Authentication (`auth`)

Use for authentication and authorization:

```
feat(auth): add email verification flow
fix(auth): resolve session expiration bug
refactor(auth): optimize token validation
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
feat(api): add competition registration endpoint
feat(components): add event calendar component
feat(i18n): add English translations for admin panel
feat(app): add competition detail page with live updates
feat(lib:services): implement content caching service
```

### Bug Fixes

```
fix(ui): resolve dark mode hover state
fix(auth): resolve session expiration bug
fix(db): resolve migration conflict on competitions table
fix(api): handle null values in event list response
fix(components): resolve image gallery layout shift
```

### Documentation

```
docs: update deployment guide
docs(api): add authentication endpoint documentation
docs: update README with new environment variables
```

### Refactoring

```
refactor(lib:services): restructure content service
refactor(components): optimize image gallery rendering
refactor(app): restructure admin layout structure
refactor(i18n): consolidate translation namespaces
```

### Database

```
db(migrations): add index to competitions.created_at
db(schema): add event registration table
db(migrations): add foreign key constraint to participants
```

### Chores

```
chore(deps): update next-auth to 5.0.0-beta.25
chore(config): update next.config.ts with new image domains
chore(ci): add GitHub Actions workflow for testing
```

### Logging

```
log(lib:logging): standardize request-id propagation
log(lib:logging): add performance metrics logging
```

---

# Pre-Commit Checklist

1. **Code Quality**

   * Run `pnpm check` (lint + format + type-check)
   * Fix any linting or type errors
   * No raw `console.log`; use centralized logger from `@/lib/logging`

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

THOF maintains version in two places:

1. `package.json` - `"version": "1.8.2"`
2. `src/lib/constants/version.ts` - `export const VERSION = '1.8.19'`

### Version Update Process

1. Determine the correct bump type (major/minor/patch)
2. Manually update both version files:
   - `package.json`
   - `src/lib/constants/version.ts`
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
chore(release): bump version to 1.9.0
chore(release): bump version to 1.8.20
chore(release): bump version to 2.0.0
```

---

# Project-Specific Notes

### Next.js 15+ Patterns

* Use Server Components by default
* Client Components only when needed (`'use client'`)
* Follow App Router structure
* Implement error.tsx and not-found.tsx for route segments

### Database Changes

* Use `db(migrations):` for Prisma migrations
* Use `db(schema):` for schema-only changes
* Always test migrations locally before committing

### Internationalization

* Use `i18n` scope for translation changes
* Update both `src/messages/tr.json` and `src/messages/en.json`
* Test in both locales

### Logging

* Use `log(lib:logging):` for logging system updates
* Never use `console.log` in production code
* Use centralized logger from `@/lib/logging`

---

# Common Mistakes to Avoid

* Missing or incorrect scope
* Mixing unrelated changes in one commit
* Incorrect semantic version decision
* Manually editing version files without committing
* Raw console.log usage (use centralized logger)
* Using package prefixes (backend/web/mobile) - not needed for single project
* Vague commit messages without scope

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
