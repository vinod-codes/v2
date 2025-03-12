"use client"

import { Button } from "@/components/ui/button"
import type { ResumeData } from "@/types/resume"
import { ResumePreview } from "./ResumePreview"
import { ResumeCustomizationPanel } from "./ResumeCustomizationPanel"

interface ResumePreviewPanelProps {
  resumeData: ResumeData
  template: string
  setTemplate: (value: string) => void
  textColor: string
  setTextColor: (value: string) => void
  fontFamily: string
  setFontFamily: (value: string) => void
  headingColor: string
  setHeadingColor: (value: string) => void
  borderWidth: number
  setBorderWidth: (value: number) => void
  boldHeadings: boolean
  setBoldHeadings: (value: boolean) => void
  onEditClick: () => void
}

export const ResumePreviewPanel = ({
  resumeData,
  template,
  setTemplate,
  textColor,
  setTextColor,
  fontFamily,
  setFontFamily,
  headingColor,
  setHeadingColor,
  borderWidth,
  setBorderWidth,
  boldHeadings,
  setBoldHeadings,
  onEditClick,
}: ResumePreviewPanelProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <div className="lg:col-span-4">
          <ResumePreview
            data={resumeData}
            template={template}
            textColor={textColor}
            fontFamily={fontFamily}
            headingColor={headingColor}
            borderWidth={borderWidth}
            boldHeadings={boldHeadings}
          />
        </div>
        <div className="lg:col-span-2">
          <ResumeCustomizationPanel
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
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="outline" onClick={onEditClick}>
          Return to Editor
        </Button>
      </div>
    </div>
  )
}

