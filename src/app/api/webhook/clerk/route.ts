import { WebhookEvent } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { headers } from "next/headers"
import { Webhook } from "svix"

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``

async function validateRequest(request: NextRequest) {
  const payloadString = await request.text()
  const headerPayload = headers()

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  }
  const wh = new Webhook(webhookSecret)
  return wh.verify(payloadString, svixHeaders) as WebhookEvent
}

export async function POST(req: NextRequest) {
  try {
    // Parse the Clerk Webhook event
    const payload = await validateRequest(req)

    const { id: clerkUserId } = payload.data
    if (!clerkUserId)
      return NextResponse.json(
        { error: "No user ID provided" },
        { status: 400 },
      )

    // Create or delete a user in the database based on the Clerk Webhook event
    let user = null
    switch (payload.type) {
      case "user.created": {
        user = await db.user.upsert({
          where: {
            clerkId: clerkUserId,
          },
          update: {
            clerkId: clerkUserId,
          },
          create: {
            clerkId: clerkUserId,
            gold: 0,
          },
        })
        break
      }
      case "user.deleted": {
        user = await db.user.delete({
          where: {
            clerkId: clerkUserId,
          },
        })
        break
      }
      default:
        break
    }

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
