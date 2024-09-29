import { useAuth } from "@clerk/nextjs"
import { Product, Purchase } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface ProductsResponseProps extends Product {
  purchase: Purchase[]
}

export const GetProducts = () => {
  const { data, isPending, isError } = useQuery<ProductsResponseProps[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("/api/products")
      return data.data
    },
  })

  return {
    data,
    isPending,
    isError,
  }
}

export const getPurchaseProducts = () => {
  const { userId } = useAuth()
  const { data, isPending, isError } = useQuery<ProductsResponseProps[]>({
    queryKey: ["purchaseProducts"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/products?userId=${userId}`)
      return data.data
    },
    enabled: !!userId,
  })

  return {
    data,
    isPending,
    isError,
  }
}
