import { Button } from "./ui/button"
import { Card } from "./ui/card"

interface ItemProductProps {
  name: string
  image: string
  priceInGold: number
}

const ItemProduct = ({ name, image, priceInGold }: ItemProductProps) => {
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
  const listProducts = [
    {
      name: "something 1",
      image: "/alya.png",
      priceInGold: 10,
    },
    {
      name: "something 2",
      image: "/alya.png",
      priceInGold: 50,
    },
    {
      name: "something 3",
      image: "/alya.png",
      priceInGold: 30,
    },
    {
      name: "something 4",
      image: "/alya.png",
      priceInGold: 100,
    },
    {
      name: "something 5",
      image: "/alya.png",
      priceInGold: 50,
    },
    {
      name: "something 6",
      image: "/alya.png",
      priceInGold: 20,
    },
  ]

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {listProducts.map((product) => {
        return <ItemProduct {...product} key={product.name} />
      })}
    </div>
  )
}
