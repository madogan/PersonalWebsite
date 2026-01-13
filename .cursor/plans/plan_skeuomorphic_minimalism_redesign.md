# Plan: Skeuomorphic Minimalism Website Redesign

## Project Overview

Transform the personal website from a glassmorphism/futuristic design to a **Skeuomorphic Minimalism** aesthetic that evokes a premium, elite digital notebook. The design should feel like a bespoke leather-bound journal with luxury stationery and professional craftsmanship, while maintaining the existing website structure and functionality.

**Key Constraint**: Remove profile image usage entirely. Maintain all existing routes, components, and functionality—only visual design changes.

## Scope & Environment

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript 5.7.2
- **Styling**: Tailwind CSS 3.4.17
- **Package Manager**: PNPM
- **Current Dependencies**: 
  - `next-themes` for theme management
  - `lucide-react` for icons
  - `gsap` for animations (can be leveraged for micro-interactions)
  - `@tailwindcss/typography` for content styling
- **Existing Structure**: Must be preserved (routes, components, data flow)

## Design System Specifications

### 1. Color Palette

#### Light Theme (Cream Paper)
```typescript
{
  base: '#F9F7F2',        // Cream Paper background
  text: '#0F172A',        // Fountain Pen Ink (primary text)
  accent: '#9D8447',      // Deep Gold/Brass (highlights, CTAs)
  divider: '#E5E0D6',     // Subtle pencil mark color
  shadow: 'rgba(0,0,0,0.05)', // Soft paper shadow
  binding: '#D4C5A9',    // Notebook binding color
}
```

#### Dark Theme (Obsidian Leather)
```typescript
{
  base: '#141414',        // Obsidian Leather background
  text: '#F9F7F2',        // Cream text on dark
  accent: '#9D8447',      // Deep Gold/Brass (same accent)
  divider: '#2A2A2A',     // Subtle divider on dark
  shadow: 'rgba(0,0,0,0.3)', // Deeper shadow
  binding: '#1F1F1F',    // Dark binding
}
```

### 2. Typography System

#### Font Stack
- **Headings (Serif)**: Playfair Display (Google Fonts)
  - Mimics printed ink on paper
  - High contrast, sophisticated
- **Body (Sans-Serif)**: Inter (already in use)
  - Clean, legible, modern readability
- **Technical/Metadata (Monospace)**: JetBrains Mono (already in use)
  - Numbers, dates, small metadata
  - "Engineered" feel

#### Typography Scale
```typescript
{
  h1: 'Playfair Display, serif', // 4xl-7xl, bold
  h2: 'Playfair Display, serif', // 3xl-5xl, bold
  h3: 'Playfair Display, serif', // 2xl-4xl, semibold
  body: 'Inter, sans-serif',      // base-lg, regular
  mono: 'JetBrains Mono, monospace', // xs-sm, regular
}
```

### 3. Texture & Visual Effects

#### Paper Texture
- **Noise/Grain Overlay**: CSS `background-image` with SVG noise pattern
- **Opacity**: 0.03 (very subtle)
- **Blend Mode**: `overlay` or `multiply`
- Applied to main content containers

#### Shadows (Layered Paper Effect)
```css
/* Soft, layered shadows for paper depth */
box-shadow: 
  0 1px 3px rgba(0,0,0,0.05),
  0 10px 20px rgba(0,0,0,0.02),
  0 2px 4px rgba(0,0,0,0.01);
```

### 4. UI Component Specifications

#### Notebook Binding
- **Location**: Left edge of main container
- **Width**: 4-6px
- **Style**: Vertical line/texture
- **Color**: Slightly darker than base (binding color)
- **Visual**: Subtle gradient or texture to mimic book binding

#### Dividers
- **Style**: Very thin horizontal lines (0.5-1px)
- **Color**: Subtle pencil mark color (divider color)
- **Spacing**: Between major sections
- **Effect**: Hand-drawn, slightly imperfect feel

#### Cards (Loose-Leaf Inserts)
- **Rotation**: 0.5 degrees (subtle organic feel)
- **Shadow**: Layered paper shadows
- **Background**: Base color with texture overlay
- **Border**: Very subtle (1px, divider color)
- **Hover**: Slight lift (translateY -2px) with enhanced shadow

#### Navigation (Vertical Tabs - Optional Enhancement)
- **Current Structure**: No header in root layout; BottomNavigation for home page sections; MobileMenu for full navigation
- **Proposed Enhancement**: Add optional vertical tabs on right edge (desktop only) for main navigation
- **Style**: Vertical tab system resembling notebook dividers
- **Items**: Stacked vertically (Home, Blog, About, Contact from `navItems`)
- **Active State**: Highlighted with accent color
- **Mobile**: Keep existing BottomNavigation and MobileMenu (no vertical tabs on mobile)
- **Note**: This is an optional enhancement. If not implemented, keep current navigation structure and only update styling.

### 5. Micro-Interactions

#### Page Turn Transition
- **Trigger**: Route changes (Next.js App Router navigation)
- **Effect**: Simulate page turning animation or subtle fade
- **Duration**: 600-800ms
- **Implementation Options**:
  - **Option A (Recommended)**: CSS-only fade transition via route change detection in client component wrapper
  - **Option B**: GSAP for complex 3D page turn effect (if time permits)
  - **Option C**: Use experimental View Transitions API (Next.js 15+ support)
- **Fallback**: Simple fade transition for reduced motion preference
- **Note**: Next.js 15 App Router doesn't have built-in page transitions. Implementation requires client-side route change detection.

#### Stamped Button Effect
- **Trigger**: Button hover/click
- **Effect**: 
  - Slight "press" animation (scale down 0.98)
  - Subtle shadow increase (deeper impression)
  - Optional: Brief ink bleed effect
- **Duration**: 200-300ms

#### Card Hover (Loose-Leaf Lift)
- **Trigger**: Card hover
- **Effect**: 
  - Slight rotation increase (0.5° → 1°)
  - Lift effect (translateY -4px)
  - Enhanced shadow depth
- **Duration**: 300ms ease-out

## Implementation Plan

### Phase 1: Design System Foundation

#### Task 1.1: Update Tailwind Configuration
- **File**: `tailwind.config.ts`
- **Actions**:
  - Add Playfair Display font to Google Fonts import in `app/layout.tsx`
  - Extend Tailwind theme with new color palette (cream-paper, obsidian-leather, fountain-ink, deep-gold)
  - Add custom shadow utilities for layered paper effect
  - Add rotation utilities for card tilt (0.5deg increments)
  - Configure font families (serif for headings, sans for body, mono for technical)
- **Verification**: Run `pnpm type-check` and verify Tailwind classes compile

#### Task 1.2: Update CSS Variables & Global Styles
- **File**: `app/globals.css`
- **Actions**:
  - Replace existing color variables with new palette (light/dark themes)
  - Add texture overlay utilities (noise/grain pattern)
  - Update shadow variables for paper depth effect
  - Add divider utility classes
  - Update typography base styles (h1-h6 use serif, body uses sans)
  - **Gradual Migration Strategy**: 
    - Keep `.glass-panel` and `.glass-card` classes initially
    - Add new `.notebook-panel` and `.loose-leaf-card` classes
    - Migrate components one by one, then remove glassmorphism utilities in Phase 9
  - Add notebook-specific utilities (notebook-binding, loose-leaf-card, pencil-divider)
- **Verification**: Visual inspection of color tokens in browser DevTools, both old and new classes work during migration

#### Task 1.3: Create Texture Overlay Component/Utility
- **File**: `components/ui/texture-overlay.tsx` (optional) or CSS utility
- **Actions**:
  - Create SVG noise pattern or use CSS `background-image` with noise
  - Apply as overlay with 0.03 opacity
  - Make it theme-aware (subtle on both light/dark)
- **Verification**: Texture visible but not distracting on both themes

### Phase 2: Layout & Navigation Redesign

#### Task 2.1: Update Root Layout
- **File**: `app/layout.tsx`
- **Actions**:
  - Import Playfair Display font from Google Fonts
  - Add texture overlay to body or main container
  - Update font variable assignments
  - Ensure theme provider still works
- **Verification**: Fonts load correctly, texture appears on page

#### Task 2.2: Create Notebook Binding Component
- **File**: `components/layout/notebook-binding.tsx`
- **Actions**:
  - Create vertical binding element (4-6px wide)
  - Position on left edge of main content
  - Add subtle gradient/texture
  - Make it theme-aware
  - Ensure it doesn't interfere with responsive layout
- **Verification**: Binding visible on desktop, hidden or adapted on mobile

#### Task 2.3: Redesign Navigation (Optional Vertical Tabs or Style Update)
- **File**: `components/layout/navigation.tsx`
- **Current State**: Component exists but is NOT used in root layout (Header component not imported)
- **Actions**:
  - **Option A (Recommended)**: Update existing Navigation component styling to notebook aesthetic (keep horizontal layout)
  - **Option B (Enhancement)**: If vertical tabs desired, create new `components/layout/vertical-navigation.tsx` and add to root layout
  - Style as notebook dividers
  - Update active state styling (accent color highlight)
  - Keep mobile menu and bottom navigation as-is
  - Add smooth transitions
- **Verification**: Navigation works on all screen sizes, active states correct
- **Note**: Since Header is not in root layout, vertical tabs would need to be added separately if desired

#### Task 2.4: Update Header Component (If Used)
- **File**: `components/layout/header.tsx`
- **Current State**: Component exists but is NOT imported/used in root layout or any page
- **Actions**:
  - Update styling to notebook aesthetic (subtle border, paper texture)
  - Update colors to new palette
  - Remove glassmorphism styling
  - Ensure theme toggle still works (if header is added to layout)
- **Verification**: If header is added to layout, it matches new design system
- **Note**: Header component is currently unused. Update it for future use or if user wants to add it to layout.

#### Task 2.5: Update Footer Component
- **File**: `components/layout/footer.tsx`
- **Actions**:
  - Remove glassmorphism styling
  - Apply notebook aesthetic
  - Update typography (use serif for headings if any)
  - Update colors to new palette
- **Verification**: Footer matches new design system

### Phase 3: Home Page Components

#### Task 3.1: Remove Profile Image Component Usage
- **File**: `components/home/personal-hero.tsx`
- **Actions**:
  - Remove `<ProfileImage />` import and usage (line 4 and line 139)
  - Adjust layout: Remove right column (profile image container), keep left column (text content) centered or full-width
  - **CRITICAL**: Maintain ALL text content exactly as-is (name, description, contact info) - no text changes
  - Update styling to notebook aesthetic
  - Ensure contact info (location, LinkedIn, GitHub) still displays correctly
- **Verification**: No profile image appears, layout is clean, all text content preserved

#### Task 3.2: Redesign Personal Hero Section
- **File**: `components/home/personal-hero.tsx`
- **Actions**:
  - Remove glassmorphism and gradient backgrounds
  - Apply cream paper/obsidian leather background
  - Update typography (Playfair Display for name/headings)
  - Add texture overlay
  - Style as opening page of luxury journal
  - Add subtle dividers between sections
  - Update contact info styling (notebook-style)
- **Verification**: Hero section looks like journal opening page

#### Task 3.3: Redesign Skills Section
- **File**: `components/home/skills-section.tsx`
- **Actions**:
  - Convert cards to loose-leaf style (0.5° rotation)
  - Apply paper texture and layered shadows
  - Update typography (serif headings, sans body)
  - Add hover effects (lift + rotation increase)
  - Update colors to new palette
- **Verification**: Skills cards have loose-leaf appearance

#### Task 3.4: Redesign Experience Section
- **File**: `components/home/experience-section.tsx`
- **Actions**:
  - Apply notebook aesthetic to experience items
  - Use pencil dividers between entries
  - Update typography
  - Add subtle paper texture
  - Update colors
- **Verification**: Experience section looks like journal entries

#### Task 3.5: Redesign Latest Blogs Section
- **File**: `components/home/latest-blogs-section.tsx`
- **Actions**:
  - Convert blog cards to loose-leaf style
  - Apply paper texture and shadows
  - Update typography
  - Add hover effects
  - Update colors
- **Verification**: Blog cards match notebook aesthetic

#### Task 3.6: Redesign Certifications Section
- **File**: `components/home/certifications-section.tsx`
- **Actions**:
  - Apply notebook aesthetic
  - Use loose-leaf cards if applicable
  - Update typography and colors
  - Add texture overlay
- **Verification**: Certifications section matches design system

### Phase 4: Blog Pages Redesign

#### Task 4.1: Update Blog List Page
- **File**: `app/blog/page.tsx` and related components
- **Actions**:
  - Update blog list cards to loose-leaf style
  - Apply notebook aesthetic
  - Update typography (serif for titles)
  - Add pencil dividers
  - Update colors
- **Verification**: Blog list matches notebook aesthetic

#### Task 4.2: Update Blog Post Page
- **File**: `app/blog/[slug]/page.tsx` and MDX components
- **Actions**:
  - Style blog post content as journal entry
  - Update typography (serif headings, sans body)
  - Add subtle paper texture to content area
  - Update code blocks styling (monospace, notebook-style)
  - Add pencil dividers for sections
- **Verification**: Blog posts read like journal entries

### Phase 5: Resume Page Redesign

#### Task 5.1: Update Resume Components
- **Files**: `components/resume/*.tsx`
- **Actions**:
  - Apply notebook aesthetic to resume sections
  - Update typography (serif for section headings)
  - Add pencil dividers between sections
  - Update colors and shadows
  - Ensure print styles still work
- **Verification**: Resume looks like printed journal page

### Phase 6: Micro-Interactions & Animations

#### Task 6.1: Implement Page Turn Transition
- **File**: Create `components/transitions/page-turn.tsx` or client wrapper component
- **Actions**:
  - **Implementation Approach**: Create client component that wraps main content and detects route changes via `usePathname()` hook
  - Apply CSS fade/transition animation on route change (simple approach)
  - **Optional Enhancement**: Use GSAP for complex 3D page turn effect if time permits
  - Add reduced motion fallback (fade only, no complex animation)
  - Test with Next.js Link navigation and direct URL changes
- **Verification**: Smooth page transitions on route change, works with all navigation methods
- **Note**: Next.js 15 App Router doesn't have built-in page transitions. This requires custom implementation.

#### Task 6.2: Implement Stamped Button Effect
- **Files**: 
  - `components/ui/glassy-button.tsx` (update existing component)
  - `app/globals.css` (update button utility classes: `.btn-primary`, `.btn-secondary`, `.btn-ghost`)
- **Actions**:
  - Update `GlassyButton` component with stamped effect (remove glassmorphism, add notebook styling)
  - Add hover/active states with press effect (scale 0.98, enhanced shadow)
  - Implement scale + shadow animation
  - Update existing button utility classes in globals.css
  - Ensure accessibility (keyboard focus states)
  - **CRITICAL**: Preserve all button functionality and props
- **Verification**: All buttons have stamped effect on interaction, functionality preserved

#### Task 6.3: Implement Card Hover Effects
- **File**: Update card components
- **Actions**:
  - Add hover state with rotation increase (0.5° → 1°)
  - Add lift effect (translateY)
  - Enhance shadow on hover
  - Smooth transitions (300ms)
- **Verification**: Cards lift and rotate slightly on hover

### Phase 7: Theme System Updates

#### Task 7.1: Update Theme Toggle
- **File**: `components/ui/theme-toggle.tsx`
- **Actions**:
  - Ensure theme toggle works with new color palette
  - Update icon styling to match notebook aesthetic
  - Test light/dark theme switching
- **Verification**: Theme switching works, colors update correctly

#### Task 7.2: Verify Theme Consistency
- **Files**: All components
- **Actions**:
  - Test all pages in light theme (Cream Paper)
  - Test all pages in dark theme (Obsidian Leather)
  - Ensure texture overlays work in both themes
  - Verify contrast ratios meet WCAG AA
- **Verification**: Both themes look cohesive and accessible

### Phase 8: Responsive Design & Mobile

#### Task 8.1: Mobile Navigation Adaptation
- **File**: `components/layout/mobile-menu.tsx` and `components/home/bottom-navigation.tsx`
- **Actions**:
  - Ensure mobile navigation works with new design
  - Hide vertical tabs on mobile (use bottom nav)
  - Hide or adapt notebook binding on mobile
  - Update mobile menu styling
- **Verification**: Mobile navigation is functional and styled

#### Task 8.2: Responsive Card Layouts
- **Files**: All card components
- **Actions**:
  - Ensure loose-leaf cards work on mobile
  - Adjust rotation on smaller screens (may need to reduce or remove)
  - Test touch interactions
  - Verify spacing and typography scale
- **Verification**: Cards look good on all screen sizes

### Phase 9: Cleanup & Optimization

#### Task 9.1: Remove Unused Components
- **Files**: `components/home/profile-image.tsx`
- **Actions**:
  - Delete profile image component (no longer used)
  - Remove any related imports
  - Clean up unused image assets if any
- **Verification**: No references to profile image remain

#### Task 9.2: Remove Glassmorphism Utilities (After Migration)
- **File**: `app/globals.css`
- **Actions**:
  - **Only after all components migrated**: Remove `.glass-panel`, `.glass-card` classes
  - Clean up unused glassmorphism CSS variables (keep if still referenced)
  - Verify no components still use glassmorphism classes (grep search)
  - Keep only notebook-specific utilities
- **Verification**: No unused CSS, build size optimized, no broken styles
- **Note**: This is a cleanup task. Keep glassmorphism utilities until all components are migrated.

#### Task 9.3: Update Metadata & Favicon References
- **File**: `app/layout.tsx`
- **Actions**:
  - Remove profile image references from metadata icons
  - Use generic favicon or site logo
  - Update OpenGraph images if needed
- **Verification**: No profile image in metadata

#### Task 9.4: Performance Optimization
- **Files**: All
- **Actions**:
  - Optimize font loading (preload Playfair Display)
  - Ensure texture overlays don't impact performance
  - Test animation performance (60fps)
  - Optimize images if any remain
- **Verification**: Lighthouse score maintained or improved

### Phase 10: Testing & Validation

#### Task 10.1: Visual Regression Testing
- **Actions**:
  - Compare before/after screenshots of all pages
  - Verify design system consistency
  - Check spacing, typography, colors
- **Verification**: All pages match design system

#### Task 10.2: Functionality Testing
- **Actions**:
  - Test all navigation links
  - Test theme switching
  - Test blog post rendering
  - Test resume page
  - Test mobile responsiveness
- **Verification**: All functionality works as before

#### Task 10.3: Accessibility Testing
- **Actions**:
  - Verify color contrast ratios (WCAG AA)
  - Test keyboard navigation
  - Test screen reader compatibility
  - Verify focus states
  - Test reduced motion preferences
- **Verification**: Site is accessible

#### Task 10.4: Browser Compatibility
- **Actions**:
  - Test in Chrome, Firefox, Safari, Edge
  - Verify CSS features (backdrop-filter, transforms, etc.)
  - Test on mobile browsers
- **Verification**: Works across major browsers

## Layout & Flow Compatibility Review

### Current Layout Structure
- **Root Layout** (`app/layout.tsx`):
  - ThemeToggle (fixed top-right)
  - Main content area (`<main>`)
  - Footer (bottom)
  - BottomNavigation (fixed bottom, only on home page)
- **No Header**: Header component exists but not used in root layout
- **Navigation Flow**:
  - Home page: BottomNavigation for section scrolling
  - Blog pages: BackButton for navigation
  - Mobile: MobileMenu component (slide-in from right)
  - Desktop: Navigation component (horizontal, but not currently used)

### Design Compatibility
- **Notebook Binding**: Can be added to main container without breaking layout
- **Vertical Tabs**: Optional enhancement - can be added as fixed right-side element
- **Texture Overlay**: Applied to body/main container - compatible with existing structure
- **Card Rotations**: Will work with existing grid/flex layouts
- **Profile Image Removal**: Layout will shift from 2-column to 1-column (centered) - compatible

### Flow Preservation
- ✅ All routes remain unchanged
- ✅ Component hierarchy preserved
- ✅ Data flow unchanged (all data fetching remains server-side)
- ✅ Navigation patterns preserved (BottomNavigation, BackButton, MobileMenu)
- ✅ Theme system unchanged (next-themes)
- ✅ All text content preserved (user requirement)

## Technical Considerations

### Font Loading Strategy
- Use Next.js `next/font/google` for Playfair Display
- Preload critical fonts
- Use `display: swap` for performance

### Texture Implementation
- Option 1: SVG noise pattern (inline or data URI)
- Option 2: CSS `background-image` with generated noise
- Option 3: Canvas-generated noise (if needed for performance)
- **Recommendation**: Start with SVG/CSS, optimize if needed

### Animation Performance
- Use CSS transforms (GPU-accelerated)
- Use `will-change` sparingly
- Respect `prefers-reduced-motion`
- Test on lower-end devices

### Theme System
- Leverage existing `next-themes` setup
- Update CSS variables for new palette
- Ensure smooth theme transitions

## Dependencies

### New Dependencies
- None required (all fonts via Google Fonts, animations via CSS/GSAP)

### Existing Dependencies to Leverage
- `next-themes`: Theme management
- `gsap`: Advanced animations (if needed for page turn)
- `lucide-react`: Icons (keep existing)
- `@tailwindcss/typography`: Content styling

## Success Criteria

1. ✅ Website looks like a premium digital notebook
2. ✅ All existing functionality preserved
3. ✅ Profile image completely removed
4. ✅ Design system is consistent across all pages
5. ✅ Micro-interactions enhance user experience
6. ✅ Responsive on all devices
7. ✅ Accessible (WCAG AA)
8. ✅ Performance maintained or improved
9. ✅ Both light and dark themes work perfectly
10. ✅ Typography hierarchy is clear and readable

## Risk Mitigation

### Risk: Texture Overlay Performance
- **Mitigation**: Start with CSS-only solution, optimize if needed
- **Fallback**: Remove texture if performance issues

### Risk: Complex Page Turn Animation
- **Mitigation**: Start with simple fade, enhance if time permits
- **Fallback**: Use Next.js default transitions

### Risk: Vertical Navigation on Mobile
- **Mitigation**: Hide on mobile, use existing bottom nav
- **Fallback**: Horizontal nav on all screens

### Risk: Font Loading Delay
- **Mitigation**: Preload fonts, use `display: swap`
- **Fallback**: System serif font as fallback

## Notes

- **Profile Image Removal**: User explicitly requested no profile image. Ensure all references are removed from `personal-hero.tsx` and metadata.
- **Text Preservation**: User explicitly stated "Do not change any texts, spots etc." - ALL content must remain exactly as-is, only styling changes.
- **Structure Preservation**: Do not change routes, component structure, or data flow—only visual design. Keep existing component hierarchy.
- **Navigation Structure**: Current layout has no Header in root layout. Navigation is via BottomNavigation (home page) and MobileMenu. Vertical tabs are optional enhancement.
- **Gradual Migration**: Use gradual migration strategy for glassmorphism → notebook aesthetic. Keep old classes until all components migrated.
- **Incremental Implementation**: Can be done page-by-page, but maintain consistency.
- **Design System First**: Establish design system (Phase 1) before updating components.

## Review Notes & Refinements

### Codebase Compatibility Findings

1. **Navigation Structure**:
   - Header component exists but is NOT used in root layout
   - Root layout only has: ThemeToggle (fixed), main content, Footer, BottomNavigation
   - Navigation component exists but only used if Header is added
   - BottomNavigation is for home page sections only (shows only on `/`)
   - Blog pages use BackButton instead of full navigation
   - **Refinement**: Clarified navigation approach - keep current structure, update styling only

2. **Component Dependencies**:
   - `glass-card` and `glass-panel` classes used extensively (20+ instances)
   - `GlassyButton` component exists and is used
   - **Refinement**: Use gradual migration strategy - add new classes, migrate components, then remove old classes

3. **Page Transitions**:
   - Next.js 15 App Router doesn't have built-in page transitions
   - **Refinement**: Clarified implementation approach using client-side route change detection

4. **Blog Post Metadata**:
   - Uses `generateMetadata` function (which rules say to avoid, but it's existing code)
   - **Refinement**: Don't change existing metadata generation per user's "don't change structure" instruction

5. **Profile Image**:
   - Used in `personal-hero.tsx` (line 4 import, line 139 usage)
   - Referenced in `app/layout.tsx` metadata (lines 33-37)
   - **Refinement**: Explicitly noted both locations for removal

6. **Text Content**:
   - User explicitly said "Do not change any texts, spots etc."
   - **Refinement**: Added explicit note in Task 3.1 to preserve ALL text content

### Technical Adjustments Made

- Clarified navigation approach (keep current structure, optional vertical tabs)
- Added gradual migration strategy for glassmorphism classes
- Clarified page transition implementation for Next.js 15
- Noted Header component is unused but should be updated for future use
- Explicitly preserved text content requirement
- Added verification steps for component functionality preservation

## Next Steps

1. Review and approve this plan
2. Initialize TODO.md with tasks from this plan
3. Begin Phase 1: Design System Foundation
4. Iterate through phases sequentially
5. Test and refine as needed
