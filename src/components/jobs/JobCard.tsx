"use client"

import type { Job } from "@/types/job"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, MapPin, Calendar, DollarSign } from "lucide-react"
import { JobMatchScore } from "./JobMatchScore"

interface JobCardProps {
  job: Job
  onApply: (job: Job) => void
  matchScore?: number
}

export const JobCard = ({ job, onApply, matchScore }: JobCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              {matchScore && <JobMatchScore score={matchScore} />}
            </div>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Briefcase className="mr-1 h-4 w-4" />
                {job.company}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {job.location}
              </div>
              {job.salary && (
                <div className="flex items-center">
                  <DollarSign className="mr-1 h-4 w-4" />
                  {job.salary}
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Posted {new Date(job.postedDate).toLocaleDateString()}
              </div>
            </div>
            <p className="mt-4 text-muted-foreground">{job.description}</p>
            <div className="mt-4">
              <span className="font-semibold">Requirements:</span>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-right">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{job.type}</span>
            </div>
            <Button onClick={() => onApply(job)}>Apply Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

