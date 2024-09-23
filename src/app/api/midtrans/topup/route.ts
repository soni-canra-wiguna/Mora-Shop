import { NextRequest, NextResponse } from "next/server"
import MidtransClient from "midtrans-client"
import { z } from "zod"

export const POST = async (req: NextRequest) => {
  try {
    // Langsung validasi data dari `req.body`
    const request = await req.json()

    const { productId, productName, email, price, quantity, userId } = request

    // Midtrans setup & transaction logic goes here...
    let snap = new MidtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    })

    const grossAmount = price
    const orderId = `MS-${quantity}-${userId}-${productId}`

    const transactionToken = await snap.createTransactionToken({
      transaction_details: {
        order_id: orderId, // Buat order_id yang unik
        gross_amount: grossAmount,
      },
      // error in here
      // item_details: [
      //   {
      //     id: productId,
      //     price: price,
      //     quantity: quantity,
      //     name: productName,
      //   },
      // ],
      customer_details: {
        user_id: userId,
        email: email,
      },
    })

    return NextResponse.json({ token: transactionToken })
  } catch (error) {
    console.error("Error creating transaction:", error)
    if (error instanceof z.ZodError) {
      // Tampilkan error yang terjadi saat validasi schema
      return NextResponse.json({
        message: "Validation failed",
        issues: error.errors,
      })
    } else {
      return NextResponse.json({ message: "Error creating transaction" })
    }
  }
}
