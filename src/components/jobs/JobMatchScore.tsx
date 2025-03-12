import { CircularProgress } from "@/components/ui/circular-progress"

interface JobMatchScoreProps {
  score: number
  size?: "sm" | "md" | "lg"
}

export const JobMatchScore = ({ score, size = "md" }: JobMatchScoreProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="relative flex items-center justify-center">
      <CircularProgress value={score} className={`${sizeClasses[size]} ${getScoreColor(score)}`} />
      <span className={`absolute ${getScoreColor(score)} font-semibold`}>{score}%</span>
    </div>
  )
}

