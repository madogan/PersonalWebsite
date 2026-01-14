# Instructions: Adding New Blog Posts

When the user requests to add a new blog post, follow these instructions to ensure proper integration with the blog system.

## Blog System Overview

- **Content Location:** `content/blog/` directory
- **File Format:** MDX (Markdown with frontmatter)
- **File Extension:** `.mdx`
- **URL Structure:** `/blog/{slug}` where slug is derived from filename
- **Supported Locales:** `en` (English) and `tr` (Turkish)

## Frontmatter Schema

### Required Fields

```yaml
---
title: 'Blog Post Title' # Required: Post title
description: 'Post description' # Required: SEO description (150-160 chars recommended)
date: 'YYYY-MM-DD' # Required: Publication date (ISO format)
tags: ['tag1', 'tag2', 'tag3'] # Required: Array of tags (at least 1 tag)
locale: 'en' # Required: "en" or "tr" (defaults to "en" if omitted)
---
```

### Optional Fields (for Bilingual Posts)

```yaml
---
alternateLocale: 'tr' # Optional: Alternate language ("en" or "tr")
alternateSlug: 'turkish-post-slug' # Optional: Slug of alternate language post
---
```

**Note:** If `alternateLocale` and `alternateSlug` are provided, a language switcher will appear on the post page.

## File Naming Convention

- **Format:** `{slug}.mdx`
- **Slug Rules:**
  - Use lowercase letters, numbers, and hyphens
  - No spaces (use hyphens instead)
  - Descriptive and SEO-friendly
  - Examples:
    - `why-ai-systems-fail-in-production.mdx`
    - `reality-of-enterprise-ai-avoiding-common-pitfalls-scaling-genai.mdx`
    - `designing-observability-for-ai-ml-services.mdx`

## Post Types

### 1. Single-Locale Post (English)

```yaml
---
title: 'Post Title'
description: 'Post description for SEO'
date: '2026-12-01'
tags: ['AI', 'MLOps', 'Production']
locale: 'en'
---
```

**Characteristics:**

- No language switcher will appear
- Default locale is "en" if omitted
- Most common post type

### 2. Single-Locale Post (Turkish)

```yaml
---
title: 'Post Başlığı'
description: 'Post açıklaması'
date: '2026-12-01'
tags: ['AI', 'MLOps', 'Üretim']
locale: 'tr'
---
```

**Characteristics:**

- No language switcher will appear
- Must explicitly set `locale: "tr"`

### 3. Bilingual Post (Both Languages)

**English Version:**

```yaml
---
title: 'Post Title'
description: 'Post description'
date: '2026-12-01'
tags: ['AI', 'MLOps']
locale: 'en'
alternateLocale: 'tr'
alternateSlug: 'turkish-post-slug'
---
```

**Turkish Version:**

```yaml
---
title: 'Post Başlığı'
description: 'Post açıklaması'
date: '2026-12-01'
tags: ['AI', 'MLOps']
locale: 'tr'
alternateLocale: 'en'
alternateSlug: 'english-post-slug'
---
```

**Important:** Both posts must link to each other:

- English post references Turkish post via `alternateSlug`
- Turkish post references English post via `alternateSlug`
- Language switcher appears on both posts

## Content Structure

### Markdown Content

After the frontmatter, write content using standard Markdown:

```markdown
---
title: 'My Blog Post'
description: 'A great blog post'
date: '2026-12-01'
tags: ['Web', 'Development']
locale: 'en'
---

# Introduction

Your blog post content here using Markdown.

## Section 1

Content with **bold**, _italic_, and [links](https://example.com).

### Subsection

- Bullet points
- More points

## Code Blocks

\`\`\`typescript
const example = "code"
\`\`\`

## Conclusion

Wrap up your thoughts.
```

### Supported Markdown Features

- Headings (H1-H6)
- Bold, italic, strikethrough
- Links and images
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- Blockquotes
- Tables
- Horizontal rules

## Best Practices

### 1. Title Guidelines

- Keep titles concise (50-60 characters ideal)
- Use title case
- Make them descriptive and SEO-friendly
- Avoid clickbait

### 2. Description Guidelines

- 150-160 characters for optimal SEO
- Summarize the post's main value proposition
- Include relevant keywords naturally
- Write in complete sentences

### 3. Date Guidelines

- Use ISO format: `YYYY-MM-DD`
- Use the actual publication date
- Posts are sorted by date (newest first)

### 4. Tags Guidelines

- Use 3-7 tags per post
- Capitalize tag names (e.g., "AI", "MLOps", "SRE")
- Use existing tags when possible for consistency
- Create new tags only when necessary
- Common tags: `["AI", "MLOps", "SRE", "Production", "Reliability", "Systems Engineering"]`

### 5. Slug Guidelines

- Create slug from title: lowercase, hyphens for spaces
- Example: "Why AI Systems Fail" → `why-ai-systems-fail`
- Keep slugs concise but descriptive
- Use consistent naming patterns

### 6. Locale Guidelines

- Always include `locale` field explicitly
- For bilingual posts, ensure both versions link to each other
- Use same tags in both languages (or translate appropriately)
- Keep publication dates synchronized

## Implementation Steps

When adding a new blog post:

1. **Determine Post Type:**
   - Single-locale (English or Turkish)?
   - Bilingual (both languages)?

2. **Create File:**
   - Location: `content/blog/{slug}.mdx`
   - Use descriptive slug based on title

3. **Add Frontmatter:**
   - Include all required fields
   - Add optional fields if bilingual
   - Verify date format (YYYY-MM-DD)

4. **Write Content:**
   - Use Markdown syntax
   - Structure with headings
   - Include code examples if relevant
   - Add proper formatting

5. **Verify:**
   - Check frontmatter syntax (YAML)
   - Ensure date is valid
   - Verify tags are properly formatted
   - Test that post appears in blog list

## Example: Complete Single-Locale Post

```markdown
---
title: 'Understanding Next.js 15 Server Components'
description: 'A deep dive into Next.js 15 Server Components, their benefits, and best practices for building performant React applications.'
date: '2026-01-15'
tags: ['Next.js', 'React', 'Web Development', 'Performance']
locale: 'en'
---

# Introduction

Next.js 15 introduces significant improvements to Server Components...

## What Are Server Components?

Server Components allow you to...

## Benefits

1. **Performance**: Reduced JavaScript bundle size
2. **SEO**: Better search engine optimization
3. **Security**: Sensitive logic stays on server

## Best Practices

- Use Server Components by default
- Only use Client Components when needed
- Leverage async/await for data fetching

## Conclusion

Server Components represent a major shift in React development...
```

## Example: Bilingual Post Pair

**English Version (`understanding-nextjs-server-components.mdx`):**

```yaml
---
title: 'Understanding Next.js 15 Server Components'
description: 'A deep dive into Next.js 15 Server Components...'
date: '2026-01-15'
tags: ['Next.js', 'React', 'Web Development']
locale: 'en'
alternateLocale: 'tr'
alternateSlug: 'nextjs-15-server-componentleri-anlamak'
---
```

**Turkish Version (`nextjs-15-server-componentleri-anlamak.mdx`):**

```yaml
---
title: 'Next.js 15 Server Componentlerini Anlamak'
description: 'Next.js 15 Server Componentlerine derinlemesine bakış...'
date: '2026-01-15'
tags: ['Next.js', 'React', 'Web Geliştirme']
locale: 'tr'
alternateLocale: 'en'
alternateSlug: 'understanding-nextjs-server-components'
---
```

## Automatic Features

The blog system automatically provides:

- **Reading Time:** Calculated from content length
- **SEO Metadata:** Generated from frontmatter
- **Open Graph Tags:** For social media sharing
- **JSON-LD:** Structured data for search engines
- **Related Posts:** Based on tag matching
- **Locale Prioritization:** Shows user's preferred locale first
- **Date Formatting:** Locale-aware (tr-TR for Turkish, en-US for English)

## Common Mistakes to Avoid

1. ❌ **Missing required fields** - Always include title, description, date, tags, locale
2. ❌ **Invalid date format** - Must be YYYY-MM-DD
3. ❌ **Empty tags array** - Include at least one tag
4. ❌ **Inconsistent slug naming** - Use lowercase with hyphens
5. ❌ **Broken bilingual links** - Ensure both posts reference each other correctly
6. ❌ **Missing locale field** - Always specify locale explicitly
7. ❌ **Description too long/short** - Aim for 150-160 characters

## Verification Checklist

After creating a blog post, verify:

- [ ] File is in `content/blog/` directory
- [ ] Filename follows slug convention (`{slug}.mdx`)
- [ ] Frontmatter includes all required fields
- [ ] Date is in YYYY-MM-DD format
- [ ] Tags array has at least one tag
- [ ] Locale is explicitly set ("en" or "tr")
- [ ] Content uses proper Markdown syntax
- [ ] If bilingual, both posts link to each other
- [ ] Post appears in blog list at `/blog`
- [ ] Post is accessible at `/blog/{slug}`
- [ ] Reading time is calculated correctly
- [ ] Tags display properly
- [ ] Language switcher appears (if bilingual)

## Questions to Ask User

If the request is ambiguous, ask:

1. What is the title of the blog post?
2. What is the publication date? (or use today's date)
3. What tags should be used?
4. Is this a single-locale post (English or Turkish) or bilingual?
5. If bilingual, what should the slug be for the alternate language version?
6. What is the SEO description? (or generate from content)
