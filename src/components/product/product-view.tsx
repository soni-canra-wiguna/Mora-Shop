"use client"

import { ItemProduct } from "@/components/list-products"
import { api } from "@/trpc/react"

export const ProductView = () => {
  const { data, isPending, isError } = api.product.getProducts.useQuery()
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {isPending ? (
        <div>loading...</div>
      ) : (
        data?.map((product) => {
          return <ItemProduct {...product} key={product.id} />
        })
      )}
    </div>
  )
}
