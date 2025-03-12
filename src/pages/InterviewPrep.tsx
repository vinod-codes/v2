"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Wand2, Copy, Lightbulb, MessageSquare, Video, Mic } from "lucide-react"

const InterviewPrep = () => {
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [questions, setQuestions] = useState<string[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)
  const { toast } = useToast()

  const handleGenerateQuestions = () => {
    if (!jobTitle || !jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please provide both job title and description.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      const generatedQuestions = [
        "Tell me about yourself and your experience with similar roles.",
        "What specific skills do you have that make you a good fit for this position?",
        "Describe a challenging project you worked on and how you overcame obstacles.",
        "How do you stay updated with the latest trends and technologies in this field?",
        "What are your strengths and weaknesses related to this role?",
        "Where do you see yourself professionally in 5 years?",
        "Why are you interested in working for our company specifically?",
        "How do you handle tight deadlines and pressure?",
      ]

      setQuestions(generatedQuestions)
      setIsGenerating(false)

      toast({
        title: "Questions Generated",
        description: `Generated ${generatedQuestions.length} interview questions based on the job description.`,
      })
    }, 2000)
  }

  const handleCopyQuestion = (question: string) => {
    navigator.clipboard.writeText(question)
    toast({
      title: "Copied to Clipboard",
      description: "Question copied to clipboard.",
    })
  }

  const handleSaveAnswer = (question: string, answer: string) => {
    setAnswers({
      ...answers,
      [question]: answer,
    })

    toast({
      title: "Answer Saved",
      description: "Your answer has been saved successfully.",
    })

    setSelectedQuestion(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Interview Preparation</h1>

      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="questions">AI Question Generator</TabsTrigger>
          <TabsTrigger value="practice">Practice Answers</TabsTrigger>
          <TabsTrigger value="mock">Mock Interviews</TabsTrigger>
        </TabsList>

        <TabsContent value="questions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Interview Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Frontend Developer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={5}
                  />
                </div>

                <Button className="w-full" onClick={handleGenerateQuestions} disabled={isGenerating}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate Interview Questions"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated Questions</CardTitle>
              </CardHeader>
              <CardContent>
                {questions.length > 0 ? (
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <div key={index} className="p-3 bg-muted rounded-md">
                        <div className="flex justify-between">
                          <p>{question}</p>
                          <Button variant="ghost" size="icon" onClick={() => handleCopyQuestion(question)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-2 flex justify-end">
                          <Button variant="outline" size="sm" onClick={() => setSelectedQuestion(question)}>
                            Prepare Answer
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center">
                    <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-2">No questions generated yet</p>
                    <p className="text-sm text-muted-foreground">
                      Fill in the job details and click "Generate Interview Questions" to get started
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {selectedQuestion && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-card border rounded-lg shadow-lg w-full max-w-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Prepare Your Answer</h3>
                <p className="mb-4 p-3 bg-muted rounded-md">{selectedQuestion}</p>
                <Textarea
                  placeholder="Write your answer here..."
                  rows={6}
                  value={answers[selectedQuestion] || ""}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [selectedQuestion]: e.target.value,
                    })
                  }
                />
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setSelectedQuestion(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleSaveAnswer(selectedQuestion, answers[selectedQuestion] || "")}>
                    Save Answer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle>Practice Your Answers</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(answers).length > 0 ? (
                <div className="space-y-6">
                  {Object.entries(answers).map(([question, answer], index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{question}</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{answer}</p>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm" onClick={() => setSelectedQuestion(question)}>
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mic className="h-4 w-4 mr-2" />
                          Practice Speaking
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">No prepared answers yet</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Generate questions and prepare answers to practice for your interview
                  </p>
                  <Button onClick={() => document.querySelector('[data-value="questions"]')?.click()}>
                    Generate Questions
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mock">
          <Card>
            <CardHeader>
              <CardTitle>AI Mock Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <Video className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">Mock Interview Feature Coming Soon</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Practice with our AI interviewer to get real-time feedback on your answers
                </p>
                <Button variant="outline">Join Waitlist</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default InterviewPrep

