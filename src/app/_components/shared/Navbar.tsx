"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Search } from "lucide-react"

export default function Navbar() {
    const [search, setSearch] = useState("")

    return (
        <header className="w-full border-b shadow-sm bg-white">
            <div className="container mx-auto flex items-center justify-between py-3 px-4">

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold">
                    Shop<span className="text-primary">Mate</span>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex gap-6 font-medium">
                    <Link href="/shop" className="hover:text-primary transition">Shop</Link>
                    <Link href="/men" className="hover:text-primary transition">Men</Link>
                    <Link href="/women" className="hover:text-primary transition">Women</Link>
                    <Link href="/kids" className="hover:text-primary transition">Kids</Link>
                    <Link href="/deals" className="hover:text-primary transition">Deals</Link>
                </nav>

                {/* Search Bar */}
                <div className="hidden md:flex items-center w-1/3 relative">
                    <Input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pr-10"
                    />
                    <Search className="absolute right-3 text-gray-400" size={18} />
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="relative">
                        <ShoppingCart className="h-5 w-5" />
                        {/* Badge */}
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs px-1.5 rounded-full">
                            2
                        </span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
