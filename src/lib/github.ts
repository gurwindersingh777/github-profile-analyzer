import { GitHubRepo, GitHubUser, ProcessedRepo } from "@/types";
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

export function calculateAccountAge(createdAt: string): number {
  const createdDate = new Date(createdAt)
  const diff = Date.now() - createdDate.getTime()
  const years = diff / (1000 * 60 * 60 * 24 * 365)

  return Math.floor(years)
}