import type { NextApiRequest, NextApiResponse } from "next"
// @ts-ignore
import MidtransClient from "midtrans-client"
import { env } from "@/env"
import { z } from "zod"

export const TransactionSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  productName: z.string().min(1, "Product Name is required"),
  email: z.string().email("Invalid email format"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().positive("Quantity must be a positive number"),
  userId: z.string().min(1, "User ID is required"),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { productId, productName, email, price, quantity, userId } = req.body

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" })
    }

    let snap = new MidtransClient.Snap({
      isProduction: false,
      serverKey: env.MIDTRANS_SERVER_KEY,
      clientKey: env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    })

    try {
      const transactionToken = await snap.createTransactionToken({
        transaction_details: {
          order_id: `ORDER-${Date.now()}`,
          gross_amount: price,
        },
        // item_details: [
        //   {
        //     id: productId,
        //     price: price,
        //     quantity: quantity,
        //     name: productName,
        //   },
        // ],
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
