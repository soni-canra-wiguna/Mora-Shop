import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ThanksPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-4">
      <img src="/thank-you.png" className="mt-10 size-28" />
      <span className="whitespace-pre text-xl font-medium capitalize">
        thanks
      </span>
      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="neutral">homepage</Button>
        </Link>
        <Link href="/topup">
          <Button>topup kembali</Button>
        </Link>
      </div>
    </main>
  )
}
