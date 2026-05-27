import type { Recommendation } from "../model/types";

const scoreColor = (score: number, total: number) => {
  if (score >= 4) return "bg-emerald-500";
  if (score >= 3) return "bg-amber-500";
  return "bg-zinc-400";
};

const scoreLabel = (score: number, total: number) => {
  if (score >= 4) return "강력 추천";
  if (score >= 3) return "추천";
  return "관심";
};

export default function RecommendationCard({ item }: { item: Recommendation }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {/* 헤더 */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {item.name}
          </h3>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            {item.symbol} · {item.exchange}
          </p>
        </div>
        <span
          className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white ${scoreColor(item.score, 5)}`}
        >
          {scoreLabel(item.score, 5)} {item.score}/5
        </span>
      </div>

      {/* 종가 */}
      <p className="mt-3 text-lg font-bold text-zinc-900 dark:text-zinc-100">
        {item.symbol.includes(".KS") || item.symbol.includes(".KQ")
          ? `₩${item.close.toLocaleString()}`
          : `$${item.close.toLocaleString()}`}
      </p>

      {/* 시그널 */}
      <div className="mt-3 flex flex-col gap-2">
        {item.signals.map((signal) => (
          <div
            key={signal.name}
            className="rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-950/50"
          >
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              {signal.name}
            </p>
            <p className="mt-0.5 text-xs text-emerald-600 dark:text-emerald-400">
              {signal.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
