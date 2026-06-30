import { GitHubRepo, GitHubUser, ProcessedGitHubData, ProcessedRepo } from "@/types";
import axios from "axios";

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  try {
    const response = await axios.get<GitHubUser>(`https://api.github.com/users/${username}`, { headers })
    return response.data

  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    if (error.response?.status === 404) throw new Error("USER_NOT_FOUND");
    if (error.response?.status === 403) throw new Error("RATE_LIMIT");
    throw new Error("GITHUB_ERROR");
  }
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await axios.get<GitHubRepo[]>(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers })
    return response.data

  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;
    throw new Error("GITHUB_ERROR");
  }
}

export function processLanguages(repos: GitHubRepo[]) {
  // Keep only own repos
  const filteredRepos = repos.filter((repo) => !repo.fork && !repo.archived && repo.language !== null)

  // Count languages
  const languageCount: Record<string, number> = {};

  for (const repo of filteredRepos) {
    languageCount[repo.language!] = (languageCount[repo.language!] ?? 0) + 1;
  }

  // Total repos
  const total = Object.values(languageCount).reduce((sum, count) => sum + count, 0)
  if (total === 0) return {}

  return Object.fromEntries(
    Object.entries(languageCount)
      .map(([language, count]) => [language, Math.round((count / total) * 100)] as [string, number])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
  ) // {TypeScript:40, JavaScript:40, CSS:20}
}

// Get top 6 repos by stars
export function getTopRepos(repos: GitHubRepo[]): ProcessedRepo[] {
  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      url: repo.html_url,
      topics: repo.topics,
    }))
}

export function calculateAccountAge(createdAt: string): string {
  const created = new Date(createdAt)
  const now = new Date()

  const months = (now.getFullYear() - created.getFullYear()) * 12 + (now.getMonth() - created.getMonth())

  if (months < 1) {
    const days = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
    return `${days} ${days === 1 ? 'day' : 'days'}`
  }

  if (months < 12) {
    return `${months} ${months === 1 ? 'month' : 'months'}`
  }

  const years = Math.floor(months / 12)
  return `${years} ${years === 1 ? 'year' : 'years'}`
}

// every score is between 0–100
function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)))
}

export function calculateDeveloperScore(user: GitHubUser, repos: GitHubRepo[]): ProcessedGitHubData["developerScore"] {

  // Filter repositories
  const ownRepos = repos.filter(repo => !repo.fork)
  const activeRepos = ownRepos.filter(repo => !repo.archived)
  const totalRepos = ownRepos.length || 1

  // Documentation score
  const reposWithDescription = ownRepos.filter(repo => repo.description?.trim()).length
  const reposWithTopics = ownRepos.filter(repo => repo.topics.length > 0).length
  const descriptionCoverage = reposWithDescription / totalRepos
  const topicCoverage = reposWithTopics / totalRepos
  const documentation = clamp(descriptionCoverage * 70 + topicCoverage * 30)
  // Example --> 100 repos, 90 descriptions, 50 topics
  // documentation --> 0.9 × 70 + 0.5 × 30 = 78

  // Technology score
  const uniqueLanguages = new Set(ownRepos.map(repo => repo.language).filter(Boolean))
  const technology = clamp(uniqueLanguages.size * 12 + activeRepos.length * 0.6)
  // Example --> 6 languages, 70 active repos
  // technology --> 6 × 12 + 70 × 0.6 = 114 -> clamp(114) = 100

  // Community score
  const totalStars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const totalForks = ownRepos.reduce((sum, repo) => sum + repo.forks_count, 0)
  const community = clamp(user.followers * 0.4 + totalForks * 2 + Math.min(totalStars, 30))

  // Portfolio score
  const portfolio = clamp(ownRepos.length * 0.7 + uniqueLanguages.size * 8 + Math.min(totalStars, 30))

  // Consistency score
  const accountYears = (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365)
  const consistency = clamp(accountYears * 10 + activeRepos.length * 0.6)

  // Overall
  const overall = clamp(
    portfolio * 0.30 +
    documentation * 0.20 +
    technology * 0.20 +
    consistency * 0.15 +
    community * 0.15
  )

  return {
    overall,
    portfolio,
    documentation,
    community,
    consistency,
    technology,
  }
} 