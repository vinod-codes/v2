import type { ResumeData } from "@/types/resume"

interface CompactTemplateProps {
  data: ResumeData
  textColor: string
  fontFamily: string
}

export const CompactTemplate = ({ data, textColor, fontFamily }: CompactTemplateProps) => {
  return (
    <div className="text-left" style={{ color: textColor, fontFamily }}>
      {/* Header/Personal Info */}
      <div className="bg-primary/10 p-4 rounded">
        <h2 className="text-xl font-bold">{data.personalInfo.name || "Your Name"}</h2>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 text-xs">
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

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mt-3 text-sm">
          <p>{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Grid layout for content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Left column */}
        <div className="space-y-4">
          {/* Experience */}
          {data.experience.length > 0 && data.experience[0].company && (
            <div>
              <h3 className="text-sm uppercase font-semibold tracking-wider mb-2 border-b pb-1">Experience</h3>
              <div className="space-y-3">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="text-sm">
                    <div className="font-bold">{exp.position}</div>
                    <div className="flex justify-between">
                      <div className="font-medium">{exp.company}</div>
                      <div className="text-xs text-muted-foreground">
                        {exp.startDate} - {exp.endDate}
                      </div>
                    </div>
                    <p className="mt-1 text-xs">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Education */}
          {data.education.length > 0 && data.education[0].institution && (
            <div>
              <h3 className="text-sm uppercase font-semibold tracking-wider mb-2 border-b pb-1">Education</h3>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <div className="font-bold">{edu.institution}</div>
                    <div className="flex justify-between">
                      <div>
                        {edu.degree}
                        {edu.field && `, ${edu.field}`}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h3 className="text-sm uppercase font-semibold tracking-wider mb-2 border-b pb-1">Skills</h3>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill) => (
                  <span key={skill} className="bg-primary/5 px-2 py-0.5 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

