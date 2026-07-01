'use client'

import { ProcessedGitHubData } from '@/types'
import { CalendarClock, LinkIcon, MapPin } from 'lucide-react'
import { GithubIcon } from '../home/github-icon'

interface Props {
  user: ProcessedGitHubData['user']
}

function formatBlog(blog: string) {
  return blog.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

function ensureProtocol(blog: string) {
  return /^https?:\/\//.test(blog) ? blog : `https://${blog}`
}

export function ExportHeader({ user }: Props) {
  return (
    <header className="border-2 border-border bg-card p-8 shadow-brutal">
      {/* Top */}
      <div className="flex items-start gap-6">
        <img
          src={user.avatar_url}
          alt={user.name ?? user.login}
          crossOrigin="anonymous"
          className="h-32 w-32 rounded-full border-2 border-border object-cover shadow-brutal-sm"
        />

        <div className="flex-1">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black tracking-tight">{user.name ?? user.login}</h1>

              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 font-bold text-primary"
              >
                <GithubIcon className="h-5 w-5" />
                @{user.login}
              </a>
            </div>

            <div className="border-2 border-border bg-primary px-5 py-3 text-primary-foreground shadow-brutal-sm">
              <p className="text-xs font-bold uppercase tracking-wider">GitHub Insights</p>
              <p className="mt-1 text-lg font-black">Developer Report</p>
            </div>
          </div>

          {user.bio &&
            <p className="mt-5 max-w-4xl text-lg leading-relaxed text-muted-foreground">{user.bio}</p>}

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-base">

            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{user.location}</span>
              </div>
            )}

            {user.blog && (
              <div className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />

                <a
                  href={ensureProtocol(user.blog)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {formatBlog(user.blog)}
                </a>
              </div>
            )}

            <div className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5" />
              <span>GitHub member for {user.account_age_years}</span>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">

        <HeaderStat
          label="Repositories"
          value={user.public_repos}
        />

        <HeaderStat
          label="Followers"
          value={user.followers}
        />

        <HeaderStat
          label="Following"
          value={user.following}
        />

      </div>
    </header>
  )
}

function HeaderStat({ label, value }: { label: string, value: number }) {
  return (
    <div className="border-2 border-border bg-muted p-4 text-center shadow-brutal-sm">
      <p className="text-3xl font-black">{value.toLocaleString()}</p>
      <p className="mt-1 font-semibold text-muted-foreground">{label}</p>
    </div>
  )
}