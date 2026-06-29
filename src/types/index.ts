
export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  public_repos: number
  followers: number
  following: number
  blog: string
  location: string | null
  html_url: string
  bio: string | null
  created_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  fork: boolean
  archived: boolean
  topics: string[]
}

export interface ProcessedRepo {
  name: string
  description: string | null
  stars: number
  forks: number
  language: string | null
  url: string
  topics: string[]
}

export interface ProcessedGitHubData {
  user: {
    login: string
    name: string | null
    avatar_url: string
    bio: string | null
    public_repos: number
    followers: number
    following: number
    account_age_years: string
    location: string | null
    blog: string
    html_url: string
  },
  languages: Record<string, number>,
  topRepos: ProcessedRepo[],
  stats: {
    totalStars: number
    totalForks: number
    mostUsedLanguage: string
    ownRepoCount: number
  }
}

export interface AIInsights {
  summary: string
  archetype: string
  archetypeDescription: string

  strengths: string[]
  improvements: string[]
  suggestions: string[]

  careerLevel: string
  confidenceScore: number
  bestFitRoles: string[]
  learningFocus: string[]
}