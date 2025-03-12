"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface JobSearchFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  filterType: string
  setFilterType: (value: string) => void
}

export const JobSearchFilters = ({ searchTerm, setSearchTerm, filterType, setFilterType }: JobSearchFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={filterType} onValueChange={setFilterType}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Full-time">Full-time</SelectItem>
          <SelectItem value="Part-time">Part-time</SelectItem>
          <SelectItem value="Contract">Contract</SelectItem>
          <SelectItem value="Remote">Remote</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

