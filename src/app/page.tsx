import Image from "next/image";
import MainSlider from "./_components/ui/Mainslider";
import { getProducts } from "@/lib/services/product";
import ProductCard from "./(main)/products/_components/ProductCard";
import { IProduct } from "@/types/product.type";

export default async function Home() {
  const data = await getProducts();

  return (
    <>
      <main className="overflow-hidden">
        <MainSlider />
      </main>

      <section>
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((p: IProduct) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
