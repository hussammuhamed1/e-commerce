import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import jwt from "jsonwebtoken";

export const authOption: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/auth/signin`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const data = await res.json();
        console.log("API response:", data);

        if (res.ok && data?.token && data?.user) {
        

          return {
            id: "55" , user: data.user, token: data.token
          };
        }

        throw new Error(data?.message || "Login failed");
      },
    }),
  ],
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.user = {
        role: user.role,
        name: user.name,
        email: user.email,
      }
      token.token = user.token ?? undefined
    }
    return token
  },

  async session({ session, token }) {
    if (token.user) {
      session.user = token.user
    }
    if (token.token) {
      session.token = token.token
    }
    return session
  },
}


};
