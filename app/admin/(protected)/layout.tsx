import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/auth'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) {
    redirect('/admin/login')
  }

  const navItems = [
    { href: '/admin/hero-summary', label: 'Hero & Summary' },
    { href: '/admin/resume', label: 'Resume' },
    { href: '/admin/certifications', label: 'Certifications' },
    { href: '/admin/blogs', label: 'Blogs' },
    { href: '/admin/blog-prompts', label: 'Blog prompts' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-notebook-divider bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-4">
            <Link
              href="/admin"
              className="text-sm font-medium text-foreground hover:text-accent"
            >
              Admin
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-sm text-foreground/70">{session.user.email}</span>
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/admin/login' })
              }}
              className="flex items-center"
            >
              <button
                type="submit"
                className="rounded-md border border-notebook-divider px-3 py-1.5 text-sm text-foreground hover:bg-foreground/5"
              >
                Sign out
              </button>
            </form>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
