import type { ResumeData } from "@/types/resume"

interface CreativeTemplateProps {
  data: ResumeData
  textColor: string
  fontFamily: string
}

export const CreativeTemplate = ({ data, textColor, fontFamily }: CreativeTemplateProps) => {
  return (
    <div className="space-y-6 text-left relative" style={{ color: textColor, fontFamily }}>
      {/* Header with decorative element */}
      <div className="relative pb-6">
        <div className="absolute top-0 left-0 w-16 h-16 bg-primary/20 rounded-full -z-10"></div>
        <h2 className="text-3xl font-bold pl-6 pt-3">{data.personalInfo.name || "Your Name"}</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm ml-6">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>

      {/* Summary with stylized border */}
      {data.personalInfo.summary && (
        <div className="border-l-4 border-primary/50 pl-4">
          <h3 className="text-lg font-semibold mb-2 inline-flex items-center">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            About Me
          </h3>
          <p className="italic">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && data.experience[0].company && (
        <div>
          <h3 className="text-lg font-semibold mb-2 inline-flex items-center">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            Experience
          </h3>
          <div className="space-y-4 ml-3">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border-l border-primary/30 pl-4 py-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-primary">{exp.position}</h4>
                  <div className="text-sm bg-secondary/20 px-2 py-0.5 rounded-full">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <div className="text-muted-foreground font-medium">{exp.company}</div>
                <p className="mt-1 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && data.education[0].institution && (
        <div>
          <h3 className="text-lg font-semibold mb-2 inline-flex items-center">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            Education
          </h3>
          <div className="space-y-4 ml-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l border-primary/30 pl-4 py-1">
                <div className="flex justify-between">
                  <h4 className="font-medium text-primary">{edu.institution}</h4>
                  <div className="text-sm bg-secondary/20 px-2 py-0.5 rounded-full">
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
          <h3 className="text-lg font-semibold mb-2 inline-flex items-center">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            Skills
          </h3>
          <div className="flex flex-wrap gap-2 ml-3">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="bg-primary/10 border border-primary/20 text-primary rounded-full px-3 py-1 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Decorative element at bottom */}
      <div className="absolute -bottom-4 right-0 w-24 h-24 bg-primary/10 rounded-full -z-10"></div>
    </div>
  )
}

