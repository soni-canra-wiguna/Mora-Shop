import { Product } from '@prisma/client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const GetProducts = () => {
  const { data, isPending, isError } = useQuery<Product[]>({
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
