import React from 'react'
import { useTheme } from './theme-provider'
import { SunIcon, MoonIcon } from 'lucide-react'
import { Button } from './ui/button'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  return (
    <Button
      variant="ghost"
      className="group/toggle h-8 w-8 px-0"
      onClick={toggleTheme}
    >
      <SunIcon className="hidden [html.dark_&]:block" />
      <MoonIcon className="hidden [html.light_&]:block" />
    </Button>
  )
}
