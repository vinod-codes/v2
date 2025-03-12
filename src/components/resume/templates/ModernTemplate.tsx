import type { ResumeData } from "@/types/resume"

interface ModernTemplateProps {
  data: ResumeData
  textColor: string
  fontFamily: string
}

export const ModernTemplate = ({ data, textColor, fontFamily }: ModernTemplateProps) => {
  return (
    <div className="space-y-6 text-left" style={{ color: textColor, fontFamily }}>
      {/* Header/Personal Info */}
      <div className="pb-4 border-b-2 border-primary">
        <h2 className="text-3xl font-bold">{data.personalInfo.name || "Your Name"}</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
          {data.personalInfo.email && (
            <div className="flex items-center">
              <span className="font-medium mr-1">Email:</span> {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center">
              <span className="font-medium mr-1">Phone:</span> {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center">
              <span className="font-medium mr-1">Location:</span> {data.personalInfo.location}
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center">
              <span className="font-medium mr-1">Website:</span> {data.personalInfo.website}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <h3 className="text-xl font-bold border-l-4 border-primary pl-2 mb-3">Professional Summary</h3>
          <p>{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && data.experience[0].company && (
        <div>
          <h3 className="text-xl font-bold border-l-4 border-primary pl-2 mb-3">Work Experience</h3>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="pl-2 border-l border-muted">
                <div className="flex justify-between">
                  <h4 className="font-bold text-primary">{exp.position}</h4>
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
          <h3 className="text-xl font-bold border-l-4 border-primary pl-2 mb-3">Education</h3>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="pl-2 border-l border-muted">
                <div className="flex justify-between">
                  <h4 className="font-bold text-primary">{edu.institution}</h4>
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
          <h3 className="text-xl font-bold border-l-4 border-primary pl-2 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className="border border-primary text-primary rounded-full px-3 py-1 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

