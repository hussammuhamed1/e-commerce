// "use server";

import { AnyARecord } from "node:dns";
import { getUserToken } from "../server-utilits";

export async function getCart(token: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers: { token },
  });

  if (!res.ok) throw new Error("Failed to fetch cart");
  const result = await res.json();
  return result;
}

export async function addToCart(productId: string, token: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
}

export async function removeFromCart(productId: string, token: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "DELETE",
      headers: { token },
    }
  );

  if (!res.ok) throw new Error("Failed to remove item from cart");
  return res.json();
}

export async function clearCart( token: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/`,
    {
      method: "DELETE",
      headers: { token },
    }
  );


  if (!res.ok) throw new Error("Failed to remove item from cart");
  return res.json();
}

export async function checkOutCOD (token : string, cartId: string , data : any) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: "POST",
      headers: { token },
      body: JSON.stringify(data)
    }
  );


  if (!res.ok) throw new Error("Failed to remove item from cart");
  return res.json();
}
