import { AIInsights, ProcessedGitHubData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useAiInsights(githubData: ProcessedGitHubData) {
  return useQuery({
    queryKey: ["ai-insights", githubData?.user.login],
    queryFn: async () => {
      const response = await axios.post<AIInsights>("/api/analyze",githubData)
      return response.data
    },
    enabled: !!githubData,
    staleTime: Infinity, // do not refetch automatically 
  })
}