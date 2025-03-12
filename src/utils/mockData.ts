import type { Job } from "@/types/job"

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "We are looking for a talented Frontend Developer to join our growing team.",
    requirements: [
      "3+ years of experience with React",
      "Strong JavaScript skills",
      "Experience with modern frontend tools",
    ],
    salary: "$120K - $140K",
    postedDate: new Date().toISOString().split("T")[0],
  },
  {
    id: "2",
    title: "UX Designer",
    company: "Creative Studios",
    location: "Remote",
    type: "Remote",
    description: "Join our design team to create beautiful and intuitive user experiences.",
    requirements: ["4+ years of UX design experience", "Proficiency in Figma", "Strong portfolio"],
    salary: "$100K - $130K",
    postedDate: new Date().toISOString().split("T")[0],
  },
  {
    id: "3",
    title: "Backend Developer",
    company: "DataTech Solutions",
    location: "New York, NY",
    type: "Full-time",
    description: "Looking for an experienced backend developer to build scalable systems.",
    requirements: [
      "5+ years of backend development",
      "Experience with Node.js and databases",
      "Knowledge of cloud platforms",
    ],
    salary: "$130K - $160K",
    postedDate: new Date().toISOString().split("T")[0],
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Remote",
    type: "Contract",
    description: "Help us build and maintain our cloud infrastructure.",
    requirements: ["3+ years of DevOps experience", "AWS certification", "Experience with CI/CD pipelines"],
    salary: "$140K - $170K",
    postedDate: new Date().toISOString().split("T")[0],
  },
]

