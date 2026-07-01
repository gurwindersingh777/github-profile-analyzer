'use client'

import { ProcessedRepo } from '@/types'
import { ArrowUpRight, GitFork, Star } from 'lucide-react'

interface Props {
  repos: ProcessedRepo[]
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Rust: '#dea584',
  Go: '#00add8',
  Python: '#3572a5',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Java: '#b07219',
  'C++': '#f34b7d',
  Ruby: '#701516',
}

export function ExportTopRepos({ repos }: Props) {
  return (
    <section className="border-2 border-border bg-card p-8 shadow-brutal">
      <h2 className="mb-6 text-2xl font-black">Top Repositories</h2>
      <div className="overflow-hidden border-2 border-border">

        {repos.map((repo, index) => (
          <RepoRow
            key={repo.name}
            repo={repo}
            isLast={index === repos.length - 1}
          />
        ))}

      </div>
    </section>
  )
}

function RepoRow({ repo, isLast }: { repo: ProcessedRepo, isLast: boolean }) {
  const color = repo.language ? LANGUAGE_COLORS[repo.language] ?? '#9ca3af' : '#9ca3af'

  return (
    <div
      className={`grid grid-cols-[1fr_auto] gap-6 bg-background p-5 ${!isLast && 'border-b-2 border-border'}`}
    >
      {/* Left */}

      <div>

        <h3 className="text-xl font-black">{repo.name}</h3>
        {repo.description &&
          <p className="mt-2 line-clamp-2 text-base text-muted-foreground">{repo.description}</p>
        }

        {repo.language && (
          <div className="mt-4 flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full border border-border"
              style={{ backgroundColor: color }}
            />
            <span className="font-semibold">{repo.language}</span>
          </div>
        )}

      </div>

      {/* Right */}

      <div className="flex items-center gap-8 text-lg">

        <div className="flex items-center gap-2 font-bold">
          <Star className="h-5 w-5" />
          {repo.stars.toLocaleString()}
        </div>

        <div className="flex items-center gap-2 font-bold">
          <GitFork className="h-5 w-5" />
          {repo.forks.toLocaleString()}
        </div>

      </div>
    </div>
  )
}