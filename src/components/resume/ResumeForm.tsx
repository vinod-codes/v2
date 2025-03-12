"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Trash, Check } from "lucide-react"
import type { ResumeData } from "@/types/resume"
import { useToast } from "@/components/ui/use-toast"

interface ResumeFormProps {
  initialData?: ResumeData
  onSave: (data: ResumeData) => void
}

export const ResumeForm = ({ initialData, onSave }: ResumeFormProps) => {
  const [formData, setFormData] = useState<ResumeData>(
    initialData || {
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        summary: "",
      },
      education: [{ id: "1", institution: "", degree: "", field: "", startDate: "", endDate: "" }],
      experience: [{ id: "1", company: "", position: "", startDate: "", endDate: "", description: "" }],
      skills: [],
    },
  )
  const [newSkill, setNewSkill] = useState("")
  const { toast } = useToast()

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value,
      },
    })
  }

  const handleEducationChange = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      education: formData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { id: Date.now().toString(), institution: "", degree: "", field: "", startDate: "", endDate: "" },
      ],
    })
  }

  const removeEducation = (id: string) => {
    if (formData.education.length > 1) {
      setFormData({
        ...formData,
        education: formData.education.filter((edu) => edu.id !== id),
      })
    } else {
      toast({
        title: "Cannot Remove",
        description: "You must have at least one education entry.",
        variant: "destructive",
      })
    }
  }

  const handleExperienceChange = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      experience: formData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", description: "" },
      ],
    })
  }

  const removeExperience = (id: string) => {
    if (formData.experience.length > 1) {
      setFormData({
        ...formData,
        experience: formData.experience.filter((exp) => exp.id !== id),
      })
    } else {
      toast({
        title: "Cannot Remove",
        description: "You must have at least one experience entry.",
        variant: "destructive",
      })
    }
  }

  const addSkill = () => {
    if (newSkill.trim() !== "" && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Accordion type="single" collapsible defaultValue="personal-info">
        <AccordionItem value="personal-info">
          <AccordionTrigger>Personal Information</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.personalInfo.name}
                      onChange={handlePersonalInfoChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="johndoe@example.com"
                      value={formData.personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="(123) 456-7890"
                      value={formData.personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="City, State"
                      value={formData.personalInfo.location}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website/LinkedIn</Label>
                    <Input
                      id="website"
                      name="website"
                      placeholder="https://linkedin.com/in/johndoe"
                      value={formData.personalInfo.website}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    placeholder="Write a brief summary of your professional background and goals..."
                    value={formData.personalInfo.summary}
                    onChange={handlePersonalInfoChange}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger>Education</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                {formData.education.map((edu, index) => (
                  <div key={edu.id} className="mb-6 p-4 border rounded-lg relative">
                    <div className="absolute right-2 top-2">
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeEducation(edu.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <h4 className="font-medium mb-4">Education #{index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                        <Input
                          id={`institution-${edu.id}`}
                          placeholder="University Name"
                          value={edu.institution}
                          onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                        <Input
                          id={`degree-${edu.id}`}
                          placeholder="Bachelor of Science"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                        <Input
                          id={`field-${edu.id}`}
                          placeholder="Computer Science"
                          value={edu.field}
                          onChange={(e) => handleEducationChange(edu.id, "field", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                          <Input
                            id={`startDate-${edu.id}`}
                            placeholder="MM/YYYY"
                            value={edu.startDate}
                            onChange={(e) => handleEducationChange(edu.id, "startDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                          <Input
                            id={`endDate-${edu.id}`}
                            placeholder="MM/YYYY or Present"
                            value={edu.endDate}
                            onChange={(e) => handleEducationChange(edu.id, "endDate", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addEducation} className="w-full mt-4">
                  <Plus className="mr-2 h-4 w-4" /> Add Education
                </Button>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger>Work Experience</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                {formData.experience.map((exp, index) => (
                  <div key={exp.id} className="mb-6 p-4 border rounded-lg relative">
                    <div className="absolute right-2 top-2">
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeExperience(exp.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <h4 className="font-medium mb-4">Experience #{index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${exp.id}`}>Company</Label>
                        <Input
                          id={`company-${exp.id}`}
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`position-${exp.id}`}>Position</Label>
                        <Input
                          id={`position-${exp.id}`}
                          placeholder="Job Title"
                          value={exp.position}
                          onChange={(e) => handleExperienceChange(exp.id, "position", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`expStartDate-${exp.id}`}>Start Date</Label>
                          <Input
                            id={`expStartDate-${exp.id}`}
                            placeholder="MM/YYYY"
                            value={exp.startDate}
                            onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`expEndDate-${exp.id}`}>End Date</Label>
                          <Input
                            id={`expEndDate-${exp.id}`}
                            placeholder="MM/YYYY or Present"
                            value={exp.endDate}
                            onChange={(e) => handleExperienceChange(exp.id, "endDate", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label htmlFor={`description-${exp.id}`}>Description</Label>
                      <Textarea
                        id={`description-${exp.id}`}
                        placeholder="Describe your responsibilities and achievements..."
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addExperience} className="w-full mt-4">
                  <Plus className="mr-2 h-4 w-4" /> Add Experience
                </Button>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills">
          <AccordionTrigger>Skills</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.skills.map((skill) => (
                    <div key={skill} className="flex items-center bg-primary/10 text-primary rounded-full px-3 py-1">
                      <span>{skill}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-1"
                        onClick={() => removeSkill(skill)}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a skill (e.g., JavaScript, Project Management)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkill()
                      }
                    }}
                  />
                  <Button type="button" onClick={addSkill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-end">
        <Button type="submit" className="mt-4">
          <Check className="mr-2 h-4 w-4" /> Save Resume
        </Button>
      </div>
    </form>
  )
}

