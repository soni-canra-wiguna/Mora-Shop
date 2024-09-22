import { NextApiRequest, NextApiResponse } from "next"
// @ts-ignore
import midtransClient from "midtrans-client"
import { db } from "@/server/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { order_id, transaction_status } = req.body

    console.log(req.body)

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    })

    try {
      // cek transaksi berdasarkan order id
      const statusResponse = await snap.transaction.status(order_id)

      // if (statusResponse.transaction.status === "settlement") {
      if (transaction_status === "settlement") {
        // transaction success
        const goldAmount = statusResponse.gross_amount / 1000
        const userId = statusResponse.oder_id.split("-")[1]

        // tambahkan user gold
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
        res.status(200).json({ message: "Gold updated successfully" })
      } else {
        res.status(400).json({ message: "Transaction not completed" })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error processing notification" })
    }
  }
}
