import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ResumeData } from "@/types/resume"
import { ClassicTemplate } from "./templates/ClassicTemplate"
import { ModernTemplate } from "./templates/ModernTemplate"
import { MinimalTemplate } from "./templates/MinimalTemplate"
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate"
import { CreativeTemplate } from "./templates/CreativeTemplate"
import { SimpleTemplate } from "./templates/SimpleTemplate"
import { CompactTemplate } from "./templates/CompactTemplate"

interface ResumePreviewProps {
  data: ResumeData
  template: string
  textColor: string
  fontFamily: string
  headingColor: string
  borderWidth: number
  boldHeadings: boolean
}

export const ResumePreview = ({
  data,
  template,
  textColor,
  fontFamily,
  headingColor,
  borderWidth,
  boldHeadings,
}: ResumePreviewProps) => {
  const renderTemplate = () => {
    const templateProps = {
      data,
      textColor,
      fontFamily,
      headingColor,
      borderWidth,
      boldHeadings,
    }

    switch (template) {
      case "modern":
        return <ModernTemplate {...templateProps} />
      case "minimal":
        return <MinimalTemplate {...templateProps} />
      case "professional":
        return <ProfessionalTemplate {...templateProps} />
      case "creative":
        return <CreativeTemplate {...templateProps} />
      case "simple":
        return <SimpleTemplate {...templateProps} />
      case "compact":
        return <CompactTemplate {...templateProps} />
      case "classic":
      default:
        return <ClassicTemplate {...templateProps} />
    }
  }

  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="p-5"
          style={{
            border: borderWidth > 0 ? `${borderWidth}px solid #ddd` : "none",
            padding: borderWidth > 0 ? "20px" : "0",
          }}
        >
          {renderTemplate()}
        </div>
      </CardContent>
    </Card>
  )
}

