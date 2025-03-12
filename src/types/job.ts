export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote"
  description: string
  requirements: string[]
  salary?: string
  postedDate: string
  applicationUrl?: string
}

export interface JobApplication {
  id: string
  jobId: string
  jobTitle: string
  company: string
  appliedDate: string
  status: "Applied" | "Interviewing" | "Rejected" | "Offer" | "Accepted"
  notes?: string
}

