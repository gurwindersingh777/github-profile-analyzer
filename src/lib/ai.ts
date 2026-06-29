import { ProcessedGitHubData } from "@/types"
import OpenAI from "openai";

export const ai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
})


export function buildPrompt(data: ProcessedGitHubData): string {

  const languages = Object.entries(data.languages)
    .map(([language, percentage]) => `- ${language}: ${percentage}%`)
    .join("\n")

  const repos = data.topRepos.map((repo) => `
    ${repo.name}
    Stars: ${repo.stars}
    Description: ${repo.description ?? "No description"}
    Language: ${repo.language ?? "Unknown"}`)
    .join("\n")


  return `
    You are a senior software developer analyzing a GitHub profile.
    Give an insightful, honest, and specific analysis based purely on the data provided.
    Do not make up information that is not in the data.
    Avoid generic advice.
    Every strength, improvement, and suggestion must be supported by the provided GitHub data.
    If there isn't enough evidence, state that instead of guessing.

    PROFILE:

    - Username: ${data.user.login}
    - Name: ${data.user.name || "Not provided"}
    - Bio: ${data.user.bio || "Not provided"}
    - Account Age: ${data.user.account_age_years}
    - Public Repos: ${data.user.public_repos}
    - Followers: ${data.user.followers} | Following: ${data.user.following}
    - Total Stars Earned: ${data.stats.totalStars}
    - Total Forks: ${data.stats.totalForks}
    - Location: ${data.user.location || "Not provided"}

    LANGUAGES (percentage of own repos using each):

    ${languages}

    TOP REPOSITORIES (sorted by stars):

    ${repos}

    Respond ONLY with a valid JSON object.
    No markdown. No explanation. No preamble. Just raw JSON.

    {
    "summary": "2-3 sentence honest developer personality. Be specific to this data.",
    "archetype": "Exactly one of: The Builder | The Explorer | The Specialist | The Hacker | The Architect | The Open Source Contributor | The Beginner | The Polyglot",
    "archetypeDescription": "One sentence about what this archetype means for this specific developer",
    "strengths": ["strength based on data", "strength", "strength","strength"],
    "improvements": ["area to improve based on data", "area to improve" ,"area to improve"],
    "suggestions": ["specific actionable suggestion", "suggestion", "suggestion"], 
    "careerLevel": "Beginner | Junior | Intermediate | Advanced | Expert",
    "confidenceScore": 85,  // between 1 to 100
    "bestFitRoles": ["",""],  
    "learningFocus": ["",""] // keep it short .
    }  
  `
}