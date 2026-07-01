'use client'

import { forwardRef } from 'react'
import { ProcessedGitHubData } from '@/types'
import { ExportHeader } from './export-header'
import { ExportStats } from './export-stats'
import { ExportScore } from './export-score'
import { ExportLanguageChart } from './export-language-chart'
import { ExportTopRepos } from './export-top-repos'
import { ExportFooter } from './export-footer'

interface Props {
  data: ProcessedGitHubData
}

export const ExportProfile = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  return (
    <div ref={ref} className="w-300 bg-background p-10 text-foreground">

      <div className="space-y-8">
        <ExportHeader user={data.user} />
        <ExportStats stats={data.stats} />

        <div className="grid grid-cols-[1.15fr_0.85fr] gap-6">
          <ExportScore score={data.developerScore} />
          <ExportLanguageChart languages={data.languages} />
        </div>

        <ExportTopRepos repos={data.topRepos} />
        <ExportFooter />

      </div>
    </div>
  )
}
)

ExportProfile.displayName = 'ExportProfile'