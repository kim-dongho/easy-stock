"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRecommendations } from "@/entities/recommendation/api/use-recommendations";
import RecommendationCard from "@/entities/recommendation/ui/recommendation-card";
import RecommendationCardSkeleton from "@/entities/recommendation/ui/recommendation-card-skeleton";
import MarketToggle from "@/features/market-filter/ui/market-toggle";

export default function Home() {
  return (
    <Suspense
      fallback={<p className="text-sm text-zinc-500">불러오는 중...</p>}
    >
      <RecommendationPage />
    </Suspense>
  );
}

function RecommendationPage() {
  const searchParams = useSearchParams();
  const market = searchParams.get("market") ?? undefined;
  const { data, error, isLoading } = useRecommendations(market);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            추천 종목
          </h1>
          <MarketToggle />
        </div>
        {data?.date && (
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {data.date} 기준
          </span>
        )}
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-500">
          {error instanceof Error
            ? error.message
            : "데이터를 불러올 수 없습니다."}
        </p>
      )}

      {isLoading && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <RecommendationCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && data && (!data.items || data.items.length === 0) && (
        <p className="mt-4 text-sm text-zinc-500">
          현재 추천 조건에 해당하는 종목이 없습니다.
        </p>
      )}

      {data?.items && data.items.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item) => (
            <RecommendationCard key={item.symbol} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
