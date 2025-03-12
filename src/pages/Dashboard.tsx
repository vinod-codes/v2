"use client"

import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useAuth } from "@/contexts/AuthContext"
import { BarChart3, FileText, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Dashboard = () => {
  const { user, profile } = useAuth()

  // Mock data for the dashboard
  const applicationStats = [
    { name: "Applied", count: 12 },
    { name: "Interviewing", count: 5 },
    { name: "Rejected", count: 3 },
    { name: "Offers", count: 1 },
  ]

  const recentApplications = [
    { id: 1, company: "Tech Solutions Inc.", role: "Frontend Developer", date: "2023-06-01", status: "Applied" },
    { id: 2, company: "Digital Innovations", role: "UX Designer", date: "2023-05-28", status: "Interviewing" },
    { id: 3, company: "Cloud Systems", role: "Full Stack Engineer", date: "2023-05-25", status: "Rejected" },
    { id: 4, company: "Creative Agency", role: "Product Manager", date: "2023-05-22", status: "Applied" },
  ]

  return (
    <MainLayout requireAuth>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome back, {profile?.fullName || user?.email}!</h2>
          <p className="text-muted-foreground">
            Track your job applications, build your resume, and discover new opportunities all in one place.
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/resume-builder">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-primary/10 rounded-full mr-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Resume Builder</h3>
                    <p className="text-sm text-muted-foreground">Create or update your resume</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/jobs">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-primary/10 rounded-full mr-4">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Job Search</h3>
                    <p className="text-sm text-muted-foreground">Find new job opportunities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/applications">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-primary/10 rounded-full mr-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Applications</h3>
                    <p className="text-sm text-muted-foreground">Track your job applications</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Dashboard Chart & Recent Applications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={applicationStats} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Company</th>
                      <th className="text-left py-2">Role</th>
                      <th className="text-left py-2">Date</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map((app) => (
                      <tr key={app.id} className="border-b">
                        <td className="py-2">{app.company}</td>
                        <td className="py-2">{app.role}</td>
                        <td className="py-2">{new Date(app.date).toLocaleDateString()}</td>
                        <td className="py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              app.status === "Applied"
                                ? "bg-blue-100 text-blue-800"
                                : app.status === "Interviewing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : app.status === "Rejected"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-green-100 text-green-800"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <Link to="/applications">
                  <Button variant="outline">View All Applications</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard

