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
- [ ] Write initial blog posts
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
- [x] Implement theme-specific profile images (profile_light.jpg and profile_dark.jpg)
- [x] Create ProfileImage component with automatic theme-based image switching
- [x] Remove empty spacing on right side of bottom navigation menu
- [x] Fix hardcoded green color in status badge component
- [x] Add glassmorphism container to profile image with rounded-2xl border radius
- [x] Position profile image at bottom of glass container with top spacing
- [x] Update contact icon containers to square shape with rounded-2xl (matching toggle switch)
- [x] Increase glassmorphism contrast for better visibility

