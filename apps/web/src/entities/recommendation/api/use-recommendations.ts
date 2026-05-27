"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/shared/api/client";
import type { RecommendationsResponse } from "../model/types";

export function useRecommendations(market?: string) {
  return useQuery<RecommendationsResponse>({
    queryKey: ["recommendations", market],
    queryFn: async () => {
      const { data } = await apiClient.get<RecommendationsResponse>(
        "/recommendations",
        { params: { market } },
      );
      return data;
    },
  });
}
