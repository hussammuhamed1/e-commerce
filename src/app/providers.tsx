"use client"

import CartContextProvider from "@/context/CartContext"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>
    
    
   <CartContextProvider> {children}</CartContextProvider>
    
    </SessionProvider>
}
