"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 10, // 10 min , GitHub profile data doesn't change every second
          gcTime: 1000 * 60 * 30, // Keep data in cache for 30 min after unused
          refetchOnWindowFocus: false, // Do not fetch again on tabs switch 
          retry: (count, err) => {
            if (axios.isAxiosError(err) && err.response?.status === 404) return false; //Do not retry when user not exist
            return count < 2
          }
        }
      }
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
