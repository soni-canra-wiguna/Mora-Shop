"use client"

import { Button } from "./ui/button"
import { Card } from "./ui/card"

interface ItemProductProps {
  id?: string
  name: string
  image: string
  priceInGold: number
}

export const ItemProduct = ({ name, image, priceInGold }: ItemProductProps) => {
  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="aspect-square w-full overflow-hidden rounded-md border-2 border-border">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <Button size="lg" variant="neutral">
        <img src="/coin.png" alt="coin" className="mr-2 size-5" />
        <span className="font-semibold">{priceInGold} Gold</span>
      </Button>
    </Card>
  )
}

export const ListProducts = () => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* {isPending ? (
        <div>loading...</div>
      ) : (
        data?.map((product) => {
          return <ItemProduct {...product} key={product.id} />
        })
      )} */}
    </div>
  )
}
