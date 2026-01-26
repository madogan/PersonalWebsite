# Instructions: Code Review & Technical Audit

Act as a Senior Full-Stack Engineer and SRE. We are managing a Next.js 15+ personal website with:
1. **Next.js 15+ (App Router)**: Web application with SEO optimization and internationalization (next-intl)
2. **React 19**: Modern React patterns with Server and Client Components
3. **TypeScript 5.7.3**: Strict type checking and modern TypeScript patterns
4. **MDX Content**: Blog posts and content management with MDX
5. **Tailwind CSS**: Utility-first styling with shadcn/ui components

Review the unpushed code changes for bugs, architectural consistency, and performance.

## Phase 1: The Audit (Current Task)

Analyze the provided changes with these specific filters:

### Architecture & Separation of Concerns

- **Server vs. Client Components**: Ensure proper separation between Server Components (default) and Client Components (`'use client'`). Check that client components are only used when necessary (interactivity, hooks, browser APIs).
- **App Router Structure**: Verify changes follow Next.js 15+ App Router patterns with proper route organization, route groups, and nested layouts.
- **API Routes**: Review API route handlers for proper error handling, validation with Zod, and consistent response patterns.
- **Content Management**: Validate MDX content structure, frontmatter formatting, and content parsing logic.
- **Internationalization**: Ensure all user-facing text uses `next-intl` translations, locale-aware routing, and proper locale handling in components and API routes.

### Code Quality & Conventions

- **Next.js 15+ Patterns**:
  - Server Components by default, Client Components only when needed
  - Static `export const metadata` (NO `generateMetadata`)
  - Params as plain objects (NOT Promise-typed)
  - Proper error.tsx and not-found.tsx for route segments
  - No React.FC (use modern function declarations)
  - Proper Suspense usage (only for legitimate streaming/lazy loading)

- **TypeScript**:
  - Strict type checking compliance
  - Proper prop types and interfaces
  - No `any` type usage
  - Proper generic constraints
  - Type-safe API responses

- **Component Patterns**:
  - Use centralized components from `@/components/ui/` and design system
  - Follow component rules (check existing components before creating new ones)
  - Proper use of shadcn/ui components
  - Consistent styling with Tailwind CSS and CVA variants
  - No manual recreation of existing component patterns

- **Validation & Error Handling**:
  - Zod schemas for all form and API input validation
  - Proper error boundaries (error.tsx files)
  - Centralized logging (NO `console.log` in production)
  - User-friendly Turkish error messages
  - Proper error recovery patterns

- **Internationalization**:
  - All user-facing text uses `useTranslations` hook
  - Locale-aware routing (`/[locale]/...`)
  - Locale-aware date/number formatting
  - Translation keys follow semantic naming
  - Both Turkish (`/tr`) and English (`/en`) locales supported

### SRE & Performance

- **Next.js Performance**:
  - Proper use of `next/image` with sizing and optimization
  - Server-side rendering vs. client-side rendering decisions
  - Bundle size optimization and code splitting with dynamic imports
  - Proper caching strategies (`cache()`, `unstable_cache()`)
  - LCP (Largest Contentful Paint) optimization
  - Hydration issues and proper loading states
  - API route efficiency and response caching

- **Content Performance**:
  - MDX content optimization and parsing efficiency
  - Image optimization in blog posts
  - Proper lazy loading for heavy components
  - Static generation where appropriate

- **Database & Data Fetching**:
  - Efficient data fetching patterns
  - Proper connection pooling
  - N+1 query prevention
  - Appropriate use of server actions vs. API routes

### Security & Best Practices

- **Next.js Security**:
  - No secrets in logs or error messages
  - Proper environment variable handling
  - Input sanitization and validation (Zod)
  - XSS prevention
  - CSRF protection for API routes
  - Proper authentication/authorization patterns

- **Content Security**:
  - MDX content sanitization
  - Safe rendering of user-generated content
  - Proper file upload validation (if applicable)

- **API Security**:
  - Rate limiting on public endpoints
  - Proper authentication middleware
  - Input validation on all endpoints
  - Safe error messages (no sensitive data exposure)

### Content & MDX

- **MDX Content Structure**:
  - Proper frontmatter formatting
  - Valid date formats
  - Required fields present (title, description, date, etc.)
  - Proper slug generation
  - Locale-specific content handling

- **Content Parsing**:
  - Efficient MDX parsing
  - Proper error handling for malformed content
  - Content validation and type safety

### Database & Migrations

- **Database Patterns**:
  - Proper use of direct postgres client
  - Transaction management
  - Proper error handling and rollback
  - Index creation for frequently queried columns
  - Foreign key constraints and relationships

## Phase 2: Output Format

Do NOT provide the final code fixes yet. Instead, provide:

### 1. Found Issues

Categorize issues by severity:

- **Critical**: Security vulnerabilities, data loss risks, breaking changes, authentication/authorization flaws, missing error boundaries
- **Quality**: Code style violations, convention mismatches, missing error handling, improper logging, incorrect Next.js patterns
- **Performance**: Inefficient data fetching, missing image optimization, unnecessary client components, bundle size issues, missing caching

For each issue, specify:
- **File/Component**: Specific file or component affected
- **Issue Description**: Clear explanation of the problem
- **Impact**: What could go wrong or what performance degradation could occur
- **Rule Reference**: Reference to relevant project rules (e.g., `nextjs-rules`, `component-rules`, `error-handling-rules`, `development-rules`)

### 2. Clarification Questions

Ask 3-5 targeted questions to understand:
- Architectural intent or design decisions
- Ambiguous logic found in the changes
- Deployment assumptions (e.g., "I assume the site is deployed on Fly.io")
- Integration patterns between components
- Performance requirements or constraints
- Internationalization requirements for new features

### 3. Assumptions

List any assumptions you are making about:
- Deployment architecture (dev vs. prod environments, Fly.io deployment)
- Content structure and MDX format
- Internationalization setup (locale routing, translation files)
- External API integrations (if any)
- User flows and interactions
- Performance requirements
- Database schema state

## Phase 3: The Fix Plan (Post-Clarification)

After receiving responses to clarification questions, generate a **Fix Plan** with:

### Priority Roadmap

1. **Critical Issues**: Must be fixed before merge
2. **Quality Issues**: Should be fixed for code maintainability
3. **Performance Issues**: Optimize based on impact and effort

### Step-by-Step Instructions

For each fix, provide:
- **Files**: Specific files to change
- **Changes**: Detailed code changes or refactoring steps
- **Testing**: How to verify the fix
- **Commit Message**: Suggested commit message following project conventions (see `commit.md`)

### Pre-Commit Checklist

Before applying fixes, ensure:
- **Code Quality**: Run `pnpm lint:fix`, `pnpm format`, `pnpm type-check`
- **Build**: Run `pnpm build` to verify no build errors
- **Logging**: All logging uses centralized logger (no raw `console.*`)
- **Components**: All new components check existing centralized components first
- **Internationalization**: All user-facing text uses translations
- **Error Handling**: Proper error.tsx files exist for route segments
- **Next.js Patterns**: Follow Next.js 15+ best practices (no `generateMetadata`, proper params typing, etc.)

---

**Please perform the Phase 1 Audit now on the provided code changes.**
