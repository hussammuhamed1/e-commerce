"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold">MyShop</h2>
            
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-800">
              Quick Links
            </h3>
            <Link href="/" className="text-zinc-600 hover:text-zinc-900">
              Home
            </Link>
            <Link href="/categories" className="text-zinc-600 hover:text-zinc-900">
              Categories
            </Link>
            <Link href="/brands" className="text-zinc-600 hover:text-zinc-900">
              Brands
            </Link>
            <Link href="/wishlist" className="text-zinc-600 hover:text-zinc-900">
              Wishlist
            </Link>
          </div>
          

          {/* Socials */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-800">
              Follow Us
            </h3>
            <div className="flex mt-3 space-x-4">
              <Link href="https://facebook.com" target="_blank">
                <Facebook className="h-5 w-5 text-zinc-600 hover:text-zinc-900" />
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <Twitter className="h-5 w-5 text-zinc-600 hover:text-zinc-900" />
              </Link>
              <Link href="https://instagram.com" target="_blank">
                <Instagram className="h-5 w-5 text-zinc-600 hover:text-zinc-900" />
              </Link>
              <Link href="https://github.com" target="_blank">
                <Github className="h-5 w-5 text-zinc-600 hover:text-zinc-900" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} MyShop. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-zinc-800">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-800">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
