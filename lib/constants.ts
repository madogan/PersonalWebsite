export const VERSION = '0.2.2'

export const siteConfig = {
  name: 'Personal Website',
  description: 'Personal website with blog and resume',
  url: 'https://example.com',
  author: 'Your Name',
  links: {
    github: 'https://github.com/madogan',
    linkedin: 'https://www.linkedin.com/in/madogan',
  },
}

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

