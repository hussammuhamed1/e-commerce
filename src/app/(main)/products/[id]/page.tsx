
import { getProductsDetails } from "@/lib/services/product"
import ProductDetails from "../_components/ProductDetails"

export default async function ProductPage({ params }: { params: { id: string } }) {
   const data = await getProductsDetails(params.id)


  return (
    <ProductDetails product={data}/>
  )
}
