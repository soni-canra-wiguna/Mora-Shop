import { Purchase, User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export interface GetUserProps {
  userId: string
  refetchInterval?: number
}

interface UserResponseProps extends User {
  purchase: Purchase[]
}

export const getUser = ({ userId, refetchInterval = 60000 }: GetUserProps) => {
  const { data, isPending, isError } = useQuery<UserResponseProps>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/users/${userId}`)
      return data.data
    },
    refetchInterval,
    enabled: !!userId, // Disable the query if userId is undefined
  })

  return {
    data,
    isPending,
    isError,
  }
}
