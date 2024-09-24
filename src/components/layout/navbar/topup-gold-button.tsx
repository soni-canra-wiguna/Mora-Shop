import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import Link from "next/link"

export const TopupGoldButton = () => {
  return (
    <Link href="/topup">
      <Button className="h-fit p-2" variant="neutral">
        <div className="flex items-center gap-2">
          <img src="/coin.png" className="size-4" />
          <span className="pr-4">100</span>
        </div>
        <Separator orientation="vertical" />
        <Plus className="size-4" />
      </Button>
    </Link>
  )
}
