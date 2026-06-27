import { calculateAccountAge, fetchGitHubRepos, fetchGitHubUser, getTopRepos, processLanguages } from "@/lib/github";
import { ProcessedGitHubData } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  try {

    const { username } = await params

    // Fetch GitHub data
    const user = await fetchGitHubUser(username.trim().toLowerCase())
    const repos = await fetchGitHubRepos(username.trim().toLowerCase())

    // Keep only own repositories
    const ownRepos = repos.filter((repo) => !repo.fork)

    // Process data
    const languages = processLanguages(repos)
    const topRepos = getTopRepos(repos)

    // Calculate stats
    const totalStars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
    const totalForks = ownRepos.reduce((sum, repo) => sum + repo.forks_count, 0)
    const mostUsedLanguage = Object.keys(languages)[0] ?? "Unknown"
    const ownRepoCount = ownRepos.length
    const account_age_years = calculateAccountAge(user.created_at)

    const processedGitHubData: ProcessedGitHubData = {
      user: {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        bio: user.bio,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        account_age_years,
        location: user.location,
        blog: user.blog,
        html_url: user.html_url,
      },
      languages,
      topRepos,
      stats: {
        totalStars,
        totalForks,
        mostUsedLanguage,
        ownRepoCount,
      },
    }

    return NextResponse.json(processedGitHubData, { status: 200 })
  } catch (error) {

    if (error instanceof Error) {
      const msg = error.message
      if (msg === "USER_NOT_FOUND") return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 })
      if (msg === "RATE_LIMIT") return NextResponse.json({ error: "RATE_LIMIT" }, { status: 429 })
    }

    return NextResponse.json({ error: "INTERNAL SERVER ERROR" }, { status: 500 })
  }
}