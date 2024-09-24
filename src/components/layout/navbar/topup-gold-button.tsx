"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { api } from "@/trpc/react"
import { useAuth, useUser } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import Link from "next/link"

export const TopupGoldButton = () => {
  const { userId } = useAuth()
  const { isSignedIn } = useUser()
  const { data, isPending } = api.user.getUser.useQuery(userId!, {
    refetchInterval: 60000,
  })

  return (
    <Link href="/topup">
      <Button className="h-fit p-2" variant="neutral">
        <div className="flex items-center gap-2">
          <img src="/coin.png" className="size-4" />
          {!isSignedIn ? (
            <span className="pr-4">0</span>
          ) : (
            <span className="pr-4">{isPending ? "..." : data?.gold}</span>
          )}
        </div>
        <Separator orientation="vertical" />
        <Plus className="size-4" />
      </Button>
    </Link>
  )
}
