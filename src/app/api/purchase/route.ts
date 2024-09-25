import { db } from "@/lib/db"
import { Validation } from "@/schema/validation"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const updateGoldAndCreatePurchaseSchema = z.object({
  goldSpent: z.number().positive(),
  userId: z.string(),
  productId: z.string(),
})

export const POST = async (req: NextRequest) => {
  try {
    const request: z.infer<typeof updateGoldAndCreatePurchaseSchema> =
      await req.json()
    const { userId, productId, goldSpent } = Validation.validate(
      updateGoldAndCreatePurchaseSchema,
      request,
    )

    const user = await db.user.findUnique({
      where: { userId: userId },
    })
    const product = await db.product.findUnique({
      where: { id: productId },
    })

    if (!user || !product) {
      return NextResponse.json({ message: "User or Product not found" })
    }

    // update gold user when user buy product
    await db.user.update({
      where: {
        userId,
      },
      data: {
        gold: {
          decrement: goldSpent,
        },
      },
    })

    // add entry on purchase
    await db.purchase.create({
      data: {
        userId,
        productId,
        goldSpent,
      },
    })

    return NextResponse.json(
      { message: "Purchase successful" },
      { status: 201 },
    )
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 },
      )
    }
    return NextResponse.json(
      {
        message: "internal server error",
      },
      {
        status: 500,
      },
    )
  }
}
