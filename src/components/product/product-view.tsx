"use client"

import { ItemProductProps } from "@/components/list-products"
import { GetProducts } from "@/services/product/get-product"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { Edit, Loader2, Trash } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "@/hooks/use-toast"

const DeleteProdut = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()
  const {
    mutate: deleteProduct,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async () => {
      await axios.delete(`/api/products/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast({
        description: "product was deleted!!",
      })
    },
    onError: () => {
      toast({
        description: "something went wrong, try again!!",
      })
    },
  })

  return (
    <Button onClick={() => deleteProduct()} size="icon" variant="neutral">
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Trash className="size-4" />
      )}
    </Button>
  )
}

const EditProduct = ({ id }: { id: string }) => {}

const Product = ({ image, name, id, priceInGold }: ItemProductProps) => {
  return (
    <Card className="flex flex-col gap-4">
      <CardContent className="aspect-square w-full overflow-hidden border-b-2 border-border p-0">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </CardContent>
      <CardFooter className="justify-between">
        <span>price : {priceInGold} 🪙</span>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="neutral">
            <Edit className="size-4" />
          </Button>
          <DeleteProdut id={id!} />
        </div>
      </CardFooter>
    </Card>
  )
}

export const ProductView = () => {
  const { data, isPending, isError } = GetProducts()
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {isPending ? (
        <div>loading...</div>
      ) : (
        data?.map((product) => {
          return <Product {...product} key={product.id} />
        })
      )}
    </div>
  )
}
