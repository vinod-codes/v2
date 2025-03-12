"use client"

import type { ReactNode } from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { useAuth } from "@/contexts/AuthContext"
import { Navigate } from "react-router-dom"

interface MainLayoutProps {
  children: ReactNode
  requireAuth?: boolean
}

export function MainLayout({ children, requireAuth = false }: MainLayoutProps) {
  const { user, loading } = useAuth()

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Handle protected routes
  if (requireAuth && !user) {
    return <Navigate to="/login" />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

