import type { ResumeData } from "@/types/resume"

interface ClassicTemplateProps {
  data: ResumeData
  textColor: string
  fontFamily: string
  headingColor: string
  borderWidth: number
  boldHeadings: boolean
}

export const ClassicTemplate = ({ data, textColor, fontFamily, headingColor, boldHeadings }: ClassicTemplateProps) => {
  return (
    <div className="space-y-6 text-left" style={{ color: textColor, fontFamily }}>
      {/* Header/Personal Info */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">{data.personalInfo.name || "Your Name"}</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-muted-foreground text-sm">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <h3
            className="text-lg mb-2"
            style={{
              color: headingColor,
              fontWeight: boldHeadings ? "bold" : "semibold",
            }}
          >
            Professional Summary
          </h3>
          <p>{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && data.experience[0].company && (
        <div>
          <h3
            className="text-lg mb-2"
            style={{
              color: headingColor,
              fontWeight: boldHeadings ? "bold" : "semibold",
            }}
          >
            Work Experience
          </h3>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h4
                    className="font-medium"
                    style={{
                      color: headingColor,
                      fontWeight: boldHeadings ? "bold" : "medium",
                    }}
                  >
                    {exp.position}
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <div className="text-muted-foreground">{exp.company}</div>
                <p className="mt-1 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && data.education[0].institution && (
        <div>
          <h3
            className="text-lg mb-2"
            style={{
              color: headingColor,
              fontWeight: boldHeadings ? "bold" : "semibold",
            }}
          >
            Education
          </h3>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h4
                    className="font-medium"
                    style={{
                      color: headingColor,
                      fontWeight: boldHeadings ? "bold" : "medium",
                    }}
                  >
                    {edu.institution}
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                <div>
                  {edu.degree}
                  {edu.field && `, ${edu.field}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h3
            className="text-lg mb-2"
            style={{
              color: headingColor,
              fontWeight: boldHeadings ? "bold" : "semibold",
            }}
          >
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

