"use client"

import type * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { BarChart3, FileText, Search, CheckSquare, Settings, User, LogOut, Mail, Briefcase, Home } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const { user, profile, signOut } = useAuth()
  const location = useLocation()
  const { state } = useSidebar()

  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
      requiresAuth: false,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: BarChart3,
      requiresAuth: true,
    },
    {
      name: "Resume Builder",
      path: "/resume-builder",
      icon: FileText,
      requiresAuth: true,
    },
    {
      name: "Job Search",
      path: "/jobs",
      icon: Search,
      requiresAuth: true,
    },
    {
      name: "Applications",
      path: "/applications",
      icon: CheckSquare,
      requiresAuth: true,
    },
    {
      name: "Cover Letters",
      path: "/cover-letters",
      icon: Mail,
      requiresAuth: true,
    },
    {
      name: "Interview Prep",
      path: "/interview-prep",
      icon: Briefcase,
      requiresAuth: true,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
      requiresAuth: true,
    },
  ]

  const filteredMenuItems = user ? menuItems : menuItems.filter((item) => !item.requiresAuth)

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <User className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">JobifyAI</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {filteredMenuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.path}
                tooltip={state === "collapsed" ? item.name : undefined}
              >
                <Link to={item.path}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        {user ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={profile?.avatarUrl || undefined} />
                <AvatarFallback>{getInitials(profile?.fullName || user.email || "")}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="font-medium truncate">{profile?.fullName || "User"}</span>
                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
              </div>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Sign out of your account</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <div className="flex items-center h-16 px-4 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-30">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-2">{/* Add any header content here */}</div>
          </div>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

