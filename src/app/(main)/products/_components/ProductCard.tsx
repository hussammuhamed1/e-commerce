"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";
import Image from "next/image";
import { IProduct } from "@/types/product.type";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { addToCart } from "@/lib/services/cart";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/lib/services/wishlist";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: IProduct }) {
  const [liked, setLiked] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const { data: session } = useSession();
  const token = session?.token;

  // preload liked state
  useEffect(() => {
    if (!token) return;
    const checkWishlist = async () => {
      try {
        const wishlist = await getWishlist();

        // normalize API response: could be { products: [] } or { data: [] }
        const items = wishlist.products || wishlist.data || [];

        const isLiked = items.some(
          (p: any) => p._id === product._id || p.id === product._id
        );

        setLiked(isLiked);
      } catch (err) {
        console.error(err);
      }
    };
    checkWishlist();
  }, [token, product._id]);

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      await addToCart(product._id, token);
      toast.success(`${product.title} added to cart`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart");
    }
  };

  const handleWishlist = async () => {
    if (!token) {
      toast.error("Please login first to use wishlist");
      return;
    }

    setLoadingWishlist(true);

    // Optimistically update UI
    setLiked((prev) => !prev);

    try {
      if (!liked) {
        const res = await addToWishlist(product._id);
        if (res.error) {
          toast.error(res.error);
          setLiked(false); // rollback
        } else {
          toast.success("Added to wishlist!");
        }
      } else {
        const res = await removeFromWishlist(product._id);
        if (res.error) {
          toast.error(res.error);
          setLiked(true); // rollback
        } else {
          toast.info("Removed from wishlist!");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      setLiked((prev) => !prev); // rollback if failed
    }

    setLoadingWishlist(false);
  };

  return (
    <Card className="group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition">
      {/* Product Image */}
      <div className="relative w-full h-100">
        <Image
          src={product.imageCover}
          alt={product.description}
          fill
          className="object-cover group-hover:scale-105 transition"
        />

        {/* Wishlist Heart */}
        <Button
          onClick={handleWishlist}
          disabled={loadingWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
        >
          <Heart
            className={`h-5 w-5 transition ${
              liked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </Button>
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-2">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold truncate">{product.title}</h3>
        </Link>

        <p className="text-green-500 font-bold">{product.brand.name}</p>
        <p className="text-primary font-bold">{product.price} EGP</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.round(product.ratingsAverage)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-sm text-gray-500">
            ({product.ratingsAverage})
          </span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Button
          className="w-full flex justify-center items-center rounded-2xl"
          onClick={handleAddToCart}
        >
          Add to cart
          <ShoppingCart className="h-5 w-5 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
