"use client";

import { useEffect, useState } from "react";
import { IBrand } from "@/types/brand.type";
import { getBrands } from "@/lib/services/brand";
import BrandCard from "./BrandCard";


export default function BrandsGrid() {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await getBrands(1, 40); // أول صفحة 40 brand
        if (mounted) setBrands(res.data);
      } catch (err: any) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse space-y-2">
            <div className="w-full h-40 bg-zinc-200 rounded-lg" />
            <div className="h-4 bg-zinc-200 rounded w-3/4 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {brands.map((brand) => (
        <BrandCard key={brand._id} brand={brand} />
      ))}
    </div>
  );
}
