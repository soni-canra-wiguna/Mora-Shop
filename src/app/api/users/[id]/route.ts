import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params

    const user = await db.product.findUnique({
      where: {
        id,
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
