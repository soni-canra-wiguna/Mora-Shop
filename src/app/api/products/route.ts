import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { Validation } from "@/schema/validation"
import { CreateProductRequest, productSchema } from "@/schema/product"
import { getSearchParams } from "@/utils/get-search-params"

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const request: CreateProductRequest = await req.json()
    const response = Validation.validate(productSchema.create, request)

    await db.product.create({
      data: response,
    })

    return NextResponse.json(
      {
        message: "Successfully created Product",
      },
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

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const type = getSearchParams("type", req) ?? ""
    const userId = getSearchParams("userId", req) ?? ""

    const response = await db.product.findMany()
    const paidResponse = await db.product.findMany({
      include: {
        purchases: {
          where: {
            userId,
            status: "PAID",
          },
        },
      },
    })

    if (type && userId) {
      return NextResponse.json(
        {
          message: "product successfully retrieved",
          data: paidResponse,
        },
        { status: 200 },
      )
    }

    return NextResponse.json(
      {
        message: "product successfully retrieved",
        data: response,
      },
      { status: 200 },
    )
  } catch (error) {
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
