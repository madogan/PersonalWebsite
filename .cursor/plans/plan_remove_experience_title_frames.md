# Plan: Remove Title Frames/Badges Across All Pages

## Project Overview

Remove visual frames/badges (rounded rectangles with background) from title-related elements across the entire website. This includes location/date metadata in Professional Experience section and prominent text badges in hero sections. The text content should remain visible but without the background frames, creating a cleaner, more minimal appearance that aligns with the skeuomorphic minimalism design philosophy.

## Scope & Environment

- **Framework**: Next.js 15+ (App Router)
- **TypeScript**: 5.7.2
- **Styling**: Tailwind CSS 3.4.17
- **Responsive Design**: Must maintain mobile and desktop layouts
- **Components Affected**:
  - `components/resume/experience-item.tsx` (Professional Experience section)
  - `components/home/personal-hero.tsx` (Hero section summary badge)

## Current Implementation Analysis

### 1. Experience Item Component (`components/resume/experience-item.tsx`)

The `ExperienceItem` component displays location and date information in badge-style frames using:

- Background: `bg-foreground/5`
- Border radius: `rounded-md`
- Padding: `px-2 py-1` (mobile) and `px-3 py-1` (desktop)

These frames appear in three locations:

1. **Mobile view** (lines 70-75): Location and date badges displayed side-by-side
2. **Desktop view - Location** (lines 79-81): Location badge below company name
3. **Desktop view - Date** (lines 86-88): Date badge on the right side

### 2. Personal Hero Component (`components/home/personal-hero.tsx`)

The `PersonalHero` component wraps the first four words of the summary in a badge-style frame (line 43):

- Background: `bg-accent/10`
- Border: `border border-accent/20`
- Border radius: `rounded-md`
- Padding: `px-2 py-1`
- This creates a prominent "title-like" badge for the opening words of the summary

### 3. Other Badge Instances (Excluded from Scope)

The following badge instances are **intentionally excluded** as they serve functional purposes:

- **Blog locale badges** (`components/blog/blog-list-client.tsx` line 88-90): Functional metadata badge for language identification
- **Tag badges** (`components/blog/tag-list.tsx`): Functional categorization tags
- **Tag filter buttons** (`components/blog/tag-filter.tsx`): Interactive filter controls
- **Code block styling** (`app/blog/[slug]/page.tsx`): Syntax highlighting backgrounds
- **Note callouts** (`components/resume/experience-item.tsx` line 101): Informational callout boxes (not title frames)

## Interface Specifications

### Component Props (No Changes)

```typescript
type ExperienceItemProps = {
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  description: string[]
  note?: string
}
```

### Visual Changes

- **Remove**: `bg-foreground/5`, `rounded-md`, `px-2 py-1`, `px-3 py-1` classes
- **Keep**: Text content, text sizing (`text-xs sm:text-sm`), text colors (`text-foreground/70`, `text-foreground/60`), spacing (`gap-2`, `mb-2`)
- **Maintain**: Responsive behavior, layout structure, accessibility

## Step-by-Step Execution Plan

### Phase 1: Experience Item Component

#### Step 1.1: Remove Mobile View Badge Frames

**File**: `components/resume/experience-item.tsx`  
**Location**: Lines 69-76

**Action**:

- Remove `bg-foreground/5 rounded-md px-2 py-1` classes from location span (line 70)
- Remove `bg-foreground/5 rounded-md px-2 py-1` classes from date span (line 73)
- Keep `inline-block` if needed for layout, or change to `inline` if spacing allows
- Maintain `gap-2` spacing between elements
- Preserve text sizing and color classes

**Verification**:

- [ ] Mobile view displays location and date without background frames
- [ ] Text remains readable and properly spaced
- [ ] Gap between location and date is maintained

#### Step 1.2: Remove Desktop Location Badge Frame

**File**: `components/resume/experience-item.tsx`  
**Location**: Lines 78-82

**Action**:

- Remove `bg-foreground/5 rounded-md px-2 py-1 md:px-3 md:py-1` classes from location span (line 79)
- Simplify to plain text or minimal span wrapper
- Keep text sizing (`text-xs sm:text-sm`) and color (`text-foreground/70`)
- Maintain `hidden md:block` responsive visibility

**Verification**:

- [ ] Desktop view displays location without background frame
- [ ] Location text appears below company name as expected
- [ ] Text styling (size, color) is preserved

#### Step 1.3: Remove Desktop Date Badge Frame

**File**: `components/resume/experience-item.tsx`  
**Location**: Lines 85-89

**Action**:

- Remove `bg-foreground/5 rounded-md px-2 py-1 md:px-3 md:py-1` classes from date span (line 86)
- Simplify to plain text or minimal span wrapper
- Keep text sizing (`text-xs sm:text-sm md:text-base`) and color (`text-foreground/70`)
- Maintain `font-semibold` if desired for emphasis
- Preserve right alignment (`md:text-right`) and spacing (`md:ml-4`)

**Verification**:

- [ ] Desktop view displays date without background frame
- [ ] Date text appears on the right side as expected
- [ ] Text styling (size, color, weight) is preserved
- [ ] Right alignment and spacing are maintained

### Phase 2: Personal Hero Component

#### Step 2.1: Remove Summary Opening Words Badge Frame

**File**: `components/home/personal-hero.tsx`  
**Location**: Lines 42-46

**Action**:

- Remove `bg-accent/10 border border-accent/20 rounded-md px-2 py-1` classes from the span wrapping first four words (line 43)
- Remove `relative inline-block align-middle` if not needed for layout
- Keep the text content and any animation classes (`animate-fade-in`, `animationDelay`, `animationFillMode`)
- Maintain text styling (`text-accent font-medium`) but apply directly to text or parent element
- Ensure the first four words still flow naturally with the rest of the paragraph

**Verification**:

- [ ] Summary opening words display without background frame
- [ ] Text flows naturally within the paragraph
- [ ] Animation effects are preserved if applicable
- [ ] Text styling (color, weight) is maintained
- [ ] No layout shifts or spacing issues

### Phase 3: Cross-Component Consistency

#### Step 3.1: Visual Consistency Check

**Files**:

- `components/resume/experience-item.tsx`
- `components/home/personal-hero.tsx`

**Action**:

- Review all badge frame removals across both components
- Ensure consistent text styling where appropriate
- Verify no orphaned classes or unused styling
- Check that spacing and layout remain balanced
- Confirm all title-related frames are removed

**Verification**:

- [ ] All badge frames removed consistently across components
- [ ] Text styling is uniform where appropriate
- [ ] No visual inconsistencies between mobile and desktop
- [ ] Components maintain clean, minimal appearance
- [ ] No remaining title-related badge frames

### Phase 4: Testing & Quality Assurance

#### Step 4.1: Responsive Testing

**Action**:

- Test all affected components at various breakpoints (mobile, tablet, desktop)
- Verify text remains readable without background frames
- Ensure layout doesn't break at any breakpoint
- Check that spacing and alignment are appropriate
- Test both light and dark themes if applicable

**Verification**:

- [ ] Mobile view (< 768px) displays correctly for all components
- [ ] Tablet view (768px - 1024px) displays correctly
- [ ] Desktop view (> 1024px) displays correctly
- [ ] Text contrast is sufficient for readability
- [ ] No layout shifts or overflow issues
- [ ] Theme switching works correctly

#### Step 4.2: Code Quality Check

**Action**:

- Run TypeScript type checking: `pnpm type-check`
- Run ESLint: `pnpm lint`
- Run Prettier formatting: `pnpm format`
- Verify no unused imports or variables
- Check for any console warnings or errors

**Verification**:

- [ ] No TypeScript errors
- [ ] No ESLint warnings or errors
- [ ] Code is properly formatted
- [ ] No unused code or imports
- [ ] No runtime errors or warnings

## Verification Criteria

### Functional Requirements

- ✅ Location and date text display without background frames (Experience Item)
- ✅ Summary opening words display without background frame (Personal Hero)
- ✅ All text content remains visible and readable
- ✅ Responsive behavior works on all screen sizes
- ✅ All components maintain existing functionality
- ✅ Animations and transitions preserved where applicable

### Visual Requirements

- ✅ Clean, minimal appearance without badge frames across all pages
- ✅ Consistent text styling across mobile and desktop
- ✅ Proper spacing and alignment maintained
- ✅ Text contrast sufficient for accessibility
- ✅ No visual inconsistencies between components

### Code Quality Requirements

- ✅ TypeScript types are correct
- ✅ No linting errors
- ✅ Code follows project conventions
- ✅ No unnecessary complexity introduced
- ✅ No unused classes or imports

## Edge Cases & Considerations

1. **Text Readability**: Ensure text color (`text-foreground/70`, `text-foreground/60`) provides sufficient contrast without the background frame
2. **Spacing**: May need to adjust spacing if removing padding affects layout balance
3. **Visual Hierarchy**: Verify that removing frames doesn't reduce visual distinction between different metadata elements
4. **Accessibility**: Ensure text remains accessible and readable without background contrast

## Dependencies

- No new dependencies required
- No changes to data structure or props
- No API or service changes needed

## Testing Strategy

1. **Visual Testing**:
   - View component in browser at different breakpoints
   - Compare before/after appearance
   - Verify text readability

2. **Responsive Testing**:
   - Test mobile view (< 768px)
   - Test tablet view (768px - 1024px)
   - Test desktop view (> 1024px)

3. **Code Quality Testing**:
   - Run type checking
   - Run linting
   - Run formatting checks

## Rollback Plan

If issues arise, revert changes by restoring the badge classes:

**Experience Item Component:**

- `bg-foreground/5 rounded-md px-2 py-1` (mobile)
- `bg-foreground/5 rounded-md px-2 py-1 md:px-3 md:py-1` (desktop)

**Personal Hero Component:**

- `bg-accent/10 border border-accent/20 rounded-md px-2 py-1` (summary badge)

## Success Metrics

- All title-related badge frames removed from experience items and hero section
- Text remains readable and properly styled across all components
- No layout or responsive issues on any breakpoint
- Code passes all quality checks (TypeScript, ESLint, Prettier)
- Visual appearance aligns with minimal design goals
- Consistent styling across all affected components

## Review Notes

### Technical Decisions

1. **Scope Expansion**: Expanded scope from single component to multiple components after codebase audit revealed similar badge patterns in Personal Hero section. This ensures consistency across the entire website.

2. **Selective Exclusion**: Intentionally excluded functional badges (locale badges, tag badges, filter buttons) as they serve distinct interactive/categorization purposes and are not "title frames" in the user's context.

3. **Preservation Strategy**: Maintained all text styling, animations, and layout structure while only removing visual frame elements (background, border, padding). This ensures minimal visual disruption while achieving the desired minimal aesthetic.

4. **Responsive Considerations**: All changes maintain responsive behavior and breakpoint-specific styling. Mobile and desktop views are handled separately to ensure optimal display on all devices.

5. **Theme Compatibility**: Changes are compatible with both light and dark themes as they only remove background frames, not text colors or other theme-dependent styling.

### Risk Assessment

**Low Risk:**

- Simple class removal operations
- No data structure or API changes
- No breaking changes to component interfaces
- Easy rollback path available

**Mitigation:**

- Comprehensive testing across breakpoints
- Visual regression testing recommended
- Code quality checks ensure no syntax errors
- Preserved all functional behavior and animations

### Long-term Maintainability

- Changes follow existing code patterns
- No new dependencies or utilities introduced
- Consistent with project's minimal design philosophy
- Easy to extend if additional badge removals are needed in future
