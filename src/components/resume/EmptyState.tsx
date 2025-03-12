"use client"

import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  message: string
  buttonText: string
  onButtonClick: () => void
}

export const EmptyState = ({ message, buttonText, onButtonClick }: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground mb-4">{message}</p>
      <Button onClick={onButtonClick}>{buttonText}</Button>
    </div>
  )
}

