"use client"

import { getCart } from "@/lib/services/cart"
import { useSession } from "next-auth/react"
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface CartContextType {
  getCartData: () => Promise<void>
  cart: any
  cartcount: number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export default function CartContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<any>({})
  const [cartcount, setCartcount] = useState(0)

const { data } = useSession();

const getCartData = async () => {
  try {
    if (!data?.token) return;
    const cart = await getCart(data.token); // Pass token here
    setCart(cart);
    setCartcount(cart?.numOfCartItems || 0);
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};

  useEffect(() => {
    if (data?.user) {
      getCartData()
    }
  }, [data?.user])

  const value: CartContextType = { getCartData, cart, cartcount }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used inside CartContextProvider")
  }
  return context
}
