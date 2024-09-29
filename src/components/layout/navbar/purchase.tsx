"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getUser } from "@/services/user/get-user"
import { useAuth } from "@clerk/nextjs"
import { Bell, Loader2 } from "lucide-react"
import { id } from "date-fns/locale"
import { format } from "date-fns"

export const PurchaseNotification = () => {
  const { userId } = useAuth()
  const { data, isPending, isError } = getUser({
    userId: userId!,
  })
  return (
    <Popover>
      <PopoverTrigger>
        <Bell className="size-6" />
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="">
          <h3 className="text-lg font-bold capitalize">Pembelian produk</h3>
        </div>
        {isPending ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : (
          <div className="flex max-h-[500px] flex-col overflow-y-auto">
            {data?.purchases?.map((purchase) => (
              <div className="flex flex-col gap-2 border-b-2 px-2 py-4">
                <span className="font-semibold">{purchase.product.name}</span>
                <span className="text-sm">harga : {purchase.goldSpent} 🪙</span>
                <span className="text-sm">
                  tanggal : {format(purchase.createdAt, "dd LLL yyyy")}
                </span>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
