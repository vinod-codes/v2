"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { SlidersHorizontal } from "lucide-react"

export interface JobFilters {
  type: string
  searchTerm: string
  salary: [number, number]
  remote: boolean
  experience: string
}

interface JobAdvancedFiltersProps {
  filters: JobFilters
  onFiltersChange: (filters: JobFilters) => void
}

export const JobAdvancedFilters = ({ filters, onFiltersChange }: JobAdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSalaryChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      salary: [value[0], value[1]],
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Advanced Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Job Filters</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Experience Level</Label>
            <Select
              value={filters.experience}
              onValueChange={(value) => onFiltersChange({ ...filters, experience: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level</SelectItem>
                <SelectItem value="senior">Senior Level</SelectItem>
                <SelectItem value="lead">Lead/Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Salary Range (K)</Label>
            <Slider
              min={30}
              max={200}
              step={5}
              value={[filters.salary[0], filters.salary[1]]}
              onValueChange={handleSalaryChange}
              className="mt-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.salary[0]}K</span>
              <span>${filters.salary[1]}K</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label>Remote Only</Label>
            <Switch
              checked={filters.remote}
              onCheckedChange={(checked) => onFiltersChange({ ...filters, remote: checked })}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

