export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
}

export interface EducationItem {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
}

export interface ExperienceItem {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  education: EducationItem[]
  experience: ExperienceItem[]
  skills: string[]
}

