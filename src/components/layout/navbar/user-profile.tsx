"use client"

import { ThemeSwitcher } from '@/components/theme-swithcer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import {
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs"

export const UserProfile = () => {
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