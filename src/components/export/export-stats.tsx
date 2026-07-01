'use client'

import { ProcessedGitHubData } from '@/types'
import {
  Star,
  GitFork,
  FolderGit2,
  Code2,
  type LucideIcon,
} from 'lucide-react'

interface Props {
  stats: ProcessedGitHubData['stats']
}

interface StatCard {
  icon: LucideIcon
  label: string
  value: string
  iconBg: string
  iconFg: string
}

export function ExportStats({ stats }: Props) {
  const cards: StatCard[] = [
    {
      icon: Star,
      label: 'Total Stars',
      value: stats.totalStars.toLocaleString(),
      iconBg: 'bg-secondary',
      iconFg: 'text-secondary-foreground',
    },
    {
      icon: GitFork,
      label: 'Total Forks',
      value: stats.totalForks.toLocaleString(),
      iconBg: 'bg-accent',
      iconFg: 'text-accent-foreground',
    },
    {
      icon: FolderGit2,
      label: 'Own Repositories',
      value: stats.ownRepoCount.toLocaleString(),
      iconBg: 'bg-primary',
      iconFg: 'text-primary-foreground',
    },
    {
      icon: Code2,
      label: 'Most Used Language',
      value: stats.mostUsedLanguage,
      iconBg: 'bg-destructive',
      iconFg: 'text-destructive-foreground',
    },
  ]

  return (
    <section className="grid grid-cols-4 gap-5">
      {cards.map((card) => (
        <article
          key={card.label}
          className="border-2 border-border bg-card p-6 shadow-brutal"
        >
          <div
            className={`flex h-14 w-14 items-center justify-center border-2 border-border ${card.iconBg} ${card.iconFg}`}
          >
            <card.icon className="h-7 w-7" />
          </div>

          <p className="mt-6 wrap-break-word text-4xl font-black tracking-tight">{card.value}</p>
          <p className="mt-2 text-base font-semibold text-muted-foreground">{card.label}</p>
        </article>
      ))}
    </section>
  )
}