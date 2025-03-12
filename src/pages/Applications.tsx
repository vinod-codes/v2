"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { JobApplication } from "@/types/job"
import { useToast } from "@/components/ui/use-toast"
import { Search, Calendar, FileText, Trash, Edit } from "lucide-react"

const Applications = () => {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editStatus, setEditStatus] = useState("")
  const [editNotes, setEditNotes] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    try {
      const savedApplications = localStorage.getItem("jobApplications")
      if (savedApplications) {
        setApplications(JSON.parse(savedApplications))
      }
    } catch (error) {
      console.error("Error loading applications:", error)
      toast({
        title: "Error",
        description: "Failed to load your applications.",
        variant: "destructive",
      })
    }
  }, [toast])

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus ? app.status === filterStatus : true

    return matchesSearch && matchesStatus
  })

  const handleEditApplication = (application: JobApplication) => {
    setSelectedApplication(application)
    setEditStatus(application.status)
    setEditNotes(application.notes || "")
    setEditMode(true)
  }

  const saveEditedApplication = () => {
    if (!selectedApplication) return

    const updatedApplications = applications.map((app) =>
      app.id === selectedApplication.id ? { ...app, status: editStatus as any, notes: editNotes } : app,
    )

    setApplications(updatedApplications)
    localStorage.setItem("jobApplications", JSON.stringify(updatedApplications))

    toast({
      title: "Application Updated",
      description: "Your job application has been updated successfully.",
    })

    setEditMode(false)
  }

  const deleteApplication = (id: string) => {
    const updatedApplications = applications.filter((app) => app.id !== id)
    setApplications(updatedApplications)
    localStorage.setItem("jobApplications", JSON.stringify(updatedApplications))

    toast({
      title: "Application Deleted",
      description: "Your job application has been deleted successfully.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800"
      case "Interviewing":
        return "bg-yellow-100 text-yellow-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Offer":
        return "bg-green-100 text-green-800"
      case "Accepted":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <MainLayout requireAuth>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Applications</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Interviewing">Interviewing</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Offer">Offer</SelectItem>
              <SelectItem value="Accepted">Accepted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h2 className="text-xl font-semibold">{application.jobTitle}</h2>
                      <div className="text-muted-foreground">{application.company}</div>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Calendar className="mr-1 h-4 w-4" />
                        Applied on {new Date(application.appliedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}
                      >
                        {application.status}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEditApplication(application)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => deleteApplication(application.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {application.notes && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-start">
                        <FileText className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <p className="text-sm">{application.notes}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <div className="text-muted-foreground">No applications found</div>
              {applications.length > 0 && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("")
                    setFilterStatus("")
                  }}
                >
                  Clear Filters
                </Button>
              )}
              {applications.length === 0 && (
                <div className="mt-4">
                  <p className="text-muted-foreground mb-4">Start applying to jobs to track your applications here</p>
                  <Button asChild>
                    <a href="/jobs">Browse Jobs</a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Dialog open={editMode} onOpenChange={setEditMode}>
        <DialogContent>
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle>Edit Application</DialogTitle>
                <DialogDescription>
                  {selectedApplication.jobTitle} at {selectedApplication.company}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 my-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Application Status</Label>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Applied">Applied</SelectItem>
                      <SelectItem value="Interviewing">Interviewing</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                      <SelectItem value="Offer">Offer</SelectItem>
                      <SelectItem value="Accepted">Accepted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes about this application..."
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button onClick={saveEditedApplication}>Save Changes</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}

export default Applications

