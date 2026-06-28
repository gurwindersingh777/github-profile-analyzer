'use client'

import { Star } from 'lucide-react'
import { GithubIcon } from './github-icon'


const REPO_URL = 'https://github.com/gurwindersingh777/github-profile-analyzer'

export function GithubStarButton() {
  return (
    <a
      href={REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-11 items-center gap-2 border-2 border-border bg-secondary px-3 text-sm font-bold text-secondary-foreground shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none"
    >
      <GithubIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Star on GitHub</span>
      <span className="flex items-center gap-1 border-l-2 border-border pl-2">
        <Star className="h-4 w-4 fill-current transition-transform group-hover:rotate-72 group-hover:scale-110" />
      </span>
    </a>
  )
}
