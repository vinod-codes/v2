import type { ResumeData } from "@/types/resume"

interface SimpleTemplateProps {
  data: ResumeData
  textColor: string
  fontFamily: string
  headingColor: string
  borderWidth: number
  boldHeadings: boolean
}

export const SimpleTemplate = ({ data, textColor, fontFamily, headingColor, boldHeadings }: SimpleTemplateProps) => {
  return (
    <div className="space-y-6 text-left" style={{ color: textColor, fontFamily }}>
      {/* Header/Personal Info */}
      <div className="text-center pb-4">
        <h2 className="text-2xl font-bold">{data.personalInfo.name || "Your Name"}</h2>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2 text-sm">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>• {data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>• {data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>• {data.personalInfo.website}</div>}
        </div>
      </div>

      {/* Simple horizontal rule */}
      <div className="border-b border-gray-200"></div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <p className="text-center">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && data.experience[0].company && (
        <div>
          <h3
            className="text-md uppercase tracking-wider mb-3"
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
                  <h4 className="font-bold" style={{ color: headingColor }}>
                    {exp.position}
                  </h4>
                  <div className="text-sm">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <div className="font-medium">{exp.company}</div>
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
            className="text-md uppercase tracking-wider mb-3"
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
                  <h4 className="font-bold" style={{ color: headingColor }}>
                    {edu.institution}
                  </h4>
                  <div className="text-sm">
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
            className="text-md uppercase tracking-wider mb-3"
            style={{
              color: headingColor,
              fontWeight: boldHeadings ? "bold" : "normal",
            }}
          >
            Skills
          </h3>
          <p>{data.skills.join(" • ")}</p>
        </div>
      )}
    </div>
  )
}

