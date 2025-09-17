"use client"

import { Skeleton } from "@/components/ui/skeleton"



export default function CartSkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {/* Repeat skeleton items */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between border-b py-3">
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-6" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      ))}

      {/* Footer skeleton */}
      <div className="flex justify-between items-center mt-6">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-28 rounded-md" />
      </div>
    </div>
  )
}
