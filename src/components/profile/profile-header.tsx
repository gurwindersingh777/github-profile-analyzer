import { ProcessedGitHubData } from '@/types';
import { MapPin, LinkIcon, CalendarClock } from 'lucide-react'
import { GithubIcon } from '../home/github-icon';


function formatBlog(blog: string) {
  return blog.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

function ensureProtocol(blog: string) {
  return /^https?:\/\//.test(blog) ? blog : `https://${blog}`
}

export function ProfileHeader({ user }: { user: ProcessedGitHubData["user"] }) {
  
  return (
    <header className="flex flex-col gap-5 border-2 border-border bg-card p-5 text-card-foreground shadow-brutal sm:flex-row sm:items-start sm:gap-6 sm:p-6">
      <img
        src={user.avatar_url || '/placeholder.svg'}
        alt={`${user.name ?? user.login} avatar`}
        width={112}
        height={112}
        crossOrigin="anonymous"
        className="h-24 w-24 shrink-0 rounded-full border-2 border-border object-cover shadow-brutal-sm sm:h-28 sm:w-28"
      />

      <div className="flex-1 space-y-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{user.name ?? user.login}</h1>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            <GithubIcon className="h-4 w-4" />@{user.login}
          </a>
        </div>

        {user.bio ?
          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">{user.bio}</p> : null
        }

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          {user.location ?
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" />{user.location}
            </span>
            : null}

          {user.blog ? (
            <a
              href={ensureProtocol(user.blog)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary hover:underline"
            >
              <LinkIcon className="h-4 w-4" aria-hidden="true" />{formatBlog(user.blog)}
            </a>
          ) : null}

          <span className="inline-flex items-center gap-1.5">
            <CalendarClock className="h-4 w-4" aria-hidden="true" />
            GitHub member for {user.account_age_years}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <Stat label="repos" value={user.public_repos} />
          <Stat label="followers" value={user.followers} />
          <Stat label="following" value={user.following} />
        </div>
      </div>
    </header>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <span className="inline-flex items-baseline gap-1.5 border-2 border-border bg-muted px-3 py-1 text-sm">
      <strong className="font-black tabular-nums text-foreground">
        {value.toLocaleString()}
      </strong>
      <span className="text-muted-foreground">{label}</span>
    </span>
  )
}
