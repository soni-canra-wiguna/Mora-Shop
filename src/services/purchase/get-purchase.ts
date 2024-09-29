import { Product, Purchase } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { GetUserProps } from '../user/get-user'

export interface PurchaseProps extends Purchase {
  product: Product
}

export const getPurchases = ({ userId, refetchInterval = 60000 }: GetUserProps) => {
  const { data, isPending, isError } = useQuery<PurchaseProps[]>({
    queryKey: ["purchases"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/purchase?userId=${userId}`)
      return data.data
    },
    refetchInterval,
    enabled: !!userId,
  })

  return {
    data,
    isPending,
    isError,
  }
}
