import { Star, GitFork, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ProcessedGitHubData, ProcessedRepo } from '@/types'


// A small palette of dot colors keyed by common languages.
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

export function TopRepos({ repos }: { repos: ProcessedGitHubData["topRepos"] }) {
  return (
    <section className="flex h-full flex-col border-2 border-border bg-card p-5 text-card-foreground shadow-brutal sm:p-6">
      <h2 className="mb-4 text-lg font-black tracking-tight">Top Repositories</h2>
      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        {repos.map((repo) => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
      </div>
    </section>
  )
}

function RepoCard({ repo }: { repo: ProcessedRepo }) {
  const extraTopics = Math.max(0, repo.topics.length - 3)
  const dotColor = repo.language
    ? LANGUAGE_COLORS[repo.language] ?? '#9ca3af'
    : '#9ca3af'

  return (
    <article className="flex h-full flex-col gap-3 border-2 border-border bg-background p-4 shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal">
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1 text-base font-black tracking-tight text-foreground hover:text-primary"
      >
        <span className="truncate">{repo.name}</span>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        />
      </a>

      {repo.description ?
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{repo.description}</p>
        : null}

      {repo.topics.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 3).map((topic) => (
            <Badge
              key={topic}
              className="border bg-muted px-1.5 py-0 text-[0.7rem] font-semibold text-muted-foreground"
            >
              {topic}
            </Badge>
          ))}
          {extraTopics > 0 ? (
            <span className="text-[0.7rem] font-semibold text-muted-foreground">+{extraTopics} more</span>
          ) : null}
        </div>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-sm text-muted-foreground">
        {repo.language ? (
          <span className="inline-flex min-w-0 items-center gap-1.5 font-medium text-foreground">
            <span
              className="h-3 w-3 shrink-0 rounded-full border border-border"
              style={{ backgroundColor: dotColor }}
              aria-hidden="true"
            />
            <span className="truncate">{repo.language}</span>
          </span>
        ) : null}
        <span className="inline-flex shrink-0 items-center gap-1 tabular-nums">
          <Star className="h-4 w-4" aria-hidden="true" />
          {repo.stars.toLocaleString()}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 tabular-nums">
          <GitFork className="h-4 w-4" aria-hidden="true" />
          {repo.forks.toLocaleString()}
        </span>
      </div>
    </article>
  )
}
