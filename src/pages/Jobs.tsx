"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { mockJobs } from "@/utils/mockData"
import type { Job } from "@/types/job"
import { JobCard } from "@/components/jobs/JobCard"
import { JobSearchFilters } from "@/components/jobs/JobSearchFilters"
import { JobAdvancedFilters, type JobFilters } from "@/components/jobs/JobAdvancedFilters"
import { JobApplicationDialog } from "@/components/jobs/JobApplicationDialog"
import { Button } from "@/components/ui/button"

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [advancedFilters, setAdvancedFilters] = useState<JobFilters>({
    type: filterType,
    searchTerm: searchTerm,
    salary: [50, 150],
    remote: false,
    experience: "mid",
  })

  // Calculate job match scores based on user's profile
  // This is a placeholder - in a real app, this would use AI to compare job requirements with resume
  const calculateMatchScore = (job: Job): number => {
    // Simulate different match scores for different jobs
    const baseScore = (job.id.charCodeAt(0) % 30) + 60 // Generate scores between 60-90
    return baseScore
  }

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" ? true : job.type === filterType
    const matchesRemote = !advancedFilters.remote || job.type === "Remote"

    return matchesSearch && matchesType && matchesRemote
  })

  const handleApply = (job: Job) => {
    setSelectedJob(job)
    setIsDialogOpen(true)
  }

  const handleFiltersChange = (newFilters: JobFilters) => {
    setAdvancedFilters(newFilters)
    setFilterType(newFilters.type)
  }

  return (
    <MainLayout requireAuth>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Find Your Next Job</h1>
          <JobAdvancedFilters filters={advancedFilters} onFiltersChange={handleFiltersChange} />
        </div>

        <JobSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
        />

        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApply}
                matchScore={calculateMatchScore(job)} // Use our calculated match score
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No jobs found matching your criteria</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("")
                  setFilterType("all")
                  setAdvancedFilters({
                    ...advancedFilters,
                    type: "all",
                    searchTerm: "",
                    remote: false,
                  })
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <JobApplicationDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} selectedJob={selectedJob} />
    </MainLayout>
  )
}

export default Jobs

