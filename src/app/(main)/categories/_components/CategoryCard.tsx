"use client";

import Image from "next/image";
import { ICategory } from "@/types/category.type";

export default function CategoryCard({ category }: { category: ICategory }) {
  return (
    <div className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="relative w-full h-40 bg-zinc-100">
        <Image
          src={category.image}
          alt={category.name}
          fill
         
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="px-4 py-3">
        <h3 className="text-sm md:text-base font-medium text-zinc-900 truncate">
          {category.name}
        </h3>
      </div>
    </div>
  );
}
