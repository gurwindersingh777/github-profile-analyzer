'use client'

import { ProcessedGitHubData } from '@/types'
import {
  Award,
  BookOpen,
  CalendarClock,
  Code2,
  FolderGit2,
  Users,
} from 'lucide-react'

interface Props {
  score: ProcessedGitHubData['developerScore']
}

interface Metric {
  label: string
  value: number
  color: string
  iconBg: string
  iconFg: string
  icon: React.ElementType
}

export function ExportScore({ score }: Props) {
  const metrics: Metric[] = [
    {
      label: 'Portfolio',
      value: score.portfolio,
      color: 'bg-secondary',
      iconBg: 'bg-secondary',
      iconFg: 'text-secondary-foreground',
      icon: FolderGit2,
    },
    {
      label: 'Technology',
      value: score.technology,
      color: 'bg-accent',
      iconBg: 'bg-accent',
      iconFg: 'text-accent-foreground',
      icon: Code2,
    },
    {
      label: 'Documentation',
      value: score.documentation,
      color: 'bg-destructive',
      iconBg: 'bg-destructive',
      iconFg: 'text-destructive-foreground',
      icon: BookOpen,
    },
    {
      label: 'Community',
      value: score.community,
      color: 'bg-primary',
      iconBg: 'bg-primary',
      iconFg: 'text-primary-foreground',
      icon: Users,
    },
    {
      label: 'Consistency',
      value: score.consistency,
      color: 'bg-violet-500',
      iconBg: 'bg-violet-500',
      iconFg: 'text-white',
      icon: CalendarClock,
    },
  ]

  return (
    <section className="border-2 border-border bg-card p-8 shadow-brutal">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center border-2 border-border bg-primary text-primary-foreground">
          <Award className="h-7 w-7" />
        </div>

        <div>
          <h2 className="text-2xl font-black">GitHub Developer Score</h2>
          <p className="text-base text-muted-foreground">Calculated from repositories and activity</p>
        </div>
      </div>

      {/* Overall */}
      <div className="mt-8 border-2 border-border bg-primary p-8 text-center text-primary-foreground shadow-brutal-sm">

        <p className="text-lg font-bold uppercase tracking-widest">Overall Score</p>
        <div className="mt-3 flex items-end justify-center gap-3">
          <span className="text-8xl font-black leading-none">{score.overall}</span>
          <span className="pb-2 text-xl font-bold">/100</span>
        </div>

      </div>

      {/* Breakdown */}
      <div className="mt-8 space-y-5">
        {metrics.map((metric) => (
          <MetricRow
            key={metric.label}
            metric={metric}
          />
        ))}
      </div>
    </section>
  )
}

function MetricRow({ metric }: { metric: Metric }) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center border-2 border-border ${metric.iconBg} ${metric.iconFg}`}
          >
            <metric.icon className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold">{metric.label}</span>
        </div>
        <span className="text-2xl font-black">{metric.value}</span>
      </div>

      <div className="h-5 overflow-hidden border-2 border-border bg-muted">

        <div
          className={metric.color}
          style={{
            width: `${metric.value}%`,
            height: '100%',
          }}
        />
      </div>
    </div>
  )
}