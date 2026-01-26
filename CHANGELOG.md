# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.0] - 2026-01-26

### Added

- **Source URL Title Fetching**: Automatic fetching and display of actual titles for source URLs in blog posts
  - Replaces generic labels like "YouTube Video" or "YouTube Videosu" with actual video/page titles
  - Supports YouTube videos (all URL formats: youtu.be, youtube.com/watch, youtube.com/embed)
  - Supports regular web pages with title extraction
  - Build-time processing script for batch updating all blog posts
  - Batch processing with rate limiting (5 URLs at a time, 200ms delays)
  - Error resilience - continues processing even if some URLs fail
  - Cache file persistence for resume capability (`cache/source-url-metadata.json`)
  - `--dry-run` flag for safe testing without modifying files
  - `--resume` flag to continue from cached metadata

### Technical

- **New Utilities**:
  - `lib/source-url-metadata.ts`: URL validation, type detection, YouTube normalization, metadata fetching
  - `lib/source-url-processor.ts`: MDX content parsing and source URL replacement
  - `scripts/process-source-urls.ts`: Build-time script for processing all blog posts

- **New NPM Scripts**:
  - `pnpm process-source-urls` - Process all blog posts and update source URLs
  - `pnpm process-source-urls:dry-run` - Test processing without modifying files

- **Features**:
  - YouTube oEmbed API integration with 10-second timeout
  - Web page title scraping with regex (falls back to Open Graph og:title)
  - Redirect handling (up to 3 redirects)
  - In-memory caching for build-time efficiency
  - Generic label detection (case-insensitive)
  - Markdown character escaping for safe title replacement
  - Preserves frontmatter and formatting during content updates

## [0.8.16] - 2026-01-26

### Fixed

- **Blog List Page**: Fixed locale filter dropdown font inconsistency
  - Removed conflicting `font-sans` class from locale filter select element
  - Enhanced global CSS rules to ensure Solitreo font applies to all select and option elements
  - Added specific CSS selectors for all select states (focus, hover, active)
  - Added specific CSS selectors for all option states (checked, hover, focus)
  - Dropdown options ("All Languages", "English", "Turkish") now use Solitreo font consistently
  - Font now matches other page elements (headings, search bar placeholder)

### Technical

- Updated `components/blog/locale-filter.tsx`: Removed `font-sans` class from select element
- Updated `app/globals.css`: Enhanced select and option CSS rules with state-specific selectors
- CSS rules use `!important` flag to override browser default styling
- Font consistency maintained across all dropdown states and interactions

## [0.8.15] - 2026-01-26

### Changed

- **Reverted Handwriting Border Design**: Reverted handwriting border system to clean, professional borders
  - Removed complex CSS mask operations (~400+ lines of handwriting border CSS)
  - Replaced handwriting borders with standard Tailwind border utilities
  - Improved performance by removing complex mask calculations
  - Enhanced maintainability with simpler, standard CSS patterns
  - Better browser compatibility (universal support vs. mask-image requirement)
  - Cleaner, more professional visual appearance

### Technical

- **Removed Handwriting Border CSS System**:
  - Removed CSS custom properties: `--handwriting-border-horizontal`, `--handwriting-border-vertical`, `--handwriting-underline`
  - Removed all handwriting border CSS classes (`.handwriting-border-all`, `.handwriting-border-t/b/l/r/x/y`, `.handwriting-border`, `.handwriting-underline`, etc.)
  - Removed handwriting border pseudo-elements from `.notebook-panel::after`, `.loose-leaf-card::after`, `.pencil-divider::before`
  - Updated `.notebook-panel` to use `border border-notebook-divider`
  - Updated `.loose-leaf-card` to use `border border-notebook-divider`
  - Updated `.pencil-divider` to use `border-t border-notebook-divider`

- **Updated Components** (22+ files):
  - **Layout**: `header.tsx`, `mobile-menu.tsx`, `navigation.tsx`, `footer.tsx`
  - **Blog**: `mdx-components.tsx`, `blog-list-client.tsx`, `back-button.tsx`, `locale-filter.tsx`, `search-bar.tsx`, `tag-filter.tsx`, `tag-list.tsx`
  - **Home**: `personal-hero.tsx`, `certifications-section.tsx`, `latest-blogs-section.tsx`, `featured-posts.tsx`, `bottom-navigation.tsx`
  - **Resume**: `experience-item.tsx`, `skills-grid.tsx`
  - **UI**: `theme-toggle.tsx`, `glassy-button.tsx`
  - All components now use standard Tailwind border classes (`border`, `border-t`, `border-b`, `border-l`, `border-accent`, etc.)
  - Maintained existing hover/active states and accessibility features

### Performance

- Reduced CSS file size by ~400 lines
- Improved rendering performance (no complex mask operations)
- Faster page load (less CSS to parse)
- Better compatibility with Next.js build optimizations

### Browser Compatibility

- Universal browser support (CSS borders supported since CSS 1.0)
- Consistent rendering across all modern browsers
- No fallback handling needed
- Works perfectly in all browsers (including IE11+)

## [0.8.14] - 2026-01-26

### Fixed

- **Handwriting Border Color Inconsistency**: Fixed borders displaying both grey and black colors
  - Removed `background-image` declarations that rendered SVG patterns with hardcoded black strokes
  - Implemented two-layer mask system: gradient masks for border shape + SVG pattern masks for handwriting texture
  - All borders now display consistent grey color controlled by `--notebook-divider` CSS variable
  - Borders respect theme colors: light grey (`#E5E0D6`) in light mode, medium grey (`#6B7280`) in dark mode
  - Handwriting pattern texture preserved while eliminating black color artifacts
  - Fixed duplicate `.notebook-panel::before` definition (code quality improvement)

### Technical

- Updated `app/globals.css` handwriting border implementations:
  - `.notebook-panel::after`: Removed `background-image`, combined gradient + SVG pattern masks
  - `.loose-leaf-card::after`: Removed `background-image`, combined gradient + SVG pattern masks
  - `.handwriting-border::before`: Removed `background-image`, combined gradient + SVG pattern masks
  - `.handwriting-border-all::before/::after`: Removed `background-image`, use `mask-image` only
  - All borders now use `mask-image` with SVG patterns for shape, `background-color` for color
  - Two-layer mask system: gradient masks define border area, SVG patterns add handwriting texture
  - Combined masks using `mask-composite: add` for proper rendering
- Removed duplicate `.notebook-panel::before` definition (paper texture)
- Verified all directional border classes (`.handwriting-border-t/b/l/r/x/y`) already correct
- No component changes required - CSS-only fix

## [0.8.13] - 2026-01-26

### Fixed

- **Blog Links Visibility**: Fixed invisible URL links in blog posts
  - Updated `.handwriting-underline` CSS class to use explicit `accent-cyan` color instead of `currentColor`
  - Added explicit `color` property as fallback to ensure text visibility
  - Links now display correctly in both light and dark modes
  - Handwriting underline effect preserved while ensuring text remains visible
  - Fixes issue where only underline was visible but link text was invisible

### Technical

- Modified `app/globals.css` `.handwriting-underline` class:
  - Changed `background-color: currentColor` to `background-color: rgb(var(--color-accent-cyan))`
  - Added `color: rgb(var(--color-accent-cyan))` as explicit fallback
  - Maintains all existing mask properties for handwriting underline effect
- No component changes required - MDX components already compatible

## [0.8.12] - 2026-01-26

### Added

- **Blog Content**: Added new Turkish blog post "OpenTelemetry ve Grafana Labs: 2026 Vizyonu ve Yeni Teknolojiler"
  - Comprehensive article covering OpenTelemetry's 2026 vision and Grafana Labs' strategic direction
  - Topics include CNCF graduation goals, Declarative Configuration, Prometheus compatibility, AIOps integration, and fleet management
  - Includes three dashboard images: APM dashboard, OpenTelemetry Collector monitoring dashboard, and Linux monitoring dashboard
  - Images stored locally in `public/images/blog/` directory for optimal performance
  - Blog post date: 2026-01-17
  - Tags: OpenTelemetry, Grafana, Observability, DevOps, Monitoring, SRE
  - Locale: Turkish (tr)

### Technical

- Created `content/blog/opentelemetry-ve-grafana-labs-2026-vizyonu-ve-yeni-teknolojiler.mdx` with proper MDX frontmatter
- Added three dashboard images to `public/images/blog/`:
  - `otel-demo-apm-dashboard.png` - APM dashboard for OpenTelemetry Demo
  - `otel-demo-collector-monitoring-dashboard.png` - Collector monitoring dashboard
  - `otel-demo-linux-dashboard.png` - Linux system monitoring dashboard
- Images properly referenced using local paths (`/images/blog/...`) instead of external URLs
- Blog post follows project MDX structure and formatting conventions

## [0.8.11] - 2026-01-26

### Added

- **Handwriting Border System**: Implemented hand-drawn/sketchy border system for organic, notebook-style aesthetic
  - Created SVG patterns for horizontal, vertical, and underline borders with seamless tiling
  - Implemented CSS classes using pseudo-elements to support `border-radius` (unlike `border-image`)
  - Added `.handwriting-border-all` class for all borders
  - Added directional variants: `.handwriting-border-t`, `.handwriting-border-b`, `.handwriting-border-l`, `.handwriting-border-r`, `.handwriting-border-x`, `.handwriting-border-y`
  - Added `.handwriting-underline` class for text decorations
  - Uses CSS `mask-image` for proper color inheritance from CSS variables
  - Follows existing `.paper-texture::before` pattern for consistency
  - Optimized SVG patterns to < 500 bytes each for performance

### Technical

- Added CSS custom properties in `:root` for handwriting border SVG patterns:
  - `--handwriting-border-horizontal`: Hand-drawn wavy line pattern (50px width) for top/bottom borders
  - `--handwriting-border-vertical`: Hand-drawn wavy line pattern (50px height) for left/right borders
  - `--handwriting-underline`: Hand-drawn underline pattern (35px width) for text decorations
- Implemented handwriting border classes in `app/globals.css`:
  - All classes use pseudo-elements (`::before`, `::after`) positioned absolutely
  - Pseudo-elements respect parent `border-radius` automatically
  - Uses `mask-image` with `background-color` for color control
  - Proper z-index stacking: border (0) < texture (0) < content (1)
  - Includes fallback support for older browsers
- Foundation ready for Phase 2: Applying handwriting borders to components (cards, panels, dividers, etc.)

## [0.8.10] - 2026-01-26

### Fixed

- **Blog Detail Page**: Removed outer border from Related Posts section and restored borders on individual post cards
  - Removed `pencil-divider` class from Related Posts section container to eliminate outer border
  - Removed `border-0` class from Related Posts post cards to restore default `loose-leaf-card` borders
  - Related Posts section now has a cleaner appearance without outer border
  - Individual post cards now display with borders as originally intended
  - Preserves all other styling including rounded corners, shadows, hover effects, paper texture, and spacing

### Technical

- Updated `components/blog/related-posts.tsx`: Removed `pencil-divider` from section element and `border-0` from post cards
- Post cards now use default `loose-leaf-card` border behavior (as originally designed)
- Section spacing (`mt-16 pt-12`) preserved
- No changes to global CSS classes - isolated fix to Related Posts component only
- Minimal code change - two class removals for targeted styling adjustments

## [0.8.9] - 2026-01-26

### Changed

- **Documentation**: Updated Next.js 15+ project rules to reflect actual Next.js 15 behavior
  - Updated `nextjs-rules.mdc` to correctly document Promise-typed params for dynamic routes (Next.js 15+ requirement)
  - Updated rules to allow `generateMetadata` for dynamic routes (required for per-route SEO)
  - Clarified distinction between static routes (plain object params) and dynamic routes (Promise-typed params)
  - Updated code review command documentation to reflect correct Next.js 15 patterns
  - All existing code was already compliant with Next.js 15 best practices

### Technical

- Updated `.cursor/rules/nextjs-rules.mdc`: Corrected metadata and params handling documentation
- Updated `.cursor/commands/review-changes.md`: Aligned review criteria with Next.js 15 actual behavior
- No code changes required - existing implementation was already correct
- Rules now accurately reflect Next.js 15.1.0 requirements

## [0.8.8] - 2026-01-26

### Fixed

- **Blog Detail Page**: Removed unwanted border from Related Posts section cards
  - Added `border-0` class to Related Posts cards to override default `loose-leaf-card` border
  - Related Posts cards now display without visible borders while maintaining all other styling
  - All other components using `loose-leaf-card` retain their borders as intended
  - Preserves rounded corners, shadows, hover effects, paper texture, and accessibility features

### Technical

- Updated `components/blog/related-posts.tsx`: Added `border-0` Tailwind utility class to card className
- Border removal uses Tailwind utility override pattern (maintains design system integrity)
- No changes to global CSS classes - isolated fix to Related Posts component only
- All other `loose-leaf-card` instances across the site remain unaffected
- Minimal code change - single class addition for targeted border removal

## [0.8.7] - 2026-01-26

### Fixed

- **Blog Detail Page**: Fixed background color mismatch between blog content area and outer page background
  - Added `bg-background` class to blog content div to ensure unified background color
  - Blog content area now matches outer page background in both light and dark themes
  - Maintains seamless visual appearance across the entire blog detail page
  - Paper texture overlay continues to function correctly above the background

### Technical

- Updated `app/blog/[slug]/page.tsx`: Added `bg-background` class to blog content div className
- Background color uses same CSS variable (`--color-background`) as outer page background
- No visual regressions - typography, spacing, and paper texture effects preserved
- Minimal code change - single class addition for improved visual consistency

## [0.8.6] - 2026-01-26

### Changed

- **Typography**: Replaced Charm font family with Solitreo font family
  - Implemented unified typography using Solitreo-Regular.ttf (400 weight only)
  - All text elements (headings, body, code) now use Solitreo font for consistent typographic identity
  - Updated `app/layout.tsx` to use Solitreo font with `next/font/local`
  - Updated Tailwind configuration to use `--font-solitreo` CSS variable for all font families (sans, serif, mono)
  - Bold text uses synthetic bold (browser-generated) since only Regular weight is available
  - Font file is preloaded for optimal performance
  - License: SIL Open Font License (OFL) - compliant for commercial use

### Technical

- Updated `app/layout.tsx`: Replaced Charm font with Solitreo font using `localFont` from `next/font/local`
- Updated `tailwind.config.ts`: Changed all font families to use `var(--font-solitreo)` with Georgia fallback
- Font configuration uses single `localFont` instance with Regular weight only (400)
- Browser generates synthetic bold for `font-weight: 700` (no separate Bold font file available)
- All existing Tailwind font utilities (`font-sans`, `font-serif`, `font-mono`) now use Solitreo font
- No hardcoded font-family values found in codebase - all components use Tailwind utilities
- TypeScript type checking passed
- No breaking changes - all existing components work with new font configuration

## [0.8.5] - 2026-01-14

### Changed

- **Typography**: Replaced all Google Fonts (Inter, Playfair Display, JetBrains Mono) with local Charm font family
  - Implemented unified typography using Charm-Regular.ttf (400 weight) and Charm-Bold.ttf (700 weight)
  - All text elements (headings, body, code) now use Charm font for consistent typographic identity
  - Updated `app/layout.tsx` to use `next/font/local` with local font files
  - Updated Tailwind configuration to use `--font-charm` CSS variable for all font families (sans, serif, mono)
  - Removed Google Fonts dependencies - no external font requests
  - Font files are preloaded for optimal performance
  - License: SIL Open Font License (OFL) - compliant for commercial use

### Technical

- Updated `app/layout.tsx`: Replaced Google Font imports with `localFont` from `next/font/local`
- Updated `tailwind.config.ts`: Changed all font families to use `var(--font-charm)` with Georgia fallback
- Font configuration uses single `localFont` instance with array of src objects for multiple weights
- Browser automatically selects correct font weight (Regular 400 or Bold 700) based on CSS `font-weight` property
- All existing Tailwind font utilities (`font-sans`, `font-serif`, `font-mono`) now use Charm font
- No hardcoded font-family values found in codebase - all components use Tailwind utilities
- TypeScript type checking passed
- No breaking changes - all existing components work with new font configuration

## [0.8.4] - 2026-01-14

### Changed

- **UI Refinement**: Removed borders from all heading elements (h1-h6) for a cleaner, more minimal appearance
  - Removed `pencil-divider` class and border utilities from ResumeSection h2 headings
  - Removed `pencil-divider` class and border utilities from MDX h2 headings in blog posts
  - Refactored ResumeSection to use `cn()` utility for className composition (project pattern consistency)
  - Removed padding-bottom classes (`pb-3`, `pb-2`) that were only used for border spacing
  - Preserved all typography, spacing, and responsive styling
  - Non-heading elements (dividers, sections, hr) retain `pencil-divider` class for decorative purposes

### Technical

- Updated `components/resume/resume-section.tsx` to remove borders and use `cn()` utility
- Updated `components/blog/mdx-components.tsx` to remove borders from h2 component
- All changes maintain responsive behavior, typography, and theme compatibility
- Code quality checks passed (TypeScript, ESLint, Prettier)

## [0.8.3] - 2026-01-14

### Fixed

- **Persistent Badge Borders**: Added explicit Tailwind utility overrides to completely remove any inherited badge styles from location and date elements
  - Added `bg-transparent border-0 rounded-none p-0 m-0` utilities to all location/date elements in Experience Item component
  - Used `cn()` utility for proper className composition following project patterns
  - Ensures no borders, backgrounds, padding, or margins are applied regardless of CSS specificity or inheritance
  - Verified no conflicting global CSS rules or Tailwind plugin conflicts

### Technical

- Updated `components/resume/experience-item.tsx` with explicit style overrides using Tailwind utilities
- Investigated and verified no global CSS rules, Tailwind typography plugin, or parent component styles causing conflicts
- All changes maintain responsive behavior, text styling, and theme compatibility
- Code quality checks passed (TypeScript, ESLint, Prettier)

## [0.8.2] - 2026-01-14

### Changed

- **UI Refinement**: Removed badge frames from title-related elements across the website for a cleaner, more minimal appearance
  - Removed location and date badge frames from Professional Experience section (mobile and desktop views)
  - Removed summary opening words badge frame from Personal Hero section
  - Preserved all text content, styling, animations, and responsive behavior
  - Maintained text readability and proper spacing without background frames

### Technical

- Updated `components/resume/experience-item.tsx` to remove badge styling from location and date metadata
- Updated `components/home/personal-hero.tsx` to remove badge frame from summary opening words
- All changes maintain responsive behavior and theme compatibility
- Code quality checks passed (TypeScript, ESLint, Prettier)

## [0.8.1] - 2026-01-14

### Added

- TypeScript version of blog date update script (`scripts/update-blog-dates.ts`)
- `update-blog-dates` npm script command for easy blog date management
- TypeScript type definitions for blog post file operations

### Changed

- Converted blog date update script from JavaScript to TypeScript for better type safety
- Added tsx as dev dependency for running TypeScript scripts directly
- Updated all blog post dates to be distributed one per day starting from 2026-01-14 going backwards

### Technical

- Script now uses proper TypeScript types and interfaces
- Improved type safety for file operations and date handling
- Script automatically sorts posts by creation time (newest first) and assigns dates accordingly

## [0.8.0] - 2025-01-27

### Added

- Enhanced notebook aesthetic with improved paper texture (increased opacity, enhanced grain pattern)
- Enhanced notebook binding (increased width to 7px, added gradient and shadow)
- Journal-like elements: enhanced pencil dividers with gradient overlay, page edge shadows
- Typography utility classes: `.text-heading`, `.text-body`, `.text-code` for consistent font usage
- Distinct component styles: refined notebook-panel, loose-leaf-card, and button styles with paper texture overlays

### Changed

- **Design System Refinement**: Replaced gold/brass accent color with grey metallic (#6B7280) for sophisticated look
- **Shadow System**: Removed all accent-colored shadows, using only paper shadows for depth
- **Typography Standardization**: All headings (h1-h6) use serif font (Playfair Display), all body text uses sans-serif (Inter)
- **Padding Standardization**: Standardized section title padding (mb-6), container padding (px-4 sm:px-6 lg:px-8), and card padding (p-6 md:p-8)
- **Component Styles**:
  - Notebook panels: Flat style with paper texture, no rotation
  - Loose-leaf cards: Enhanced with rotation effects (0.5deg default, 1deg on hover) and paper texture
  - Buttons: Added paper texture overlay and enhanced press effects (scale 0.98 hover, 0.96 active)
- **Paper Texture**: Increased opacity (0.03→0.05 for light, 0.02→0.03 for dark) and enhanced grain pattern
- **Notebook Binding**: Updated to match grey metallic accent color, increased width to 7px with gradient and shadow

### Fixed

- Removed all glassmorphism styling remnants (glass-panel, glass-card classes)
- Fixed asymmetric padding in section titles and cards
- Fixed font inconsistency across components
- Fixed linting errors: escaped apostrophes in JSX, added eslint-disable comment for MDX components

### Technical

- Updated 20+ components to use standardized typography and padding
- Enhanced CSS with distinct styles for panels, cards, and buttons
- All components now use consistent notebook aesthetic with paper texture overlays
- Verified no glassmorphism styling remains in codebase

## [0.7.1] - 2025-01-27

### Fixed

- Fixed bullet list text wrapping under dots in blog reading page by changing from `list-inside` to `list-outside`
- Fixed title text alignment: all headings (h1-h4) are now explicitly left-aligned instead of justified
- Improved list indentation: replaced `ml-4` with `pl-6` for proper spacing with `list-outside`
- Added `prose-headings:text-left` to prose container to ensure headings remain left-aligned

### Changed

- Updated `ul` and `ol` MDX components to use `list-outside` for better text wrapping behavior
- All heading components (h1, h2, h3, h4) now explicitly include `text-left` class
- List items maintain proper indentation without text wrapping under bullet points

## [0.7.0] - 2025-01-27

### Added

- Multi-language support for blog posts with Turkish (tr) and English (en) locales
- Language switcher component for bilingual blog posts with visual emphasis for preferred locale
- Locale detection utility using Next.js 15 headers() API to detect user's preferred language from browser
- Post prioritization system that shows user's preferred locale first in blog listings
- Locale filtering dropdown on blog list page with "All Languages", "English", "Turkish" options
- Locale badges (EN/TR) on blog post cards for quick language identification
- Extended BlogPost type with locale, alternateLocale, and alternateSlug fields
- Helper functions: getPostsByLocale() and prioritizePostsByLocale() for locale-based filtering and sorting
- SEO enhancements: hreflang tags in metadata and JSON-LD translations array for bilingual posts
- Locale-aware date formatting (tr-TR for Turkish, en-US for English)
- Localized reading time text ("min read" / "dakika okuma")

### Changed

- Blog post frontmatter now supports locale field (defaults to 'en' for backward compatibility)
- Blog list page prioritizes posts in user's preferred locale
- Related posts prioritize user's preferred locale while maintaining tag-based relevance
- Blog post pages include dynamic HTML lang attribute based on post locale
- Date formatting respects post locale (Turkish vs English formats)
- JSON-LD structured data includes inLanguage property and translations array for bilingual posts

### Technical

- Server-side locale detection using Next.js 15 headers() API
- Smart prioritization algorithm groups bilingual posts and maintains date sorting
- All locale-related functions are async-compatible with Next.js 15 App Router
- Backward compatible: existing posts without locale field default to 'en'

## [0.6.3] - 2025-01-27

### Changed

- Updated ProfileImage component to use PNG format for theme-specific images (profile_light.png and profile_dark.png)
- ProfileImage component now properly switches between dark and light theme images using next-themes hook

## [0.6.2] - 2025-01-27

### Added

- Project version display in footer with small font size (10px)
- Version positioned in center of footer using three-column grid layout
- Version automatically updates from VERSION constant in lib/constants.ts

### Changed

- Footer layout restructured to use grid system (grid-cols-1 md:grid-cols-3) for better alignment
- Version display uses subtle styling (text-[10px] text-foreground/40) for minimal visual impact

## [0.6.1] - 2025-01-27

### Changed

- Hide expiration date display for expired certificates in certifications section
- Expiration date now only shows for non-expired certificates with "Expires: [date]" format

## [0.6.0] - 2025-01-27

### Added

- Certifications section component on home page displaying professional certifications and badges
- Company logo support for certifications (Grafana Labs, DevOps Institute, Riverbed Technology)
- Fixed-size logo containers (64x64px) with Next.js Image optimization for PNG/SVG formats
- Extended certification data structure with issue dates, expiration dates, credential IDs, credential URLs, and skills
- Automatic expiration date detection and visual indication for expired certifications
- Individual credential links for certifications with external URLs

### Changed

- Updated resume.json with 9 certifications from Credly profile
- Extended TypeScript types in lib/resume.ts to support additional certification fields
- Certifications section positioned after blogs section on home page

## [0.5.0] - 2025-01-27

### Added

- Fly.io configuration file (`fly.toml`) for cloud deployment
- `.flyignore` file to optimize deployment uploads and reduce build context
- Comprehensive Fly.io deployment documentation (`docs/fly-deployment.md`)
- HTTP service configuration with health checks for Fly.io
- Auto-scaling configuration (auto-start machines, min machines running)
- Resource limits configuration (512MB memory, 1 shared CPU)

### Changed

- Configured Fly.io deployment with Amsterdam (ams) as primary region
- Set up HTTPS enforcement and health check monitoring for production deployment

## [0.4.0] - 2025-01-27

### Added

- Secure multi-stage Dockerfile optimized for Next.js 15 standalone output
- .dockerignore file to reduce build context size and improve build performance
- Health check API endpoint (`/api/health`) for container orchestration and monitoring
- Docker Compose example configuration file for easy local development and testing
- Non-root user security configuration in Docker image
- Health check configuration with proper intervals and timeouts

### Security

- Docker image runs as non-root user (nextjs:nodejs) for enhanced security
- Alpine Linux base image with security updates applied
- Minimal attack surface with only runtime dependencies in final image
- Proper file ownership and permissions set in Docker container

## [0.3.0] - 2025-01-27

### Removed

- Removed resume page (`/resume` route)
- Removed PDF download button functionality and components
- Removed print resume button component
- Removed resume header component (only used on resume page)
- Removed resume API route (`/api/resume`)
- Removed resume link from navigation menu
- Removed resume link from hero section
- Removed PDF mode CSS styles from globals.css
- Updated metadata to remove resume references

### Changed

- Updated site description to remove resume mention
- Simplified hero section by removing resume CTA button

## [0.2.2] - 2025-01-27

### Fixed

- Updated footer GitHub and LinkedIn links to point to user profiles instead of placeholder URLs
- Footer links now correctly open in new tab (target="\_blank" was already present, verified)

## [0.2.1] - 2025-01-27

### Changed

- Enhanced search bar component with primary color shadow for better visual prominence
- Improved search input contrast with thicker primary-colored border (border-2 border-accent/30)
- Increased placeholder text opacity for better readability
- Enhanced focus state with stronger border and shadow effects
- Changed search icon color to primary accent color with proper z-index and pointer-events handling

### Removed

- Removed tag filter component from blog list page
- Removed posts count display component from blog list page
- Simplified blog list page to focus on search functionality only

## [0.2.0] - 2025-01-27

### Added

- Back button component for blog detail pages
- Conditional PDF button wrapper to hide download button on blog pages

### Changed

- Redesigned share button to match metadata style and positioned next to reading time
- Updated footer copyright text format to "All Rights Reserved © {year}"
- Improved experience section mobile layout: date and location now appear side-by-side with badge styling
- Standardized font sizes across resume sections (summary, experience, core skills) to `text-xs sm:text-sm md:text-base`
- Added text justification for blog content on mobile devices

### Fixed

- Fixed Next.js 15 params Promise requirement - updated blog detail page to await params
- Fixed spacing issues on blog detail pages (buttons overlapping with content)
- Fixed text justification not applying to blog paragraphs on mobile

## [0.1.9] - 2025-01-27

### Added

- Added 6 comprehensive technical blog posts covering AI/ML production systems:
  - Why AI Systems Fail in Production (And Why It's Rarely the Model)
  - Designing Observability for AI/ML Services: Metrics That Actually Matter
  - From PoC to Production: What Breaks When You Ship LLM-Based Systems
  - Azure for AI: An SRE's Guide to Provisioning for High Availability
  - The AWS AI Stack: Moving Beyond Proof-of-Concept to Five-Nines Reliability
  - Observing the Stochastic: Tuning the LGTM Stack for AI Infrastructure
- All blog posts formatted with proper MDX frontmatter, tags, and markdown structure

## [0.1.8] - 2025-01-27

### Fixed

- Fixed home page summary text to display complete summary instead of truncated first sentence
- Summary text now properly displays all content from resume data

### Changed

- Split summary text into two paragraphs for improved readability
- Added text justification to both summary paragraphs for cleaner appearance

## [0.1.7] - 2025-01-27

### Added

- Glassmorphism container for profile image with rounded-2xl border radius matching menu styling
- Top spacing in profile image container to position image at bottom

### Changed

- Updated profile image container to use square glassmorphism frame instead of circular
- Changed contact icon containers (location, LinkedIn, GitHub) from circular to square with rounded-2xl corners
- Increased glassmorphism contrast for better visibility (light theme: bg 0.15→0.75, dark theme: bg 0.3→0.5)
- Icon containers now use explicit square dimensions (h-8 w-8 md:h-9 md:w-9) matching toggle switch pattern

### Fixed

- Profile image now properly aligned to bottom of glass container with spacing on top
- Icon containers now display as squares with rounded corners instead of circles

## [0.1.6] - 2025-01-27

### Added

- Theme-specific profile images support (profile_light.jpg and profile_dark.jpg)
- ProfileImage component with automatic theme-based image switching
- Smooth transitions when switching between theme-specific profile images

### Changed

- Updated color scheme from green to true turquoise tones (#008080, #20B2AA, #40E0D0)
- Improved bottom navigation: removed empty spacing on right side (desktop view)
- Enhanced profile image component to use theme-aware image selection

### Fixed

- Fixed hardcoded green color in status badge component (now uses accent color)
- Fixed color scheme not applying correctly (updated CSS variables to true turquoise)

## [0.1.5] - 2025-01-27

### Removed

- Removed links section component from home page
- Removed links menu item from bottom navigation

## [0.1.4] - 2025-01-27

### Added

- Menu item labels in bottom navigation for desktop view
- Dynamic active indicator positioning for accurate centering

### Changed

- Enhanced bottom navigation: icon-only on mobile, labels on desktop
- Improved active indicator centering using dynamic position calculation
- Fixed favicon conflict by removing public/favicon.ico (Next.js 15 uses app/favicon.ico)
- Fixed favicon ICO format to use proper RGBA encoding

### Fixed

- Fixed TypeScript error in links-section component (null href type narrowing)
- Fixed favicon.ico format error (PNG not in RGBA format)
- Fixed conflicting public file and page file for favicon.ico path

## [0.1.3] - 2025-01-27

### Added

- Profile photo in hero section with circular design and dramatic lighting effects
- Responsive profile photo display (visible on mobile and desktop)
- Profile photo as favicon.ico with automatic generation
- Favicon generation script (`npm run generate-favicon`)
- Multiple favicon formats (ICO, PNG) for better browser compatibility
- Menu item labels in bottom navigation for desktop view
- Dynamic active indicator positioning for accurate centering

### Changed

- Enhanced hero section with larger, more prominent profile photo
- Improved profile photo styling with glassmorphism effects and accent borders
- Updated favicon generation to use secure implementation
- Enhanced bottom navigation: icon-only on mobile, labels on desktop
- Improved active indicator centering using dynamic position calculation
- Fixed favicon conflict by removing public/favicon.ico (Next.js 15 uses app/favicon.ico)
- Fixed favicon ICO format to use proper RGBA encoding

### Fixed

- Fixed TypeScript error in links-section component (null href type narrowing)
- Fixed favicon.ico format error (PNG not in RGBA format)
- Fixed conflicting public file and page file for favicon.ico path

### Security

- Fixed 10 npm package vulnerabilities (3 moderate, 2 high, 5 critical)
- Updated to-ico package to secure version 1.0.1
- Improved favicon generation script security

## [0.1.2] - 2025-01-27

### Added

- Blog pagination component with glassmorphism design
- Configurable posts per page (default: 9 posts)
- Page count indicator in blog list results
- Smooth scroll to top when changing pages
- Pagination integration with search and tag filtering

## [0.1.1] - 2025-01-27

### Changed

- Improved resume page layout: moved print resume button next to GitHub button with matching style
- Fixed alignment issues on resume page contact section - all links now display on the same line
- Removed "Open to work" status indicator from resume page header

### Removed

- Removed all Twitter-related content and links from the website (footer, metadata, constants)

## [0.1.0] - Initial Release

### Added

- Next.js 15 project setup with TypeScript
- Tailwind CSS configuration with custom theme
- Theme system with dark/light mode support
- Blog system with MDX support
- Resume page with printable styles
- Responsive navigation and layout components
- SEO optimization with Open Graph and structured data
