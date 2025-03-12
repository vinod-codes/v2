"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ResumeData } from "@/types/resume"
import { useToast } from "@/components/ui/use-toast"
import { Wand2, Copy, Download, RotateCcw } from "lucide-react"

interface CoverLetterGeneratorProps {
  resumeData: ResumeData | null
}

export const CoverLetterGenerator = ({ resumeData }: CoverLetterGeneratorProps) => {
  const [jobTitle, setJobTitle] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [coverLetterStyle, setCoverLetterStyle] = useState("professional")
  const [coverLetter, setCoverLetter] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generateCoverLetter = () => {
    if (!jobTitle || !companyName || !jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate AI generation with a timeout
    setTimeout(() => {
      const userName = resumeData?.personalInfo.name || "Applicant Name"
      const userExperience = resumeData?.experience.length ? resumeData.experience[0].position : "professional"
      const userSkills = resumeData?.skills.join(", ") || "skills"

      // Generate different letter styles based on selection
      let generatedLetter = ""

      switch (coverLetterStyle) {
        case "professional":
          generatedLetter = `
Dear Hiring Manager,

I am writing to express my interest in the ${jobTitle} position at ${companyName}. With my background as a ${userExperience} and expertise in ${userSkills}, I believe I would be a valuable addition to your team.

Throughout my career, I have developed strong skills in these areas, which align perfectly with the requirements outlined in your job description. I am particularly drawn to ${companyName}'s commitment to innovation and excellence in the industry.

I am excited about the opportunity to bring my unique perspective and experience to ${companyName} and would welcome the chance to discuss how my background, technical skills, and experiences would benefit your organization.

Thank you for considering my application. I look forward to the possibility of working with you and your team.

Sincerely,
${userName}
          `.trim()
          break

        case "enthusiastic":
          generatedLetter = `
Dear ${companyName} Team,

I'm thrilled to apply for the ${jobTitle} role at your company! Your work in the industry has always impressed me, and I'm excited about the possibility of contributing my skills in ${userSkills} to your innovative team.

My experience as a ${userExperience} has prepared me well for this opportunity. I've consistently delivered results in fast-paced environments and am eager to bring that same energy and dedication to ${companyName}.

I would love the opportunity to discuss how my background aligns with your needs and how I can help drive your continued success.

Enthusiastically,
${userName}
          `.trim()
          break

        case "concise":
          generatedLetter = `
Dear Hiring Manager,

I'm applying for the ${jobTitle} position at ${companyName}.

My qualifications include:
- Experience as a ${userExperience}
- Skills in ${userSkills}
- A proven track record of delivering results

I'm confident I can meet and exceed your expectations. I look forward to discussing how I can contribute to your team.

Regards,
${userName}
          `.trim()
          break

        case "storytelling":
          generatedLetter = `
Dear Hiring Team at ${companyName},

When I discovered the ${jobTitle} opening at your company, I immediately recognized it as the perfect opportunity to combine my passion for the industry with my experience as a ${userExperience}.

Throughout my career journey, I've developed expertise in ${userSkills}, skills that I've applied to overcome challenges and deliver meaningful results. Each step of my career has prepared me for this opportunity at ${companyName}.

What draws me to your company is not just your reputation for excellence, but also your commitment to innovation in the field. I'm excited about the prospect of bringing my unique narrative and skills to your team.

I would appreciate the opportunity to discuss how my story might become part of ${companyName}'s continued success.

Warmly,
${userName}
          `.trim()
          break
      }

      setCoverLetter(generatedLetter)
      setIsGenerating(false)

      toast({
        title: "Cover Letter Generated",
        description: "Your cover letter has been created successfully.",
      })
    }, 1500)
  }

  const handleReset = () => {
    setJobTitle("")
    setCompanyName("")
    setJobDescription("")
    setCoverLetter("")
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter)
    toast({
      title: "Copied to Clipboard",
      description: "Your cover letter has been copied to clipboard.",
    })
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([coverLetter], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `Cover_Letter_${companyName.replace(/\s+/g, "_")}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: "Cover Letter Downloaded",
      description: "Your cover letter has been downloaded as a text file.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Generate Cover Letter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="e.g., Software Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="e.g., Acme Corporation"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description (Key Requirements)</Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description or key requirements here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetterStyle">Cover Letter Style</Label>
              <Select value={coverLetterStyle} onValueChange={setCoverLetterStyle}>
                <SelectTrigger id="coverLetterStyle">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional & Formal</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic & Engaging</SelectItem>
                  <SelectItem value="concise">Concise & Direct</SelectItem>
                  <SelectItem value="storytelling">Storytelling Approach</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full mt-4" onClick={generateCoverLetter} disabled={isGenerating}>
              <Wand2 className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate Cover Letter"}
            </Button>

            <Button variant="outline" className="w-full" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Form
            </Button>
          </CardContent>
        </Card>

        {/* Output Preview */}
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Cover Letter Preview</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleCopy} disabled={!coverLetter}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleDownload} disabled={!coverLetter}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {coverLetter ? (
              <div className="whitespace-pre-line bg-muted/50 p-4 rounded-md min-h-[400px] max-h-[500px] overflow-auto">
                {coverLetter}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 text-center h-[400px] text-muted-foreground border border-dashed rounded-md p-8">
                <p>Your cover letter will appear here after generation.</p>
                <p className="text-sm">
                  Fill in the form and click "Generate Cover Letter" to create a professional cover letter based on your
                  resume and the job details.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

