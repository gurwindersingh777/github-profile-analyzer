import { ProcessedGitHubData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function useGithubProfile(username: string) {
  return useQuery({
    queryKey: ["github", username],
    queryFn: async () => {
      const response = await axios.get<ProcessedGitHubData>(`/api/github/${username}`)
      return response.data
    },
    enabled: !!username, // enabled only when username exists, username = "" -> false : "abc" -> true
  })
}