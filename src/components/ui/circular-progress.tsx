import * as React from "react"
import { cn } from "@/lib/utils"

interface CircularProgressProps extends React.SVGAttributes<SVGSVGElement> {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
}

export const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  ({ value, size = 36, strokeWidth = 3, className, ...props }, ref) => {
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (value / 100) * circumference

    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        className={cn("transform -rotate-90", className)}
        {...props}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-muted-foreground/20"
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="stroke-current"
          fill="transparent"
        />
      </svg>
    )
  },
)

CircularProgress.displayName = "CircularProgress"

