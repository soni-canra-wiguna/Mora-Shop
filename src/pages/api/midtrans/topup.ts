import { getAuth } from "@clerk/nextjs/server"
import type { NextApiRequest, NextApiResponse } from "next"
// @ts-ignore
import MidtransClient from "midtrans-client"
import { env } from "@/env"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { productId, productName, email, price, quantity, userId } = req.body
    // const { userId } = getAuth(req)

    // if (!userId) {
    //   return res.status(401).json({ message: "User not authenticated" })
    // }

    let snap = new MidtransClient.Snap({
      isProduction: false,
      serverKey: env.MIDTRANS_SERVER_KEY,
      clientKey: env.MIDTRANS_CLIENT_KEY,
    })

    try {
      const transactionToken = await snap.createTransactionToken({
        transaction_details: {
          order_id: `ORDER-${Date.now()}`, // Buat order_id yang unik
          gross_amount: price * 1000,
        },
        item_details: [
          {
            id: productId,
            price: price,
            quantity: quantity,
            name: productName,
          },
        ],
        customer_id: {
          user_id: userId,
          email: email,
        },
      })

      res.status(201).json({ token: transactionToken })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error creating transaction" })
    }
  }
}
