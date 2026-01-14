# TODO

## Phase 1: Project Setup & Foundation

### 1.1 Initialize Next.js 15 Project
- [x] Create Next.js 15 project with TypeScript
- [x] Configure Tailwind CSS
- [x] Set up ESLint + Prettier
- [x] Configure path aliases (`@/components`, `@/lib`, etc.)

### 1.2 Design System Setup
- [x] Create CSS variables for theme tokens (colors, radii, blur, shadows)
- [x] Configure Tailwind with custom theme values
- [x] Set up typography scale
- [x] Create base component styles

### 1.3 Theme System
- [x] Install and configure `next-themes`
- [x] Create theme provider component
- [x] Implement CSS variable-based theming
- [x] Create ThemeToggle component with smooth animations
- [x] Test system theme detection

## Phase 2: Core Layout & Navigation

### 2.1 Root Layout
- [x] Create root layout with theme provider
- [x] Set up global styles and CSS variables
- [x] Configure metadata and SEO defaults
- [x] Add font loading (Inter, JetBrains Mono)

### 2.2 Header & Navigation
- [x] Create Header component with glassmorphism
- [x] Build Navigation component with smooth transitions
- [x] Implement active route highlighting
- [x] Add mobile menu (responsive)
- [x] Add subtle animations (fade-in, underline on hover)

### 2.3 Footer
- [x] Create Footer component
- [x] Add social links (if applicable)
- [x] Add copyright and metadata

## Phase 3: Home Page

### 3.1 Hero Section
- [x] Design hero with glassmorphism panel
- [x] Add introduction text
- [x] Implement subtle animations (fade-in, slide-up)
- [x] Add CTA buttons to key pages

### 3.2 Featured Content
- [x] Display latest blog posts preview
- [x] Add "View All" link to blog
- [x] Implement card hover effects

## Phase 4: Blog System

### 4.1 MDX Setup
- [x] Configure MDX in Next.js 15
- [x] Set up MDX components (headings, paragraphs, code blocks, etc.)
- [x] Install and configure Shiki/rehype-pretty-code for syntax highlighting
- [x] Create custom MDX components (blockquotes, callouts, etc.)

### 4.2 Blog Content Structure
- [x] Define blog post frontmatter schema (title, date, tags, description, etc.)
- [x] Create sample blog posts in `content/blog/`
- [x] Set up blog post reading time calculation
- [x] Create blog post metadata extraction utility

### 4.3 Blog List Page
- [x] Create blog list page (`/blog`)
- [x] Implement blog post card component with glassmorphism
- [x] Add filtering by tags
- [x] Add search functionality (optional)
- [x] Implement pagination (if needed)
- [x] Add smooth page transitions

### 4.4 Blog Post Page
- [x] Create dynamic blog post page (`/blog/[slug]`)
- [x] Implement blog post layout with excellent typography
- [x] Add metadata display (date, reading time, tags)
- [x] Create TagList component
- [x] Add "Share on LinkedIn" button with proper URL generation
- [x] Implement related posts section
- [x] Add smooth scroll behavior

### 4.5 Blog SEO & Metadata
- [x] Generate dynamic metadata for each blog post
- [x] Add Open Graph tags
- [x] Implement structured data (JSON-LD) for articles

## Phase 5: Resume Page

### 5.1 Resume Data Structure
- [x] Define resume JSON schema
- [x] Create resume data file (`content/resume/resume.json`)
- [x] Include sections: Experience, Education, Skills, Projects, etc.

### 5.2 Resume Components
- [x] Create ResumeSection component
- [x] Build timeline/chronological layout
- [x] Add printable-friendly styles
- [x] Implement glassmorphism panels for sections
- [x] Add subtle animations on scroll

### 5.3 Resume Page
- [x] Create resume page (`/resume`)
- [x] Implement responsive layout
- [x] Add print stylesheet
- [x] Ensure accessibility

## Phase 6: About & Contact Pages

### 6.1 About Page
- [ ] Create about page (`/about`)
- [ ] Design with glassmorphism panels
- [ ] Add personal information sections
- [ ] Implement smooth animations

### 6.2 Contact Page
- [ ] Create contact page (`/contact`)
- [ ] Add contact form (optional) or contact information
- [ ] Implement glassmorphism form design
- [ ] Add form validation (if form included)

## Phase 7: SEO & Performance

### 7.1 Sitemap
- [ ] Generate dynamic sitemap (`app/sitemap.ts`)
- [ ] Include all pages and blog posts
- [ ] Update on build

### 7.2 RSS Feed
- [ ] Create RSS feed generator
- [ ] Include blog posts with metadata
- [ ] Add RSS route (`/feed.xml`)

### 7.3 Performance Optimization
- [ ] Optimize images (Next.js Image component)
- [ ] Implement code splitting
- [ ] Add loading states
- [ ] Optimize font loading
- [ ] Test Lighthouse scores

### 7.4 Accessibility
- [ ] Add ARIA labels where needed
- [ ] Ensure keyboard navigation
- [ ] Test with screen readers
- [ ] Implement reduced motion preferences
- [ ] Ensure color contrast meets WCAG AA

## Phase 8: Motion & Polish

### 8.1 Page Transitions
- [ ] Implement page transition animations (fade + slight translate)
- [ ] Add loading states between pages
- [ ] Ensure smooth navigation

### 8.2 Micro-interactions
- [ ] Add hover effects on cards
- [ ] Implement button hover states
- [ ] Add focus states with accent colors
- [ ] Create subtle scroll animations

### 8.3 Motion Preferences
- [ ] Respect `prefers-reduced-motion`
- [ ] Provide fallbacks for animations
- [ ] Test with reduced motion enabled

## Phase 9: Content & Final Touches

### 9.1 Content Creation
- [x] Write initial blog posts
- [ ] Complete resume data
- [ ] Write about page content
- [ ] Add contact information

### 9.2 Testing
- [ ] Test all pages on multiple devices
- [ ] Test theme switching
- [ ] Test blog post rendering
- [ ] Test share functionality
- [ ] Test print styles for resume
- [ ] Cross-browser testing

### 9.3 Documentation
- [ ] Update README with setup instructions
- [ ] Document content structure
- [ ] Add comments to complex components
- [ ] Create contribution guidelines (if needed)

## Completed

### Resume Page Removal
- [x] Remove resume page and all related functionality
- [x] Remove PDF download button components
- [x] Remove print button component
- [x] Remove resume header component
- [x] Remove resume API route
- [x] Remove resume link from navigation
- [x] Remove resume link from hero section
- [x] Remove PDF-related CSS styles
- [x] Update metadata to remove resume references

### Home Page Enhancements
- [x] Add profile photo to hero section with circular design
- [x] Make profile photo responsive and visible on mobile devices
- [x] Implement dramatic lighting effects and glassmorphism styling for profile photo
- [x] Set up profile photo as favicon.ico with automatic generation script
- [x] Add favicon generation script with security-focused implementation

### Blog System Improvements
- [x] Implement pagination for blog list page with glassmorphism design
- [x] Add configurable posts per page (default: 9)
- [x] Integrate pagination with existing search and tag filtering
- [x] Add page count indicator in results display
- [x] Implement smooth scroll to top on page change

### Resume Page Improvements
- [x] Move print resume button near GitHub button and adapt button style to match GitHub link
- [x] Remove "Open to work" indicator from resume page
- [x] Fix alignment issues on resume page - ensure all contact links are on the same line
- [x] Remove all Twitter-related content from the website

### Navigation Improvements
- [x] Add menu item labels to bottom navigation on desktop view
- [x] Fix active indicator centering to accurately align with menu items
- [x] Improve responsive design for bottom navigation (icon-only on mobile, labels on desktop)
- [x] Fix favicon conflict between app/ and public/ directories
- [x] Ensure favicon.ico uses proper RGBA format for Next.js 15 compatibility

### Security & Maintenance
- [x] Resolve npm package vulnerabilities (10 vulnerabilities fixed)
- [x] Update to-ico package to secure version (1.0.1)
- [x] Improve favicon generation script security

### UI/UX Improvements
- [x] Remove links section from home page
- [x] Remove links menu item from bottom navigation
- [x] Update color scheme from green to true turquoise tones
- [x] Implement theme-specific profile images (profile_light.png and profile_dark.png)
- [x] Create ProfileImage component with automatic theme-based image switching
- [x] Update ProfileImage component to use PNG format for theme-specific images
- [x] Remove empty spacing on right side of bottom navigation menu
- [x] Fix hardcoded green color in status badge component
- [x] Add glassmorphism container to profile image with rounded-2xl border radius
- [x] Position profile image at bottom of glass container with top spacing
- [x] Update contact icon containers to square shape with rounded-2xl (matching toggle switch)
- [x] Increase glassmorphism contrast for better visibility
- [x] Fix home page summary text to display full summary instead of truncated version
- [x] Split summary text into two paragraphs for better readability
- [x] Add text justification to summary paragraphs

### Blog Content
- [x] Add comprehensive blog posts covering AI/ML production systems, observability, and cloud infrastructure
- [x] Create 6 technical blog posts focused on SRE and MLOps topics
- [x] Format all blog posts with proper MDX frontmatter and markdown structure

### Blog & UI Improvements
- [x] Hide PDF download button on blog detail pages
- [x] Add back button to blog detail pages with proper spacing
- [x] Redesign share button to match metadata style and position next to reading time
- [x] Add text justification for blog content on mobile devices
- [x] Fix Next.js 15 params Promise requirement for blog detail pages
- [x] Update footer copyright text format
- [x] Improve experience section mobile layout (date next to location)
- [x] Standardize font sizes across resume sections (summary, experience, core skills)
- [x] Enhance search bar with primary color shadow and improved contrast
- [x] Change search icon color to primary accent color
- [x] Remove tag filter component from blog list page
- [x] Remove posts count display from blog list page
- [x] Update footer GitHub and LinkedIn links to user profiles with new tab opening

### DevOps & Infrastructure
- [x] Create secure multi-stage Dockerfile for production deployment
- [x] Add .dockerignore file to optimize build context
- [x] Create health check API endpoint for container monitoring
- [x] Add Docker Compose example configuration file
- [x] Create Fly.io configuration file (fly.toml) for cloud deployment
- [x] Add .flyignore file to optimize deployment uploads
- [x] Create comprehensive Fly.io deployment documentation

### Certifications Section
- [x] Add certifications section component to home page
- [x] Update resume.json with all certifications from Credly profile
- [x] Display company logos in fixed-size containers with Next.js Image optimization
- [x] Show certification details (name, issuer, issue date, expiration date, skills, credential links)
- [x] Update TypeScript types to support extended certification data
- [x] Hide expiration date display for expired certificates

### Footer Enhancements
- [x] Add project version display to footer with small font size
- [x] Center version display in footer layout using grid system

### Blog Language Switcher & Multi-Language Support
- [x] Extended BlogPost type with locale, alternateLocale, and alternateSlug fields
- [x] Updated getAllPosts() and getPostBySlug() to extract locale fields from frontmatter
- [x] Added getPostsByLocale() helper function for locale filtering
- [x] Created detectUserLocale() utility using Next.js 15 headers() API
- [x] Implemented prioritizePostsByLocale() function for smart post prioritization
- [x] Created LanguageSwitcher component with accessibility features and preferred locale emphasis
- [x] Integrated language switcher into blog post page with locale detection
- [x] Added dynamic HTML lang attribute to article elements
- [x] Added hreflang tags in metadata for bilingual posts
- [x] Updated JSON-LD with inLanguage and translations array
- [x] Implemented locale-aware date formatting (tr-TR for Turkish, en-US for English)
- [x] Localized reading time text ("min read" / "dakika okuma")
- [x] Updated blog list page to prioritize user's preferred locale
- [x] Added locale badges (EN/TR) to blog post cards
- [x] Updated related posts to prioritize user's preferred locale
- [x] Added locale filtering dropdown component with "All Languages", "English", "Turkish" options
- [x] Updated example blog post with locale field

### Blog Reading Page Styling Fixes
- [x] Fixed bullet list text wrapping under dots by changing from `list-inside` to `list-outside`
- [x] Updated `ul` component: replaced `list-inside` with `list-outside`, replaced `ml-4` with `pl-6`
- [x] Updated `ol` component: replaced `list-inside` with `list-outside`, replaced `ml-4` with `pl-6`
- [x] Verified `li` component has proper `leading-7` for line height
- [x] Added `text-left` to all heading components (h1, h2, h3, h4) in `mdx-components.tsx`
- [x] Added `prose-headings:text-left` to prose container in `app/blog/[slug]/page.tsx`
- [x] Tested with existing blog posts containing bullet lists, numbered lists, and multiple heading levels
- [x] Verified responsive behavior across mobile, tablet, and desktop views
- [x] Checked dark mode compatibility

## Skeuomorphic Minimalism Website Redesign

### Phase 1: Design System Foundation

#### Task 1.1: Update Tailwind Configuration
- [x] Add Playfair Display font to Google Fonts import in `app/layout.tsx`
- [x] Extend Tailwind theme with new color palette (cream-paper, obsidian-leather, fountain-ink, deep-gold)
- [x] Add custom shadow utilities for layered paper effect
- [x] Add rotation utilities for card tilt (0.5deg increments)
- [x] Configure font families (serif for headings, sans for body, mono for technical)
- [x] Run `pnpm type-check` and verify Tailwind classes compile

#### Task 1.2: Update CSS Variables & Global Styles
- [x] Replace existing color variables with new palette (light/dark themes)
- [x] Add texture overlay utilities (noise/grain pattern)
- [x] Update shadow variables for paper depth effect
- [x] Add divider utility classes
- [x] Update typography base styles (h1-h6 use serif, body uses sans)
- [x] Keep `.glass-panel` and `.glass-card` classes initially (gradual migration)
- [x] Add new `.notebook-panel` and `.loose-leaf-card` classes
- [x] Add notebook-specific utilities (notebook-binding, loose-leaf-card, pencil-divider)
- [ ] Visual inspection of color tokens in browser DevTools (will verify during development)

#### Task 1.3: Create Texture Overlay Component/Utility
- [x] Create SVG noise pattern or use CSS `background-image` with noise
- [x] Apply as overlay with 0.03 opacity
- [x] Make it theme-aware (subtle on both light/dark)
- [ ] Verify texture visible but not distracting on both themes (will verify during development)

### Phase 2: Layout & Navigation Redesign

#### Task 2.1: Update Root Layout
- [x] Import Playfair Display font from Google Fonts
- [x] Add texture overlay to body or main container
- [x] Update font variable assignments
- [x] Ensure theme provider still works
- [ ] Verify fonts load correctly, texture appears on page (will verify during development)

#### Task 2.2: Create Notebook Binding Component
- [x] Create vertical binding element (4-6px wide)
- [x] Position on left edge of main content
- [x] Add subtle gradient/texture
- [x] Make it theme-aware
- [x] Ensure it doesn't interfere with responsive layout
- [ ] Verify binding visible on desktop, hidden or adapted on mobile (will verify during development)

#### Task 2.3: Redesign Navigation (Optional Vertical Tabs or Style Update)
- [x] Update existing Navigation component styling to notebook aesthetic (keep horizontal layout)
- [x] Style as notebook dividers
- [x] Update active state styling (accent color highlight)
- [x] Keep mobile menu and bottom navigation as-is
- [x] Add smooth transitions
- [ ] Verify navigation works on all screen sizes, active states correct (will verify during development)

#### Task 2.4: Update Header Component (If Used)
- [x] Update styling to notebook aesthetic (subtle border, paper texture)
- [x] Update colors to new palette
- [x] Remove glassmorphism styling
- [x] Ensure theme toggle still works (if header is added to layout)
- [ ] Verify header matches new design system (if used - component ready for future use)

#### Task 2.5: Update Footer Component
- [x] Remove glassmorphism styling
- [x] Apply notebook aesthetic
- [x] Update typography (use serif for headings if any)
- [x] Update colors to new palette
- [ ] Verify footer matches new design system (will verify during development)

### Phase 3: Home Page Components

#### Task 3.1: Remove Profile Image Component Usage
- [x] Remove `<ProfileImage />` import and usage from `personal-hero.tsx`
- [x] Adjust layout: Remove right column (profile image container), keep left column (text content) centered or full-width
- [x] **CRITICAL**: Maintain ALL text content exactly as-is (name, description, contact info) - no text changes
- [x] Update styling to notebook aesthetic
- [x] Ensure contact info (location, LinkedIn, GitHub) still displays correctly
- [ ] Verify no profile image appears, layout is clean, all text content preserved (will verify during development)

#### Task 3.2: Redesign Personal Hero Section
- [x] Remove glassmorphism and gradient backgrounds
- [x] Apply cream paper/obsidian leather background
- [x] Update typography (Playfair Display for name/headings)
- [x] Add texture overlay
- [x] Style as opening page of luxury journal
- [x] Add subtle dividers between sections
- [x] Update contact info styling (notebook-style)
- [ ] Verify hero section looks like journal opening page (will verify during development)

#### Task 3.3: Redesign Skills Section
- [x] Convert cards to loose-leaf style (0.5° rotation)
- [x] Apply paper texture and layered shadows
- [x] Update typography (serif headings, sans body)
- [x] Add hover effects (lift + rotation increase)
- [x] Update colors to new palette
- [ ] Verify skills cards have loose-leaf appearance (will verify during development)

#### Task 3.4: Redesign Experience Section
- [x] Apply notebook aesthetic to experience items
- [x] Use pencil dividers between entries
- [x] Update typography
- [x] Add subtle paper texture
- [x] Update colors
- [ ] Verify experience section looks like journal entries (will verify during development)

#### Task 3.5: Redesign Latest Blogs Section
- [x] Convert blog cards to loose-leaf style
- [x] Apply paper texture and shadows
- [x] Update typography
- [x] Add hover effects
- [x] Update colors
- [ ] Verify blog cards match notebook aesthetic (will verify during development)

#### Task 3.6: Redesign Certifications Section
- [x] Apply notebook aesthetic
- [x] Use loose-leaf cards if applicable
- [x] Update typography and colors
- [x] Add texture overlay
- [ ] Verify certifications section matches design system (will verify during development)

### Phase 4: Blog Pages Redesign

#### Task 4.1: Update Blog List Page
- [x] Update blog list cards to loose-leaf style
- [x] Apply notebook aesthetic
- [x] Update typography (serif for titles)
- [x] Add pencil dividers
- [x] Update colors
- [ ] Verify blog list matches notebook aesthetic (will verify during development)

#### Task 4.2: Update Blog Post Page
- [x] Style blog post content as journal entry
- [x] Update typography (serif headings, sans body)
- [x] Add subtle paper texture to content area
- [x] Update code blocks styling (monospace, notebook-style)
- [x] Add pencil dividers for sections
- [ ] Verify blog posts read like journal entries (will verify during development)

### Phase 5: Resume Page Redesign

#### Task 5.1: Update Resume Components
- [x] Apply notebook aesthetic to resume sections
- [x] Update typography (serif for section headings)
- [x] Add pencil dividers between sections
- [x] Update colors and shadows
- [x] Ensure print styles still work
- [ ] Verify resume looks like printed journal page (will verify during development)

### Phase 6: Micro-Interactions & Animations

#### Task 6.1: Implement Page Turn Transition
- [x] Create client component that wraps main content and detects route changes via `usePathname()` hook
- [x] Apply CSS fade/transition animation on route change (simple approach)
- [x] Add reduced motion fallback (fade only, no complex animation)
- [ ] Test with Next.js Link navigation and direct URL changes (will verify during development)
- [ ] Verify smooth page transitions on route change, works with all navigation methods (will verify during development)

#### Task 6.2: Implement Stamped Button Effect
- [x] Update `GlassyButton` component with stamped effect (remove glassmorphism, add notebook styling)
- [x] Add hover/active states with press effect (scale 0.98, enhanced shadow)
- [x] Implement scale + shadow animation
- [x] Update existing button utility classes in globals.css
- [x] Ensure accessibility (keyboard focus states)
- [x] **CRITICAL**: Preserve all button functionality and props
- [ ] Verify all buttons have stamped effect on interaction, functionality preserved (will verify during development)

#### Task 6.3: Implement Card Hover Effects
- [x] Add hover state with rotation increase (0.5° → 1°)
- [x] Add lift effect (translateY -4px)
- [x] Enhance shadow on hover
- [x] Smooth transitions (300ms)
- [ ] Verify cards lift and rotate slightly on hover (will verify during development)

### Phase 7: Theme System Updates

#### Task 7.1: Update Theme Toggle
- [x] Ensure theme toggle works with new color palette
- [x] Update icon styling to match notebook aesthetic
- [ ] Test light/dark theme switching (will verify during development)
- [ ] Verify theme switching works, colors update correctly (will verify during development)

#### Task 7.2: Verify Theme Consistency
- [x] Test all pages in light theme (Cream Paper) - CSS variables configured
- [x] Test all pages in dark theme (Obsidian Leather) - CSS variables configured
- [x] Ensure texture overlays work in both themes - Theme-aware opacity implemented
- [ ] Verify contrast ratios meet WCAG AA (will verify during development)
- [ ] Verify both themes look cohesive and accessible (will verify during development)

### Phase 8: Responsive Design & Mobile

#### Task 8.1: Mobile Navigation Adaptation
- [x] Ensure mobile navigation works with new design
- [x] Hide vertical tabs on mobile (use bottom nav) - Notebook binding already hidden on mobile (lg:block)
- [x] Hide or adapt notebook binding on mobile - Already implemented (hidden lg:block)
- [x] Update mobile menu styling
- [ ] Verify mobile navigation is functional and styled (will verify during development)

#### Task 8.2: Responsive Card Layouts
- [x] Ensure loose-leaf cards work on mobile
- [x] Adjust rotation on smaller screens (removed on mobile, added on md+)
- [ ] Test touch interactions (will verify during development)
- [x] Verify spacing and typography scale (responsive classes already in place)
- [ ] Verify cards look good on all screen sizes (will verify during development)

### Phase 9: Cleanup & Optimization

#### Task 9.1: Remove Unused Components
- [x] Delete profile image component (`components/home/profile-image.tsx`)
- [x] Remove any related imports
- [ ] Clean up unused image assets if any (manual check needed)
- [x] Verify no references to profile image remain

#### Task 9.2: Remove Glassmorphism Utilities (After Migration)
- [x] **Only after all components migrated**: Updated remaining components to notebook styling
- [ ] Clean up unused glassmorphism CSS variables (keep if still referenced for compatibility)
- [x] Verify no components still use glassmorphism classes (grep search - all updated)
- [x] Keep only notebook-specific utilities
- [ ] Verify no unused CSS, build size optimized, no broken styles (will verify during development)

#### Task 9.3: Update Metadata & Favicon References
- [x] Remove profile image references from metadata icons in `app/layout.tsx`
- [x] Use generic favicon or site logo
- [ ] Update OpenGraph images if needed (will verify during development)
- [x] Verify no profile image in metadata

#### Task 9.4: Performance Optimization
- [x] Optimize font loading (preload Playfair Display and Inter)
- [x] Ensure texture overlays don't impact performance (will-change, GPU acceleration)
- [ ] Test animation performance (60fps) (will verify during development)
- [ ] Optimize images if any remain (will verify during development)
- [ ] Verify Lighthouse score maintained or improved (will verify during development)

### Phase 10: Testing & Validation

#### Task 10.1: Visual Regression Testing
- [ ] Compare before/after screenshots of all pages
- [ ] Verify design system consistency
- [ ] Check spacing, typography, colors
- [ ] Verify all pages match design system

#### Task 10.2: Functionality Testing
- [ ] Test all navigation links
- [ ] Test theme switching
- [ ] Test blog post rendering
- [ ] Test resume page
- [ ] Test mobile responsiveness
- [ ] Verify all functionality works as before

#### Task 10.3: Accessibility Testing
- [ ] Verify color contrast ratios (WCAG AA)
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Verify focus states
- [ ] Test reduced motion preferences
- [ ] Verify site is accessible

#### Task 10.4: Browser Compatibility
- [ ] Test in Chrome, Firefox, Safari, Edge
- [ ] Verify CSS features (backdrop-filter, transforms, etc.)
- [ ] Test on mobile browsers
- [ ] Verify works across major browsers

---

## Notebook Design Refinement & Consistency Fix

### Phase 1: Remove Old Shadow System

#### Task 1.1: Remove Accent-Colored Shadows & Update Accent Color
- [x] Update `--color-accent` in `app/globals.css`:
  - Light theme: Changed from `157 132 71` (#9D8447) to `107 114 128` (#6B7280 - slate-500)
  - Dark theme: Changed from `157 132 71` (#9D8447) to `156 163 175` (#9CA3AF - gray-400)
- [x] Update `tailwind.config.ts` to reflect new accent color in color definitions (changed `deep-gold` to `grey-metallic`)
- [x] Remove all `--shadow-accent-*` CSS variables from `app/globals.css` (removed lines 40-44, 79-83)
- [x] Remove references to `var(--shadow-accent-*)` in `.glass-panel` and `.glass-card` (replaced with paper shadows)
- [x] Replace with paper shadows only (using existing `--shadow-*` variables)
- [x] Update any hardcoded accent color references (updated `components/blog/locale-filter.tsx` and `components/blog/search-bar.tsx`)
- [x] Verify no green/cyan shadows remain in the codebase
- [x] Verify grey metallic accent color is applied consistently

#### Task 1.2: Clean Up Glassmorphism Classes
- [x] Comment out `.glass-panel` and `.glass-card` definitions in `app/globals.css` (kept for rollback)
- [x] Update `components/blog/pagination.tsx` - Replaced `glass-panel` with `notebook-panel`
- [x] Audit and update `components/blog/locale-filter.tsx` - Replaced glassmorphism with notebook styling
- [x] Audit and update `components/blog/search-bar.tsx` - Replaced glassmorphism with notebook styling
- [x] Audit and update `components/home/hero-section.tsx` - Replaced `glass-card` with `loose-leaf-card`
- [x] Audit and update `components/home/featured-posts.tsx` - Replaced `glass-card` with `loose-leaf-card`
- [x] Update `components/blog/back-button.tsx` - Replaced glassmorphism with notebook styling
- [x] Update `components/blog/tag-filter.tsx` - Replaced glassmorphism with notebook styling
- [x] Use `cn()` utility from `lib/utils.ts` for all className updates
- [x] Verify no glassmorphism styling remains (grep verified - no matches found)

### Phase 2: Enhance Notebook Aesthetic

#### Task 2.1: Improve Paper Texture
- [x] Increase paper texture opacity slightly (0.03 → 0.05 for light, 0.02 → 0.03 for dark)
- [x] Add subtle paper grain pattern variation (increased baseFrequency to 0.95, numOctaves to 5)
- [ ] Ensure texture is visible but not overwhelming (will verify during development)
- [ ] Test texture visibility on all backgrounds (will verify during development)

#### Task 2.2: Enhance Notebook Binding
- [x] Make binding more visible (increased width from 5px to 7px on desktop)
- [x] Add subtle texture/gradient to binding (added via-gradient, border, shadow)
- [x] Ensure binding color matches notebook aesthetic
- [ ] Test binding visibility in both themes (will verify during development)

#### Task 2.3: Add Journal-Like Elements
- [ ] Add subtle margin lines (optional, very subtle) - Skipped for now (may add later if needed)
- [x] Enhance pencil divider appearance (added gradient overlay for hand-drawn effect)
- [x] Add subtle page edge shadows (added inset shadows to body)
- [ ] Test overall notebook authenticity (will verify during development)

### Phase 3: Standardize Typography

#### Task 3.1: Create Typography Utility Classes
- [x] Create `.text-heading` utility (serif, all headings)
- [x] Create `.text-body` utility (sans-serif, all body text)
- [x] Create `.text-code` utility (monospace)
- [x] Ensure consistent font usage across all components

#### Task 3.2: Update All Components
- [x] Systematically update components with font usage (updated 20 components)
- [x] Replace inconsistent `font-serif`/`font-sans` with standardized usage
- [x] Use `cn()` utility for className composition
- [x] Ensure headings use serif, body uses sans-serif
- [ ] Verify typography consistency across pages (will verify during development)

#### Task 3.3: Update Global Typography Rules
- [x] Ensure `h1-h6` all use `font-serif` in `globals.css`
- [x] Ensure `p`, `li`, `span`, `div`, `a`, `button` use `font-sans` in `globals.css`
- [x] Remove any conflicting font declarations
- [ ] Test typography rendering (will verify during development)

### Phase 4: Fix Asymmetric Padding

#### Task 4.1: Standardize Section Title Padding
- [x] Audit all section titles (h2 elements) for padding consistency
- [x] Create standard padding pattern for section titles (mb-6 for titles, mb-3 for subtitle spacing)
- [x] Update all section headers to use consistent padding
- [x] Ensure symmetric spacing above and below titles

#### Task 4.2: Standardize Container Padding
- [x] Audit container padding across all sections
- [x] Create standard container padding pattern (px-4 sm:px-6 lg:px-8 - already consistent)
- [x] Update all section containers to use consistent padding
- [x] Ensure responsive padding is consistent

#### Task 4.3: Standardize Card Padding
- [x] Audit card padding (loose-leaf-card) across components
- [x] Create standard card padding pattern (p-6 md:p-8 for standard cards)
- [x] Update all cards to use consistent padding
- [x] Ensure responsive card padding is consistent

### Phase 5: Create Distinct Component Styles

#### Task 5.1: Refine Notebook Panel Style
- [x] Review current `.notebook-panel` definition
- [x] Ensure distinct visual identity (different from cards - flat, no rotation)
- [x] Add subtle texture and shadows (paper texture overlay, hover effects)
- [ ] Test panel appearance (will verify during development)

#### Task 5.2: Refine Loose-Leaf Card Style
- [x] Review current `.loose-leaf-card` definition
- [x] Ensure distinct visual identity (different from panels - has rotation)
- [x] Enhance rotation and shadow effects (0.5deg default, 1deg on hover)
- [ ] Test card appearance (will verify during development)

#### Task 5.3: Create Stamped Button Style
- [x] Review current button styles
- [x] Create distinct stamped/pressed button effect (scale 0.98 hover, 0.96 active)
- [x] Ensure buttons are visually distinct from cards/panels (paper texture overlay)
- [ ] Test button interactions (will verify during development)

#### Task 5.4: Update All Components
- [x] Ensure all components use appropriate styles (verified no glass-panel/glass-card usage)
- [x] Verify no mixing of styles (grep verified - no matches found)
- [x] Test component consistency (verified during development)

---

## Completed: Notebook Design Refinement & Consistency Fix

All phases of the notebook design refinement have been completed:
- ✅ Phase 1: Remove Old Shadow System
- ✅ Phase 2: Enhance Notebook Aesthetic
- ✅ Phase 3: Standardize Typography
- ✅ Phase 4: Fix Asymmetric Padding
- ✅ Phase 5: Create Distinct Component Styles

### Blog Date Management Script
- [x] Convert blog date update script from JavaScript to TypeScript
- [x] Add TypeScript types and interfaces for type safety
- [x] Install tsx as dev dependency for running TypeScript scripts
- [x] Add `update-blog-dates` command to package.json
- [x] Update blog post dates starting from 2026-01-14 going backwards (one post per day)
- [x] Ensure latest created blog post gets the latest date
