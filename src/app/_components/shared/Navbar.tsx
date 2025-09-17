"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, LogIn, LogOut } from "lucide-react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useCart } from "@/context/CartContext"

export default function Navbar() {

const handledata=()=>{
 const  getCartdata = useCart();
}

  const [mobileOpen, setMobileOpen] = useState(false)


  const { data: session, status } = useSession()
  const {cartcount} = useCart();

  return (
    <header className="w-full border-b shadow-sm bg-white relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          My<span className="text-primary">Shop</span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex gap-6 font-medium">
          <Link href="/" className="hover:text-primary transition">
            Shop
          </Link>
          <Link href="/categories" className="hover:text-primary transition">
            Categories
          </Link>
          <Link href="/brands" className="hover:text-primary transition">
            Brands
          </Link>
          <Link href="/wishlist" className="hover:text-primary transition">
            Wishlist
          </Link>
        </nav>

        {/* Icons + Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {/* Auth Buttons */}
          {status === "loading" && (
            <span className="text-gray-500">Loading...</span>
          )}

          {status === "unauthenticated" && (
            <Link href="/auth/login">
              <Button variant="default">
                Login <LogIn className="h-5 w-5 ml-1" />
              </Button>
            </Link>
          )}

          {status === "authenticated" && (
            <>
                
              <Button
                variant="destructive"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout <LogOut className="h-5 w-5 ml-1" />
              </Button>
            </>
          )}

          {/* Cart */}
          <Link href="/cart" className="relative">
            <Button onClick={handledata} variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {  (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs px-1.5 rounded-full">
                  {cartcount}
                </span>
              )}
            </Button>
          </Link>
          

          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="absolute top-full left-0 w-full bg-white border-t flex flex-col gap-4 p-4 md:hidden shadow">
          <Link href="/" className="hover:text-primary transition">
            Shop
          </Link>
          <Link href="/categories" className="hover:text-primary transition">
            Categories
          </Link>
          <Link href="/brands" className="hover:text-primary transition">
            Brands
          </Link>
          <Link href="/wishlist" className="hover:text-primary transition">
            Wishlist
          </Link>
        </nav>
      )}
    </header>
  )
}
