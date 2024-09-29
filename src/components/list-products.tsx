"use client"

import { GetProducts } from "@/services/product/get-product"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useAuth } from "@clerk/nextjs"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface ItemProductProps {
  id?: string
  name: string
  image: string
  priceInGold: number
}

export const ItemProduct = ({
  name,
  image,
  priceInGold,
  id,
}: ItemProductProps) => {
  const { userId } = useAuth()
  const queryClient = useQueryClient()

  const data = {
    goldSpent: priceInGold,
    userId: userId ?? "",
    productId: id ?? "",
  }

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/purchase`, data)
    },
    onSuccess: () => {
      toast({
        title: "Berhasil di beli",
        description: "Produk berhasil di beli",
      })
      queryClient.invalidateQueries({ queryKey: ["user"] })
      queryClient.invalidateQueries({ queryKey: ["purchases"] })
    },
    onError: () => {
      toast({
        title: "Gagal membeli produk, Coba lagi.",
        description: "Produk gagal di beli",
        variant: "destructive",
      })
    },
  })

  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="aspect-square w-full overflow-hidden rounded-md border-2 border-border">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <Button
        disabled={isPending}
        size="lg"
        variant="neutral"
        onClick={() => mutate()}
      >
        {isPending ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <img src="/coin.png" alt="coin" className="mr-2 size-5" />
        )}
        <span className="font-semibold">{priceInGold} Gold</span>
      </Button>
    </Card>
  )
}

export const ListProducts = () => {
  const { data, isPending, isError } = GetProducts()
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
