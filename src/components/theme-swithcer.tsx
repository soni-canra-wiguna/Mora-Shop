import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import * as React from "react"

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()

  return (
    <>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        <Sun className="hidden size-4 stroke-darkText stroke-[1.5] dark:inline sm:size-6" />
        <Moon className="inline size-4 stroke-text stroke-[1.5] dark:hidden sm:size-6" />
        <span className="sr-only">Toggle theme</span>
      </button>
    </>
  )
}
