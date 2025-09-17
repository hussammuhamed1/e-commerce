import { BrandApiResponse } from "@/types/brand.type";

export async function getBrands(page: number = 1, limit: number = 40): Promise<BrandApiResponse> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}