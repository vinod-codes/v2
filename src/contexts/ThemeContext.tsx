"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type ThemeType = "light" | "dark"

interface ThemeContextType {
  theme: ThemeType
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("light")

  useEffect(() => {
    try {
      // Check user's preferred theme from localStorage or system preference
      const savedTheme =
        (localStorage.getItem("theme") as ThemeType) ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } catch (error) {
      console.error("Error setting theme:", error)
      // Default to light theme if there's an error
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    try {
      const newTheme = theme === "dark" ? "light" : "dark"
      setTheme(newTheme)
      localStorage.setItem("theme", newTheme)
      document.documentElement.classList.toggle("dark", newTheme === "dark")
    } catch (error) {
      console.error("Error toggling theme:", error)
    }
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

