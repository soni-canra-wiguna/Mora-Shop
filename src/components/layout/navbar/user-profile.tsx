"use client"

import { ThemeSwitcher } from "@/components/theme-swithcer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { useState } from "react"

export const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) return <Skeleton className="size-10 rounded-full" />

  const role = user?.publicMetadata?.role as string

  const closeModal = () => setIsOpen(!isOpen)

  if (isSignedIn && user) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Avatar>
            <AvatarFallback>
              {user.firstName?.slice(0, 2) || user.username?.slice(0, 2)}
            </AvatarFallback>
            <AvatarImage src={user.imageUrl} />
          </Avatar>
        </PopoverTrigger>
        <PopoverContent align="end">
          <div className="flex flex-col gap-2">
            <ThemeSwitcher closeModalProfile={closeModal} />
            <SignOutButton>sign out</SignOutButton>
            {role == "admin" && (
              <Link href="/dashboard" onClick={closeModal}>
                dashboard
              </Link>
            )}
          </div>
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
