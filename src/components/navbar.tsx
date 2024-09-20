import { SignOutButton, SignUpButton, useUser } from "@clerk/nextjs"
import { Container } from "./layout/container"
import { Button } from "./ui/button"
import { ThemeSwitcher } from "./theme-swithcer"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Skeleton } from "./ui/skeleton"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { ShoppingBag } from "lucide-react"

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
    <SignUpButton mode="modal" fallbackRedirectUrl="/">
      <Button>Sign up</Button>
    </SignUpButton>
  )
}

export const Navbar = () => {
  return (
    <header className="w-full">
      <Container>
        <div className="my-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Mora</h1>
          </div>
          <div className="flex items-center gap-8">
            <ShoppingBag className="size-6" />
            {/* <ThemeSwitcher /> */}
            <ProfileAccount />
          </div>
        </div>
      </Container>
    </header>
  )
}
