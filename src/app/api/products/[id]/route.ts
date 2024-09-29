import { db } from "@/lib/db"
import { CreateProductRequest, productSchema } from "@/schema/product"
import { Validation } from "@/schema/validation"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params
    const request: CreateProductRequest = await req.json()
    const response = Validation.validate(productSchema.create, request)

    await db.product.update({
      where: {
        id: id,
      },
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params

    await db.product.delete({
      where: {
        id,
      },
    })

    return NextResponse.json(
      { message: "product was deleted" },
      { status: 200 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      },
    )
  }
}
