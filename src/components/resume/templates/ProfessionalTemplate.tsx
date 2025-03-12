import type { ResumeData } from "@/types/resume"

interface ProfessionalTemplateProps {
  data: ResumeData
  textColor: string
  fontFamily: string
}

export const ProfessionalTemplate = ({ data, textColor, fontFamily }: ProfessionalTemplateProps) => {
  return (
    <div className="grid grid-cols-3 gap-6 text-left" style={{ color: textColor, fontFamily }}>
      {/* Sidebar */}
      <div className="col-span-1 bg-secondary/20 p-4 space-y-6">
        {/* Personal Info */}
        <div className="text-center">
          <h2 className="text-xl font-bold">{data.personalInfo.name || "Your Name"}</h2>
          <div className="space-y-2 mt-3 text-sm">
            {data.personalInfo.email && (
              <div className="flex items-center">
                <span className="font-semibold mr-1">Email:</span> {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center">
                <span className="font-semibold mr-1">Phone:</span> {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center">
                <span className="font-semibold mr-1">Location:</span> {data.personalInfo.location}
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center">
                <span className="font-semibold mr-1">Website:</span> {data.personalInfo.website}
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">Skills</h3>
            <div className="space-y-1">
              {data.skills.map((skill) => (
                <div key={skill} className="text-sm">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && data.education[0].institution && (
          <div>
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">Education</h3>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-sm">
                  <div className="font-medium">{edu.institution}</div>
                  <div>
                    {edu.degree}
                    {edu.field && `, ${edu.field}`}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="col-span-2 space-y-6">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div>
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">Professional Summary</h3>
            <p>{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && data.experience[0].company && (
          <div>
            <h3 className="text-lg font-semibold mb-2 border-b pb-1">Work Experience</h3>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between">
                    <h4 className="font-medium">{exp.position}</h4>
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
      </div>
    </div>
  )
}

