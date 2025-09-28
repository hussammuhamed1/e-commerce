

"use server";

import { getToken } from "./token";

export async function getWishlist() {
  const token = await getToken();
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "GET",

    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();
  return data;
}
export async function addToWishlist(id:string) {
  const token = await getToken();
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",

    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
    }),
  });

  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();
  return data;

}
export async function removeFromWishlist(id: string) {
  const token = await getToken();
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {
      method: "DELETE",

      headers: {
        token,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();
  return data;
}