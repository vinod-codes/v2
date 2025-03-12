"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Download, Palette, Share2, Type, Bold, LayoutGrid } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

interface ResumeCustomizationPanelProps {
  template: string
  setTemplate: (value: string) => void
  textColor: string
  setTextColor: (value: string) => void
  fontFamily: string
  setFontFamily: (value: string) => void
  headingColor: string
  setHeadingColor: (value: string) => void
  borderWidth: number
  setBorderWidth: (value: number) => void
  boldHeadings: boolean
  setBoldHeadings: (value: boolean) => void
}

export const ResumeCustomizationPanel = ({
  template,
  setTemplate,
  textColor,
  setTextColor,
  fontFamily,
  setFontFamily,
  headingColor,
  setHeadingColor,
  borderWidth,
  setBorderWidth,
  boldHeadings,
  setBoldHeadings,
}: ResumeCustomizationPanelProps) => {
  return (
    <Card className="border border-border h-full">
      <CardHeader>
        <CardTitle>Resume Customization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="template">Template</Label>
          <Select value={template} onValueChange={setTemplate}>
            <SelectTrigger id="template">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
              <SelectItem value="simple">Simple</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Color options */}
        <div className="space-y-4">
          <h4 className="font-medium">Color Options</h4>

          <div className="space-y-2">
            <Label htmlFor="textColor" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Text Color
            </Label>
            <div className="flex gap-2">
              <Input
                id="textColor"
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-10 h-10 p-1 cursor-pointer"
              />
              <Input type="text" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="flex-1" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="headingColor" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Heading Color
            </Label>
            <div className="flex gap-2">
              <Input
                id="headingColor"
                type="color"
                value={headingColor}
                onChange={(e) => setHeadingColor(e.target.value)}
                className="w-10 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={headingColor}
                onChange={(e) => setHeadingColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Font options */}
        <div className="space-y-2">
          <Label htmlFor="fontFamily" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Font Family
          </Label>
          <Select value={fontFamily} onValueChange={setFontFamily}>
            <SelectTrigger id="fontFamily">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inter, sans-serif">Inter</SelectItem>
              <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
              <SelectItem value="'Playfair Display', serif">Playfair Display</SelectItem>
              <SelectItem value="'Montserrat', sans-serif">Montserrat</SelectItem>
              <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
              <SelectItem value="'Poppins', sans-serif">Poppins</SelectItem>
              <SelectItem value="'Lato', sans-serif">Lato</SelectItem>
              <SelectItem value="'Merriweather', serif">Merriweather</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Text formatting options */}
        <div className="space-y-4">
          <h4 className="font-medium">Text Formatting</h4>

          <div className="flex items-center justify-between">
            <Label htmlFor="boldHeadings" className="flex items-center gap-2 cursor-pointer">
              <Bold className="h-4 w-4" />
              Bold Headings
            </Label>
            <Switch id="boldHeadings" checked={boldHeadings} onCheckedChange={setBoldHeadings} />
          </div>
        </div>

        {/* Border options */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            Border Options
          </h4>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="borderWidth">Border Width</Label>
              <span className="text-sm text-muted-foreground">{borderWidth}px</span>
            </div>
            <Slider
              id="borderWidth"
              min={0}
              max={5}
              step={1}
              value={[borderWidth]}
              onValueChange={(value) => setBorderWidth(value[0])}
            />
          </div>
        </div>

        <div className="space-y-4 mt-8">
          <h4 className="font-medium">Download Options</h4>
          <div className="space-y-2">
            <Button className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download as PDF
            </Button>
            <Button variant="outline" className="w-full">
              Download as Word
            </Button>
            <Button variant="outline" className="w-full">
              <Share2 className="mr-2 h-4 w-4" />
              Share Resume
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

