# Initial Planning: Personal Website with Blog & Resume

## Project Overview

Build a personal website featuring blogs, resume, and personal posts using Next.js 15 as a static site generator. The site will use local file-based content (no database) with a modern, minimal, futuristic design featuring glassmorphism effects, light/dark themes, and smooth animations.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Theming**: next-themes
- **Animations**: Framer Motion
- **Content**: MDX (native Next.js support)
- **Code Highlighting**: Shiki or rehype-pretty-code
- **Code Quality**: ESLint + Prettier
- **Accessibility**: WCAG 2.1 AA compliance

## Project Structure

```
PersonalWebsite/
├── app/                    # Next.js 15 App Router
│   ├── (routes)/          # Route groups
│   │   ├── page.tsx       # Home page
│   │   ├── blog/
│   │   │   ├── page.tsx   # Blog list
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Blog post
│   │   ├── resume/
│   │   │   └── page.tsx   # Resume page
│   │   ├── about/
│   │   │   └── page.tsx   # About page
│   │   └── contact/
│   │       └── page.tsx   # Contact page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles + CSS variables
│   └── sitemap.ts         # Dynamic sitemap
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ...
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── blog/              # Blog-specific components
│   │   ├── BlogCard.tsx
│   │   ├── BlogList.tsx
│   │   ├── BlogPost.tsx
│   │   ├── ShareButton.tsx
│   │   └── TagList.tsx
│   └── resume/            # Resume components
│       └── ResumeSection.tsx
├── content/               # Local content files
│   ├── blog/             # MDX blog posts
│   │   ├── post-1.mdx
│   │   ├── post-2.mdx
│   │   └── ...
│   └── resume/           # Resume data (JSON or MDX)
│       └── resume.json
├── lib/                   # Utilities
│   ├── mdx.ts            # MDX processing
│   ├── utils.ts          # Helper functions
│   ├── constants.ts      # Site constants
│   └── metadata.ts       # SEO metadata helpers
├── public/                # Static assets
│   ├── images/
│   └── favicon.ico
└── styles/                # Additional styles if needed
```

## Design System

### Color Palette

**Light Theme:**

- Base: `#FAFAFA` (off-white)
- Text: `#0A0A0A` (near-black)
- Accent: Teal/Cyan (`#14B8A6`, `#06B6D4`)
- Accent Secondary: Soft Green (`#10B981`)

**Dark Theme:**

- Base: `#0A0A0A` (near-black)
- Text: `#FAFAFA` (off-white)
- Accent: Teal/Cyan (`#2DD4BF`, `#22D3EE`)
- Accent Secondary: Soft Green (`#34D399`)

### Typography

- **Body**: Inter (sans-serif)
- **Code/Metadata**: JetBrains Mono (monospace)
- **Headings**: Inter (bold weights)

### Design Tokens (CSS Variables)

```css
--color-background
--color-foreground
--color-accent
--color-accent-secondary
--radius-sm, --radius-md, --radius-lg
--blur-sm, --blur-md, --blur-lg
--shadow-sm, --shadow-md, --shadow-lg
--spacing-* (scale)
```

### Glassmorphism Style

- Translucent panels: `backdrop-blur-md` with `bg-*/20` opacity
- Subtle borders: `border border-*/20`
- Soft shadows: `shadow-lg`
- Rounded corners: `rounded-lg` or `rounded-xl`

## Implementation Phases

### Phase 1: Project Setup & Foundation

#### 1.1 Initialize Next.js 15 Project

- [ ] Create Next.js 15 project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up ESLint + Prettier
- [ ] Configure path aliases (`@/components`, `@/lib`, etc.)

#### 1.2 Design System Setup

- [ ] Create CSS variables for theme tokens (colors, radii, blur, shadows)
- [ ] Configure Tailwind with custom theme values
- [ ] Set up typography scale
- [ ] Create base component styles

#### 1.3 Theme System

- [ ] Install and configure `next-themes`
- [ ] Create theme provider component
- [ ] Implement CSS variable-based theming
- [ ] Create ThemeToggle component with smooth animations
- [ ] Test system theme detection

### Phase 2: Core Layout & Navigation

#### 2.1 Root Layout

- [ ] Create root layout with theme provider
- [ ] Set up global styles and CSS variables
- [ ] Configure metadata and SEO defaults
- [ ] Add font loading (Inter, JetBrains Mono)

#### 2.2 Header & Navigation

- [ ] Create Header component with glassmorphism
- [ ] Build Navigation component with smooth transitions
- [ ] Implement active route highlighting
- [ ] Add mobile menu (responsive)
- [ ] Add subtle animations (fade-in, underline on hover)

#### 2.3 Footer

- [ ] Create Footer component
- [ ] Add social links (if applicable)
- [ ] Add copyright and metadata

### Phase 3: Home Page

#### 3.1 Hero Section

- [ ] Design hero with glassmorphism panel
- [ ] Add introduction text
- [ ] Implement subtle animations (fade-in, slide-up)
- [ ] Add CTA buttons to key pages

#### 3.2 Featured Content

- [ ] Display latest blog posts preview
- [ ] Add "View All" link to blog
- [ ] Implement card hover effects

### Phase 4: Blog System

#### 4.1 MDX Setup

- [ ] Configure MDX in Next.js 15
- [ ] Set up MDX components (headings, paragraphs, code blocks, etc.)
- [ ] Install and configure Shiki/rehype-pretty-code for syntax highlighting
- [ ] Create custom MDX components (blockquotes, callouts, etc.)

#### 4.2 Blog Content Structure

- [ ] Define blog post frontmatter schema (title, date, tags, description, etc.)
- [ ] Create sample blog posts in `content/blog/`
- [ ] Set up blog post reading time calculation
- [ ] Create blog post metadata extraction utility

#### 4.3 Blog List Page

- [ ] Create blog list page (`/blog`)
- [ ] Implement blog post card component with glassmorphism
- [ ] Add filtering by tags
- [ ] Add search functionality (optional)
- [ ] Implement pagination (if needed)
- [ ] Add smooth page transitions

#### 4.4 Blog Post Page

- [ ] Create dynamic blog post page (`/blog/[slug]`)
- [ ] Implement blog post layout with excellent typography
- [ ] Add metadata display (date, reading time, tags)
- [ ] Create TagList component
- [ ] Add "Share on LinkedIn" button with proper URL generation
- [ ] Implement related posts section
- [ ] Add smooth scroll behavior

#### 4.5 Blog SEO & Metadata

- [ ] Generate dynamic metadata for each blog post
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Implement structured data (JSON-LD) for articles

### Phase 5: Resume Page

#### 5.1 Resume Data Structure

- [ ] Define resume JSON schema
- [ ] Create resume data file (`content/resume/resume.json`)
- [ ] Include sections: Experience, Education, Skills, Projects, etc.

#### 5.2 Resume Components

- [ ] Create ResumeSection component
- [ ] Build timeline/chronological layout
- [ ] Add printable-friendly styles
- [ ] Implement glassmorphism panels for sections
- [ ] Add subtle animations on scroll

#### 5.3 Resume Page

- [ ] Create resume page (`/resume`)
- [ ] Implement responsive layout
- [ ] Add print stylesheet
- [ ] Ensure accessibility

### Phase 6: About & Contact Pages

#### 6.1 About Page

- [ ] Create about page (`/about`)
- [ ] Design with glassmorphism panels
- [ ] Add personal information sections
- [ ] Implement smooth animations

#### 6.2 Contact Page

- [ ] Create contact page (`/contact`)
- [ ] Add contact form (optional) or contact information
- [ ] Implement glassmorphism form design
- [ ] Add form validation (if form included)

### Phase 7: SEO & Performance

#### 7.1 Sitemap

- [ ] Generate dynamic sitemap (`app/sitemap.ts`)
- [ ] Include all pages and blog posts
- [ ] Update on build

#### 7.2 RSS Feed

- [ ] Create RSS feed generator
- [ ] Include blog posts with metadata
- [ ] Add RSS route (`/feed.xml`)

#### 7.3 Performance Optimization

- [ ] Optimize images (Next.js Image component)
- [ ] Implement code splitting
- [ ] Add loading states
- [ ] Optimize font loading
- [ ] Test Lighthouse scores

#### 7.4 Accessibility

- [ ] Add ARIA labels where needed
- [ ] Ensure keyboard navigation
- [ ] Test with screen readers
- [ ] Implement reduced motion preferences
- [ ] Ensure color contrast meets WCAG AA

### Phase 8: Motion & Polish

#### 8.1 Page Transitions

- [ ] Implement page transition animations (fade + slight translate)
- [ ] Add loading states between pages
- [ ] Ensure smooth navigation

#### 8.2 Micro-interactions

- [ ] Add hover effects on cards
- [ ] Implement button hover states
- [ ] Add focus states with accent colors
- [ ] Create subtle scroll animations

#### 8.3 Motion Preferences

- [ ] Respect `prefers-reduced-motion`
- [ ] Provide fallbacks for animations
- [ ] Test with reduced motion enabled

### Phase 9: Content & Final Touches

#### 9.1 Content Creation

- [ ] Write initial blog posts
- [ ] Complete resume data
- [ ] Write about page content
- [ ] Add contact information

#### 9.2 Testing

- [ ] Test all pages on multiple devices
- [ ] Test theme switching
- [ ] Test blog post rendering
- [ ] Test share functionality
- [ ] Test print styles for resume
- [ ] Cross-browser testing

#### 9.3 Documentation

- [ ] Update README with setup instructions
- [ ] Document content structure
- [ ] Add comments to complex components
- [ ] Create contribution guidelines (if needed)

## Key Features Checklist

### Pages

- [x] Home
- [ ] Blog (list)
- [ ] Blog post (dynamic)
- [ ] Resume
- [ ] About
- [ ] Contact

### Blog Features

- [ ] MDX-based content
- [ ] Tags
- [ ] Published date
- [ ] Reading time
- [ ] SEO metadata
- [ ] RSS feed
- [ ] Sitemap
- [ ] Share on LinkedIn button

### Design Features

- [ ] Light/dark themes
- [ ] Glassmorphism effects
- [ ] Minimal + futuristic style
- [ ] Editorial/notebook vibe
- [ ] Smooth motion/animations
- [ ] Responsive design
- [ ] Accessible (WCAG AA)

### Technical Features

- [ ] TypeScript
- [ ] Static site generation
- [ ] Local file-based content
- [ ] Code syntax highlighting
- [ ] SEO optimized
- [ ] Performance optimized

## Content Structure Examples

### Blog Post Frontmatter

```yaml
---
title: 'Post Title'
description: 'Post description for SEO'
date: '2024-01-15'
tags: ['nextjs', 'typescript', 'web-dev']
readingTime: 5
---
```

### Resume JSON Structure

```json
{
  "personal": {
    "name": "...",
    "title": "...",
    "email": "...",
    "location": "..."
  },
  "experience": [...],
  "education": [...],
  "skills": [...],
  "projects": [...]
}
```

## Next Steps

1. Start with Phase 1: Project Setup & Foundation
2. Work through phases sequentially
3. Test each phase before moving to the next
4. Iterate on design based on visual feedback
5. Focus on content quality and SEO

## Notes

- All content will be stored locally in the `content/` directory
- No database required - everything is file-based
- Static site generation for optimal performance
- Focus on minimal, clean design with subtle futuristic accents
- Ensure excellent typography for blog reading experience
- Prioritize accessibility and performance
