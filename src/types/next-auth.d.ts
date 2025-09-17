import NextAuth, { DefaultSession } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      role?: string
      name?: string
      email?: string
    } & DefaultSession["user"]
    token?: string
  }

  interface User {
    role?: string
    name?: string
    email?: string
    token?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user?: {
      role?: string
      name?: string
      email?: string
    }
    token?: string
  }
}
