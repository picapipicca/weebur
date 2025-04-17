// 'use client'
import { QueryClient } from "@tanstack/react-query";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000, // 1 min
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
