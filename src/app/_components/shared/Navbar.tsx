"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Search, Menu, X, LogIn } from "lucide-react"

export default function Navbar() {
    const [search, setSearch] = useState("")
    const [mobileOpen, setMobileOpen] = useState(false)
    const [cartCount, setCartCount] = useState(0)

    return (
        <header className="w-full border-b shadow-sm bg-white relative z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold">
                    My<span className="text-primary">Shop</span>
                </Link>

                {/* Navigation Links (Desktop) */}
                <nav className="hidden md:flex gap-6 font-medium">
                    <Link href="/" className="hover:text-primary transition">Shop</Link>
                    <Link href="/categories" className="hover:text-primary transition">Categories</Link>
                    <Link href="/wishlist" className="hover:text-primary transition">Wishlist</Link>
                    <Link href="/brands" className="hover:text-primary transition">Brands</Link>
                </nav>

                {/* Search Bar (Desktop) */}

                {/* Icons + Mobile Menu Toggle */}
                <div className="flex items-center gap-3">
                    <Link href="/auth/login">
                        <Button variant="ghost" size="default">

                            Log In<LogIn className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div className="mx-3"></div>
                    <Link href="/cart" className="relative">

                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5 " />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs px-1.5 rounded-full">
                                    {cartCount}
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
                    <Link href="/" className="hover:text-primary transition">Shop</Link>
                    <Link href="/categories" className="hover:text-primary transition">Categories</Link>
                    <Link href="/wishlist" className="hover:text-primary transition">Wishlist</Link>
                    <Link href="/brands" className="hover:text-primary transition">Brands</Link>


                </nav>
            )}
        </header>
    )
}
