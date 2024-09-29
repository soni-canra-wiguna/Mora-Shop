import Link from "next/link"
import { Container } from "../container"
import { TopupGoldButton } from "./topup-gold-button"
import { UserProfile } from "./user-profile"
import { PurchaseNotification } from "./purchase"

export const Navbar = () => {
  return (
    <header className="w-full">
      <Container>
        <div className="my-10 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-xl font-bold capitalize sm:text-2xl lg:text-3xl">
              Mora shop
            </h1>
          </Link>
          <TopupGoldButton />
          <div className="flex items-center gap-8">
            <PurchaseNotification />
            <UserProfile />
          </div>
        </div>
      </Container>
    </header>
  )
}
