"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import CartItem from "./_component/CartItem"
import CartSkeleton from "./_component/cartSkeleton"
import { toast } from "sonner"
import { checkOutCOD, clearCart } from "@/lib/services/cart"
import { useSession } from "next-auth/react"
import { Form, FormProvider, useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import z, { check } from "zod"


const formSchema = z.object({
  details: z.string().min(2, { message: "Details must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  
});

export default function CartPage() {


  const form = useForm({
      resolver: zodResolver(formSchema),
     
    });
    async function onSubmit(values: z.infer<typeof formSchema>) 
    {
      
      const formdata = {"shippingAddress":values}
      checkOutCOD(token!, cart?.cartId! ,formdata);
        console.log("🚀 ~ onSubmit ~ res:", values );
    }
  const [loading] = useState(false)
  const { cart, cartcount, getCartData } = useCart()
  const { data: session } = useSession();
  
const token = session?.token;

  const handleClear = async () => {
    try {
      toast.info("Clearing cart...")
      await clearCart(token!);
      toast.success("Cart cleared successfully")
      await getCartData()
    } catch (error) {
      toast.error("Failed to clear cart")
    }
  }

  const subtotal =
    cart?.data?.products?.reduce(
      (acc: number, item: any) => acc + item.price * item.count,
      0
    ) || 0

  if (loading) return <CartSkeleton />

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cartcount === 0 ? (
        <>
          <h2 className="text-gray-600">Your cart is empty.</h2>
          <Link href="/">
            <Button className="mt-4">Go to Products</Button>
          </Link>
        </>
      ) : (
        <>
          {cart?.data?.products?.map((item: any) => (
            <CartItem
              key={item._id}
              item={{
                id: item._id,
                name: item.product.title,
                price: item.price,
                quantity: item.count,
                color: item.color,
                size: item.size,
                image: item.product.imageCover,
              }}
            />
          ))}

          <div className="flex justify-between items-center mt-6">
            <Button variant="outline" onClick={handleClear}>
              Clear Cart
            </Button>
            <h2 className="text-xl font-bold">Subtotal: {subtotal} EGP</h2>





          </div>
          <FormProvider {...form}>
  <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="space-y-8 w-60/100 md:w-50/100 lg:w-40/100 mx-auto my-40 p-11 rounded-2xl bg-zinc-100"
  >
    <FormField
      control={form.control}
      name="details"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Details</FormLabel>
          <FormControl>
            <Input placeholder="Enter your details" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Phone</FormLabel>
          <FormControl>
            <Input placeholder="Enter your phone" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <FormItem>
          <FormLabel>City</FormLabel>
          <FormControl>
            <Input placeholder="Enter your city" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Go To Checkout</Button>
           
  </form>
</FormProvider>
        </>
      )}
    </div>
  )
}
