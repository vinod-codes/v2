"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CoverLetterGenerator } from "@/components/cover-letter/CoverLetterGenerator"
import type { ResumeData } from "@/types/resume"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Search, FileText, Trash, Edit } from "lucide-react"

interface SavedCoverLetter {
  id: string
  title: string
  company: string
  content: string
  createdAt: string
}

const CoverLetters = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [savedLetters, setSavedLetters] = useState<SavedCoverLetter[]>([])
  const [searchTerm, setSearchTerm] = useState("")
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

    // Load saved cover letters (mock data for now)
    const mockLetters: SavedCoverLetter[] = [
      {
        id: "1",
        title: "Software Engineer Application",
        company: "TechCorp",
        content:
          "Dear Hiring Manager,\n\nI am writing to express my interest in the Software Engineer position at TechCorp...",
        createdAt: "2023-06-15",
      },
      {
        id: "2",
        title: "UX Designer Position",
        company: "Creative Studios",
        content: "Dear Creative Studios Team,\n\nI'm excited to apply for the UX Designer role at your company...",
        createdAt: "2023-06-10",
      },
      {
        id: "3",
        title: "Product Manager Application",
        company: "InnovateTech",
        content: "Dear Hiring Team,\n\nI am writing to apply for the Product Manager position at InnovateTech...",
        createdAt: "2023-06-05",
      },
    ]

    setSavedLetters(mockLetters)
  }, [])

  const filteredLetters = savedLetters.filter(
    (letter) =>
      letter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteLetter = (id: string) => {
    setSavedLetters(savedLetters.filter((letter) => letter.id !== id))
    toast({
      title: "Cover Letter Deleted",
      description: "The cover letter has been deleted successfully.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cover Letters</h1>

      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="saved">Saved Letters</TabsTrigger>
        </TabsList>

        <TabsContent value="generator">
          {resumeData ? (
            <CoverLetterGenerator resumeData={resumeData} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    You need to create a resume first before generating a cover letter
                  </p>
                  <Button asChild>
                    <a href="/resume-builder">Create Resume</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="saved">
          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search cover letters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Cover Letter
            </Button>
          </div>

          {filteredLetters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLetters.map((letter) => (
                <Card key={letter.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{letter.title}</CardTitle>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteLetter(letter.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {letter.company} • Created on {new Date(letter.createdAt).toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-3 text-muted-foreground">{letter.content}</p>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">No cover letters found</p>
              <p className="text-sm text-muted-foreground mb-4">
                {searchTerm ? "Try a different search term" : "Generate your first cover letter to get started"}
              </p>
              {searchTerm ? (
                <Button variant="outline" onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
              ) : (
                <Button onClick={() => document.querySelector('[data-value="generator"]')?.click()}>
                  Create Cover Letter
                </Button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CoverLetters

