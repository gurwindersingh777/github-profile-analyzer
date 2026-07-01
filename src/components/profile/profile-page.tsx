'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ProfileHeader } from './profile-header'
import { StatsGrid } from './stats-grid'
import { LanguageChart } from './language-chart'
import { TopRepos } from './top-repos'
import {
  ProfileHeaderSkeleton, StatsGridSkeleton, LanguageChartSkeleton, TopReposSkeleton, AIInsightsSkeleton,
  GitHubProfileScoreSkeleton,
} from '@/components/skeletons/profile-skeletons'
import useGithubProfile from '@/hooks/useGithubProfile'
import useAiInsights from '@/hooks/useAiInsights'
import { ProcessedGitHubData } from '@/types'
import { AIInsights } from './ai-insights'
import { AxiosError } from 'axios'
import { GitHubProfileScore } from './github-profile-score'

export function ProfilePage({ username }: { username: string }) {

  const { data, isError, error } = useGithubProfile(username)
  const { data: insights, isLoading, isError: insightsError } = useAiInsights(data as ProcessedGitHubData)

  if (isError) {
    const status = (error as AxiosError)?.response?.status

    const errorContent = {
      title: 'Something went wrong',
      description: 'An unexpected error occurred. Please try again later.',
    }

    switch (status) {
      case 404:
        errorContent.title = 'Profile not found'
        errorContent.description = "We couldn't find this GitHub user. Please check the username and try again."
        break

      case 429:
        errorContent.title = 'Rate limit exceeded'
        errorContent.description = 'GitHub API rate limit has been reached. Please wait a few minutes and try again.'
        break

      case 500:
        errorContent.title = 'Server error'
        errorContent.description = 'GitHub is currently experiencing issues. Please try again later.'
        break
    }

    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 border-2 border-border bg-card px-3 py-1.5 text-sm font-bold text-card-foreground shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          New search
        </Link>

        <div className="rounded-lg border-2 border-destructive bg-card p-8 shadow-brutal">
          <h2 className="text-2xl font-bold text-destructive">{errorContent.title}</h2>
          <p className="mt-2 text-muted-foreground">{errorContent.description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 border-2 border-border bg-card px-3 py-1.5 text-sm font-bold text-card-foreground shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        New search
      </Link>

      <div className="space-y-6">
        {data ? <ProfileHeader user={data.user} /> : <ProfileHeaderSkeleton />}
        {data ? <StatsGrid stats={data.stats} /> : <StatsGridSkeleton />}

        <div className="grid gap-6 lg:grid-cols-2">
          {data ? <LanguageChart languages={data.languages} /> : <LanguageChartSkeleton />}
          {data ? <TopRepos repos={data.topRepos} /> : <TopReposSkeleton />}
        </div>

        {data ? <GitHubProfileScore score={data.developerScore} /> : <GitHubProfileScoreSkeleton />}

        {isLoading ? <AIInsightsSkeleton /> : <AIInsights insights={insights} isError={insightsError} />}
      </div>
    </div>
  )
}
