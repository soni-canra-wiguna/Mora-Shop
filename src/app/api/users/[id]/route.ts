import { db } from "@/lib/db"
import { UpdateUserRequest, userSchema } from "@/schema/user"
import { Validation } from "@/schema/validation"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params

    const user = await db.user.findUnique({
      where: {
        userId: id,
      },
    })

    return NextResponse.json(
      { message: "user was retrieved", data: user },
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

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params
    const request: UpdateUserRequest = await req.json()
    const { quantity } = Validation.validate(userSchema.update, request)

    await db.user.update({
      where: {
        userId: id,
      },
      data: {
        gold: {
          decrement: quantity,
        },
      },
    })

    return NextResponse.json({ message: "gold was updated" }, { status: 200 })
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
