import Image from "next/image";
import { IBrand } from "@/types/brand.type";

export default function BrandCard({ brand }: { brand: IBrand }) {
  return (
    <div className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="relative w-full h-40 bg-zinc-100 flex items-center justify-center">
        <Image
          src={brand.image}
          alt={brand.name}
          width={160}
          height={160}
          className="object-contain"
        />
      </div>
      <div className="p-3 text-center">
        <h3 className="text-sm font-medium">{brand.name}</h3>
      </div>
    </div>
  );
}
