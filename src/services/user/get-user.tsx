import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export interface GetUserProps {
  userId: string
  refetchInterval?: number
}

export const getUser = ({ userId, refetchInterval = 60000 }: GetUserProps) => {
  const { data, isPending, isError } = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/users/${userId}`)
      return data.data
    },
    refetchInterval,
  })

  return {
    data,
    isPending,
    isError,
  }
}
