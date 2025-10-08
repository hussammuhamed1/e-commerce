import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

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
        try {
          
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.endsWith("/")
            ? process.env.NEXT_PUBLIC_API_BASE_URL
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}/`;

          const res = await fetch(`${baseUrl}api/v1/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data = await res.json();
          console.log(" API response:", data);

          if (!res.ok) {
            console.error(" API error:", data);
            throw new Error(data?.message || "Invalid response from API");
          }

          
          if (data?.token && data?.user) {
            return {
              id: data.user._id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              token: data.token,
            };
          }

          throw new Error("Login failed: Missing user or token");
        } catch (err) {
          console.error(" Authorize error:", err);
          throw new Error("Authorization failed");
        }
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
          
        };
        token.token = user.token;
      }
      return token;
    },

     async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      if (token.token) {
        session.token = token.token;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
