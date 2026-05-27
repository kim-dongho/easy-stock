"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRecommendations } from "@/entities/recommendation/api/use-recommendations";
import RecommendationCard from "@/entities/recommendation/ui/recommendation-card";
import RecommendationCardSkeleton from "@/entities/recommendation/ui/recommendation-card-skeleton";
import MarketToggle from "@/features/market-filter/ui/market-toggle";
import { Clock } from "lucide-react";

export default function Home() {
  return (
    <Suspense fallback={null}>
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
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-on-surface">
            추천 종목
          </h1>
          {data?.date && (
            <div className="mt-1 flex items-center gap-1 text-sm text-on-surface-variant">
              <Clock size={14} />
              {data.date} 기준
            </div>
          )}
        </div>
        <MarketToggle />
      </div>

      {/* 에러 */}
      {error && (
        <p className="mt-4 text-sm text-error">
          {error instanceof Error
            ? error.message
            : "데이터를 불러올 수 없습니다."}
        </p>
      )}

      {/* 로딩 */}
      {isLoading && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <RecommendationCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* 빈 상태 */}
      {!isLoading && data && (!data.items || data.items.length === 0) && (
        <p className="mt-8 text-sm text-on-surface-variant">
          현재 추천 조건에 해당하는 종목이 없습니다.
        </p>
      )}

      {/* 카드 그리드 */}
      {data?.items && data.items.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item) => (
            <RecommendationCard key={item.symbol} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
