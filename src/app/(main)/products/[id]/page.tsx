import { getProductsDetails } from "@/lib/services/product"
import ProductDetails from "../_components/ProductDetails"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const data = await getProductsDetails(params.id)

  if (!data) {
    return notFound()
  }

  return <ProductDetails product={data} />
}
