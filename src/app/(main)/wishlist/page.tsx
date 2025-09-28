"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getWishlist, removeFromWishlist } from "@/lib/services/wishlist";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface WishlistProduct {
  _id: string;
  id?: string;
  title: string;
  price: number;
  imageCover: string;
}

export default function WishlistPage() {
  const { data: session } = useSession();
  const token = session?.token;

  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const data = await getWishlist();
        // normalize data (it could be { products: [] } or { data: [] })
        const items: WishlistProduct[] = data.products || data.data || [];
        setWishlist(items);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch wishlist");
      }
      setLoading(false);
    };
    fetchWishlist();
  }, [token]);

  const handleRemove = async (productId: string) => {
    if (!token) return;
    try {
      await removeFromWishlist(productId);
      toast.success("Removed from wishlist");
      setWishlist(
        wishlist.filter(
          (item) => item._id !== productId && item.id !== productId
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  if (!token) return <p>Please login to view your wishlist</p>;
  if (loading) return <p>Loading wishlist...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <>
          <h2 className="text-gray-600">Your wishlist is empty.</h2>
          <Link href="/">
            <Button className="mt-4">Go to Products</Button>
          </Link>
        </>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div
              key={item._id || item.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.imageCover}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded"
                />
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p>{item.price} EGP</p>
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={() => handleRemove(item._id || item.id!)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
