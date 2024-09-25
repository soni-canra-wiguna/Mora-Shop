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
