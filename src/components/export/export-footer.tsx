'use client'

import { GithubIcon } from '../home/github-icon'

export function ExportFooter() {
  const generatedOn = new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date())

  return (
    <footer className="border-2 border-border bg-card px-8 py-5 shadow-brutal">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-lg font-black">GitHub Developer Report</p>
          <p className="mt-1 text-sm text-muted-foreground">Generated on {generatedOn}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center border-2 border-border bg-primary text-primary-foreground">
            <GithubIcon className="h-6 w-6" />
          </div>

          <div className="text-right">
            <p className="font-black">GitHub Insights</p>
            <p className="text-sm text-muted-foreground">github-profile-analyzer-insights.vercel.app</p>
          </div>
        </div>

      </div>
    </footer>
  )
}