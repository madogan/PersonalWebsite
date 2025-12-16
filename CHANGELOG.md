# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

