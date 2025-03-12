import type { ResumeData } from "@/types/resume"

interface MinimalTemplateProps {
  data: ResumeData
  textColor: string
  fontFamily: string
  headingColor: string
  borderWidth: number
  boldHeadings: boolean
}

export const MinimalTemplate = ({ data, textColor, fontFamily, headingColor, boldHeadings }: MinimalTemplateProps) => {
  return (
    <div className="space-y-6 text-left" style={{ color: textColor, fontFamily }}>
      {/* Header/Personal Info */}
      <div className="text-center pb-4">
        <h2
          className="text-2xl"
          style={{
            fontWeight: boldHeadings ? "bold" : "semibold",
            color: headingColor,
          }}
        >
          {data.personalInfo.name || "Your Name"}
        </h2>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="text-center">
          <p className="italic">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && data.experience[0].company && (
        <div>
          <h3
            className="text-md uppercase tracking-wider text-center mb-3"
            style={{
              color: headingColor,
              fontWeight: boldHeadings ? "bold" : "normal",
            }}
          >
            Experience
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
            className="text-md uppercase tracking-wider text-center mb-3"
            style={{
              color: headingColor,
              fontWeight: boldHeadings ? "bold" : "normal",
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
            className="text-md uppercase tracking-wider text-center mb-3"
            style={{
              color: headingColor,
              fontWeight: boldHeadings ? "bold" : "normal",
            }}
          >
            Skills
          </h3>
          <div className="flex justify-center flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={skill}>
                {skill}
                {index < data.skills.length - 1 ? " • " : ""}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

