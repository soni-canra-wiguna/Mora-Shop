import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

/*
  payload req.json()
  https://docs.midtrans.com/docs/https-notification-webhooks
*/

export const POST = async (req: NextRequest) => {
  const { order_id, transaction_status } = await req.json()
  const [prefix, quantity, userId, productId, date] = order_id.split("-")

  console.log("[ORDER-ID] : ", order_id)
  console.log("[TRANSACTION-STATUS] : ", transaction_status)

  try {
    if (
      transaction_status === "settlement" ||
      transaction_status === "capture"
    ) {
      const goldAmount = parseInt(quantity)

      await db.user.update({
        where: {
          clerkId: userId,
        },
        data: {
          gold: {
            increment: goldAmount,
          },
        },
      })
      return NextResponse.json({ message: "Gold updated successfully" })
    } else {
      return NextResponse.json({ message: "Transaction not completed" })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Error processing notification" })
  }
}
