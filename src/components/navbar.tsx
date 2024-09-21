import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs"
import { Container } from "./layout/container"
import { Button } from "./ui/button"
import { ThemeSwitcher } from "./theme-swithcer"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Skeleton } from "./ui/skeleton"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Plus, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Separator } from "./ui/separator"

const ProfileAccount = () => {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) return <Skeleton className="size-10 rounded-full" />

  if (isSignedIn && user) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Avatar>
            <AvatarFallback>
              {user.firstName?.[0] || user.username?.[0]}
            </AvatarFallback>
            <AvatarImage src={user.imageUrl} />
          </Avatar>
        </PopoverTrigger>
        <PopoverContent align="end">
          <ThemeSwitcher />
          <SignOutButton>sign out</SignOutButton>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <SignInButton mode="modal" fallbackRedirectUrl="/">
      <Button className="capitalize">Sign In</Button>
    </SignInButton>
  )
}

const TopupGold = () => {
  return (
    <Link href="/topup">
      <Button className="h-fit p-2" variant="neutral">
        <div className="flex items-center gap-2">
          <img src="/coin.png" className="size-4" />
          <span className="pr-4">100</span>
        </div>
        <Separator orientation="vertical" />
        <Plus className="size-4" />
      </Button>
    </Link>
  )
}

export const Navbar = () => {
  return (
    <header className="w-full">
      <Container>
        <div className="my-10 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-3xl font-bold">Mora</h1>
          </Link>
          <TopupGold />
          <div className="flex items-center gap-8">
            {/* <ShoppingBag className="size-6" /> */}
            <ThemeSwitcher />
            <ProfileAccount />
          </div>
        </div>
      </Container>
    </header>
  )
}
