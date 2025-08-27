"use client"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { IProduct } from "@/types/product.type"
import { ShoppingCart, Star } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import Slider from "react-slick"

export default async function ProductDetails({ product }: { product: IProduct }) {
  const settings = {

    dots: true,
    dotsClass: "slick-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }





  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Image */}
        <div className="slider-container pb-4">
          <Slider {...settings} >
            <div className=''>
              <img src={product.images[0]} />
            </div>
            <div>
              <img src={product.images[1]} />
            </div>
            <div>
              <img src={product.images[2]} />
            </div>
            <div>
              <img src={product.images[3]} />
            </div>
          </Slider>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between">
          <CardContent className="p-4 space-y-2">
            <Link href={`/products/${product._id}`}>
              <h3 className="text-lg font-semibold truncate">{product.title}</h3>
            </Link>

            <p className="text-green-500 font-bold">{product.brand.name}</p>
            <p className="text-primary font-bold">${product.price}</p>

            {/* Rating */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(product.ratingsAverage)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                    }`}
                />
              ))}
              <span className="ml-1 text-sm text-gray-500">
                ({product.ratingsAverage})
                ({product.ratingsQuantity} reviews)
              </span>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <Button className="w-full flex justify-center items-center rounded-2xl">
              Add to cart
              <ShoppingCart className="h-5 w-5 ml-2" />
            </Button>
          </CardFooter>
        </div>
      </div>
    </div>
  )
}
