import { ProcessedGitHubData } from '@/types'
import { Star, GitFork, FolderGit2, Code2, type LucideIcon } from 'lucide-react'

interface StatCard {
  icon: LucideIcon
  label: string
  value: string
  iconBg: string
  iconFg: string
}

export function StatsGrid({ stats }: { stats: ProcessedGitHubData["stats"] }) {
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
      label: 'Own Repos',
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
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="border-2 border-border bg-card p-4 shadow-brutal-sm transition-shadow hover:shadow-brutal sm:p-5"
        >
          <div
            className={`mb-3 flex h-10 w-10 items-center justify-center border-2 border-border ${card.iconBg} ${card.iconFg}`}
          >
            <card.icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="truncate text-2xl font-black tabular-nums tracking-tight text-card-foreground sm:text-3xl">
            {card.value}
          </p>
          <p className="mt-0.5 text-xs font-medium text-muted-foreground sm:text-sm">{card.label}</p>
        </div>
      ))}
    </div>
  )
}
