export const siteConfig = {
  name: 'Personal Website',
  description: 'Personal website with blog and resume',
  url: 'https://example.com',
  author: 'Your Name',
  links: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
}

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

