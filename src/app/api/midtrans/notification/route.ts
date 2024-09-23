import { NextRequest, NextResponse } from "next/server"
import midtransClient from "midtrans-client"
import { db } from "@/server/db"

export const POST = async (req: NextRequest) => {
  if (req.method === "POST") {
    const { order_id, transaction_status } = await req.json()

    console.log("[ORDER-ID] : ", order_id)
    console.log("[TRANSACTION-STATUS] : ", transaction_status)

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    })

    try {
      // cek transaksi berdasarkan order id
      const statusResponse = await snap.transaction.status(order_id)

      console.log("[STATUS RESPONSE] : ", statusResponse)

      const [prefix, quantity, userId, productId] =
        statusResponse.order_id.split("-")

      if (transaction_status === "settlement" || "capture") {
        console.log("PAID")
        // // which is success
        // const goldAmount = parseInt(quantity)

        // // add user gold
        // await db.user.update({
        //   where: {
        //     clerkId: userId,
        //   },
        //   data: {
        //     gold: {
        //       increment: goldAmount,
        //     },
        //   },
        // })
        return NextResponse.json({ message: "Gold updated successfully" })
      } else {
        return NextResponse.json({ message: "Transaction not completed" })
      }
    } catch (error) {
      console.error(error)
      return NextResponse.json({ message: "Error processing notification" })
    }
  }
}
