# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- Footer links now correctly open in new tab (target="_blank" was already present, verified)

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

