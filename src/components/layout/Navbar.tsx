"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { Menu, X, User } from "lucide-react"

export function Navbar() {
  const { user, profile, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = user
    ? [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Resume Builder", path: "/resume-builder" },
        { name: "Job Search", path: "/jobs" },
        { name: "Applications", path: "/applications" },
      ]
    : []

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <nav className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <User className="h-6 w-6 text-primary" />
                <span className="ml-2 text-xl font-bold text-foreground">JobifyAI</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary"
                  } transition-colors`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="mr-4">
              <ThemeToggle />
            </div>

            {!user ? (
              <div className="flex items-center">
                <Link to="/login">
                  <Button variant="outline" className="mr-2">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">{profile?.fullName || user.email}</span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <div className="mr-2">
              <ThemeToggle />
            </div>
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path ? "text-primary bg-primary/10" : "text-foreground hover:text-primary"
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {!user ? (
              <div className="mt-4 pt-4 border-t border-border">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full mb-2">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Signed in as: <span className="font-medium">{profile?.fullName || user.email}</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => {
                    handleSignOut()
                    setIsMenuOpen(false)
                  }}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

