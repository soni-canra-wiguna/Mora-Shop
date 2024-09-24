"use client"

import { Container } from "@/components/layout/container"
import { ListTopup } from "@/components/list-topup"
import { useEffect } from "react"

export default function TopupPage() {
  // run side effect to handle snap.pay
  useEffect(() => {
    const snapUrl = "https://app.sandbox.midtrans.com/snap/snap.js"
    const script = document.createElement("script")
    script.src = snapUrl
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
    )
    // script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])
  return (
    <main className="flex min-h-screen w-full">
      <Container className="max-w-5xl">
        <ListTopup />
      </Container>
    </main>
  )
}
