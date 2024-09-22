import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { formatToIDR } from "@/utils/format-to-idr"
import { useAuth, useUser } from "@clerk/nextjs"
import axios from "axios"
import { z } from "zod"
import { TransactionSchema } from "@/pages/api/midtrans/topup"

interface GoldItemProps {
  label: string
  image: string
  quantity: number
  price: number
  productId: string
}

type MidtransDataType = z.infer<typeof TransactionSchema>

const GoldItem = ({
  image,
  label,
  quantity,
  price,
  productId,
}: GoldItemProps) => {
  const { isSignedIn, user } = useUser()
  const { userId } = useAuth()

  const goldData: MidtransDataType = {
    productId,
    productName: label,
    email: user?.emailAddresses[0]?.emailAddress!,
    price,
    quantity,
    userId: userId!,
  }

  async function handlePayment() {
    if (isSignedIn) {
      const { data } = await axios.post(
        "/api/midtrans/topup",
        JSON.stringify(goldData),
      )

      // @ts-ignore
      window.snap.pay(data.token)
    } else {
      toast({
        title: "Anda Belum Login",
        description: "login terlebih dahulu untuk melakukan topup!",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="flex flex-col items-center gap-4 px-4 py-8">
      <img className="size-20 sm:size-28" src={image} alt={label} />
      <span className="text-lg font-semibold capitalize dark:text-darkText">
        {quantity} gold
      </span>
      <Button variant="neutral" onClick={handlePayment}>
        {formatToIDR(price)}
      </Button>
    </Card>
  )
}

export const ListTopup = () => {
  const topupItems = [
    {
      productId: "1",
      label: "10 gold",
      image: "/coins.png",
      quantity: 10,
      price: 10000,
    },
    {
      productId: "2",
      label: "50 gold",
      image: "/coins.png",
      quantity: 50,
      price: 50000,
    },
    {
      productId: "3",
      label: "100 gold",
      image: "/coins.png",
      quantity: 100,
      price: 100000,
    },
    {
      productId: "4",
      label: "300 gold",
      image: "/coins.png",
      quantity: 300,
      price: 300000,
    },
    {
      productId: "5",
      label: "600 gold",
      image: "/coins.png",
      quantity: 600,
      price: 600000,
    },
    {
      productId: "6",
      label: "1000 gold",
      image: "/coins.png",
      quantity: 1000,
      price: 1000000,
    },
  ]

  return (
    <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
      {topupItems.map((item) => {
        return <GoldItem {...item} key={item.label} />
      })}
    </div>
  )
}
