"use client"

import { useState } from "react"
import type { Job } from "@/types/job"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

interface JobApplicationDialogProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  selectedJob: Job | null
}

export const JobApplicationDialog = ({ isOpen, setIsOpen, selectedJob }: JobApplicationDialogProps) => {
  const [applicationNote, setApplicationNote] = useState("")
  const { toast } = useToast()

  const submitApplication = () => {
    if (!selectedJob) return

    const newApplication = {
      id: Date.now().toString(),
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      company: selectedJob.company,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Applied",
      notes: applicationNote,
    }

    try {
      const savedApplications = localStorage.getItem("jobApplications")
      const applications = savedApplications ? JSON.parse(savedApplications) : []
      applications.push(newApplication)
      localStorage.setItem("jobApplications", JSON.stringify(applications))

      toast({
        title: "Application Submitted",
        description: `You've applied to ${selectedJob.title} at ${selectedJob.company}.`,
      })

      setIsOpen(false)
      setApplicationNote("")
    } catch (error) {
      console.error("Error saving application:", error)
      toast({
        title: "Error",
        description: "Failed to save your application. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        {selectedJob && (
          <>
            <DialogHeader>
              <DialogTitle>Apply to {selectedJob.title}</DialogTitle>
              <DialogDescription>
                {selectedJob.company} • {selectedJob.location}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-4">
              <Textarea
                placeholder="Add a note to your application..."
                value={applicationNote}
                onChange={(e) => setApplicationNote(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitApplication}>Submit Application</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

