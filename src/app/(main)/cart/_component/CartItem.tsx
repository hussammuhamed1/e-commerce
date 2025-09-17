"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useCart } from "@/context/CartContext"
import { removeFromCart } from "@/lib/services/cart"
import { useSession } from "next-auth/react"

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    quantity: number
    color?: string
    size?: string
    image?: string
  }
}

export default function CartItem({ item }: CartItemProps) {
  const { getCartData } = useCart();
const { data: session } = useSession();
const token = session?.token;

const handleRemove = async () => {
  try {
    toast.info("Removing item...");
    await removeFromCart(item.id, token!); 
    toast.success("Item removed successfully");
    await getCartData();
  } catch (error) {
    toast.error("Failed to remove item");
  }
};

  return (
    <div className="flex items-center justify-between border-b py-3">
      <div className="flex items-center gap-4">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
            className="rounded"
          />
        )}
        <div>
          <h2 className="font-semibold">{item.name}</h2>
          <p className="text-gray-600">{item.price}EGP</p>
          {item.color && <p className="text-sm">Color: {item.color}</p>}
          {item.size && <p className="text-sm">Size: {item.size}</p>}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p>{item.quantity}x</p>
        <p className="font-semibold">{item.price * item.quantity}EGP</p>
        <Button variant="destructive" onClick={handleRemove}>
          Remove
        </Button>
      </div>
    </div>
  )
}
