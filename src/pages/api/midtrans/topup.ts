import type { NextApiRequest, NextApiResponse } from "next"
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

export type MidtransDataType = z.infer<typeof TransactionSchema> & {
  first_name: string
  last_name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const {
      productId,
      productName,
      email,
      price,
      quantity,
      userId,
      first_name,
      last_name,
    }: MidtransDataType = req.body

    const orderId = `MS-${quantity}-${userId}-${productId}`
    const grossAmount = Number(price)

    let snap = new MidtransClient.Snap({
      isProduction: false,
      serverKey: env.MIDTRANS_SERVER_KEY,
      clientKey: env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    })

    try {
      const transactionToken = await snap.createTransactionToken({
        transaction_details: {
          order_id: orderId,
          gross_amount: grossAmount,
        },
        // item_details: [{
        //   id: productId,
        //   name: productName,
        //   price: price,
        //   quantity: quantity,
        // }],
        customer_details: {
          first_name,
          last_name,
          email,
        },
      })

      res.json({ token: transactionToken })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error creating transaction" })
    }
  }
}
