import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!adminEmail || !adminPassword) {
          return null
        }
        const email = credentials?.email as string | undefined
        const password = credentials?.password as string | undefined
        if (!email || !password) {
          return null
        }
        if (email === adminEmail && password === adminPassword) {
          return {
            id: 'admin',
            email: adminEmail,
            name: 'Admin',
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
})
