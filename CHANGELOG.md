# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

