/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/gfOVMBS1VEe
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Libre_Franklin } from 'next/font/google'
import { Rubik } from 'next/font/google'

libre_franklin({
  subsets: ['latin'],
  display: 'swap',
})

rubik({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function AssesmentComponent() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Assessment</h1>
          <p className="mt-2 text-muted-foreground">
            Please answer the following questions to the best of your ability.
          </p>
        </div>
        <div className="space-y-6">
          <div className="grid gap-4">
            <div>
              <label htmlFor="question-1" className="block font-medium">
                What is your current role?
              </label>
              <Input id="question-1" type="text" placeholder="Enter your role" className="mt-1 w-full" />
            </div>
            <div>
              <label htmlFor="question-2" className="block font-medium">
                How many years of experience do you have in your field?
              </label>
              <Select id="question-2" className="mt-1 w-full">
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label htmlFor="question-3" className="block font-medium">
              What are your top 3 skills?
            </label>
            <Textarea id="question-3" rows={3} placeholder="Enter your top skills" className="mt-1 w-full" />
          </div>
          <div>
            <p className="font-medium">Which of the following best describes your career goals?</p>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox name="question-4" id="goal-1" />
                <Label htmlFor="goal-1">Advance in my current field</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox name="question-4" id="goal-2" />
                <Label htmlFor="goal-2">Change careers</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox name="question-4" id="goal-3" />
                <Label htmlFor="goal-3">Start my own business</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox name="question-4" id="goal-4" />
                <Label htmlFor="goal-4">Retire soon</Label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Submit Assessment</Button>
        </div>
      </div>
    </div>
  )
}
