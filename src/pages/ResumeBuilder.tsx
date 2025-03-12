"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResumeForm } from "@/components/resume/ResumeForm"
import { CoverLetterGenerator } from "@/components/cover-letter/CoverLetterGenerator"
import type { ResumeData } from "@/types/resume"
import { useToast } from "@/components/ui/use-toast"
import { Wand2 } from "lucide-react"
import { ResumePreviewPanel } from "@/components/resume/ResumePreviewPanel"
import { EmptyState } from "@/components/resume/EmptyState"

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [activeTab, setActiveTab] = useState("edit")
  const [template, setTemplate] = useState("classic")
  const [textColor, setTextColor] = useState("#333333")
  const [fontFamily, setFontFamily] = useState("Inter, sans-serif")
  const [headingColor, setHeadingColor] = useState("#000000")
  const [borderWidth, setBorderWidth] = useState(0)
  const [boldHeadings, setBoldHeadings] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Load resume data from localStorage
    const savedResume = localStorage.getItem("resumeData")
    if (savedResume) {
      try {
        setResumeData(JSON.parse(savedResume))
      } catch (error) {
        console.error("Error parsing saved resume:", error)
      }
    }
  }, [])

  const handleSaveResume = (data: ResumeData) => {
    setResumeData(data)
    localStorage.setItem("resumeData", JSON.stringify(data))
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully.",
    })
    setActiveTab("preview")
  }

  const handleAIResumeEnhancement = () => {
    // In a real implementation, this would call an AI service
    toast({
      title: "AI Enhancement",
      description: "AI resume enhancement will be available in the next version.",
    })
  }

  const handleEditClick = () => {
    setActiveTab("edit")
  }

  return (
    <MainLayout requireAuth>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Resume Builder</h1>
            <p className="text-muted-foreground">Create and customize your professional resume</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button onClick={handleAIResumeEnhancement} variant="outline">
              <Wand2 className="mr-2 h-4 w-4" />
              Enhance with AI
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="edit">Edit Resume</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="coverletter">Cover Letter</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-6">
            <ResumeForm initialData={resumeData || undefined} onSave={handleSaveResume} />
          </TabsContent>

          <TabsContent value="preview">
            {resumeData ? (
              <ResumePreviewPanel
                resumeData={resumeData}
                template={template}
                setTemplate={setTemplate}
                textColor={textColor}
                setTextColor={setTextColor}
                fontFamily={fontFamily}
                setFontFamily={setFontFamily}
                headingColor={headingColor}
                setHeadingColor={setHeadingColor}
                borderWidth={borderWidth}
                setBorderWidth={setBorderWidth}
                boldHeadings={boldHeadings}
                setBoldHeadings={setBoldHeadings}
                onEditClick={handleEditClick}
              />
            ) : (
              <EmptyState
                message="No resume data available. Create your resume to see a preview."
                buttonText="Create Resume"
                onButtonClick={handleEditClick}
              />
            )}
          </TabsContent>

          <TabsContent value="coverletter">
            {resumeData ? (
              <CoverLetterGenerator resumeData={resumeData} />
            ) : (
              <EmptyState
                message="Please create your resume first to generate a matching cover letter."
                buttonText="Create Resume"
                onButtonClick={handleEditClick}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

export default ResumeBuilder

