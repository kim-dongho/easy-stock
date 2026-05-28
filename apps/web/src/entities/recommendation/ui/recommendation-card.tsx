import { Star } from "lucide-react";
import StockLogo from "@/shared/ui/stock-logo";
import Tooltip from "@/shared/ui/tooltip";
import Sparkline from "@/shared/ui/sparkline";
import type { Recommendation } from "../model/types";

const signalChipColor = (name: string) => {
  if (name.includes("눌림"))
    return "border-primary/30 bg-primary/10 text-primary";
  if (name.includes("조정"))
    return "border-amber-400/30 bg-amber-400/10 text-amber-400";
  if (name.includes("거래량"))
    return "border-outline/40 bg-outline/10 text-outline";
  if (name.includes("반등"))
    return "border-secondary/30 bg-secondary/10 text-secondary";
  return "border-outline/40 bg-outline/10 text-outline";
};

const scoreColor = (score: number) => {
  if (score >= 4) return "bg-secondary/15 text-secondary";
  if (score >= 3) return "bg-primary/15 text-primary";
  return "bg-surface-highest text-on-surface-variant";
};

const scoreLabel = (score: number) => {
  if (score >= 4) return "강력 추천";
  if (score >= 3) return "추천";
  return "관심";
};

function PriceDisplay({ symbol, close }: { symbol: string; close: number }) {
  const isKr = symbol.includes(".KS") || symbol.includes(".KQ");
  const currency = isKr ? "₩" : "$";
  const currencySize = isKr ? "text-sm" : "text-base";
  const formatted = isKr
    ? close.toLocaleString("ko-KR")
    : close.toLocaleString("en-US");
  return (
    <div className="flex items-baseline gap-1">
      <span className={`${currencySize} text-on-surface-variant`}>
        {currency}
      </span>
      {formatted}
    </div>
  );
}

export default function RecommendationCard({ item }: { item: Recommendation }) {
  return (
    <div className="flex flex-col rounded-lg border border-outline-variant bg-surface-low transition-colors hover:bg-surface-container">
      {/* 헤더 */}
      <div className="flex items-start justify-between gap-2 p-5 pb-0">
        <div className="flex items-center gap-3 min-w-0">
          <StockLogo symbol={item.symbol} name={item.name} />
          <div className="min-w-0">
            <h3 className="truncate font-heading text-sm font-semibold text-on-surface">
              {item.name}
            </h3>
            <p className="font-data text-xs text-on-surface-variant">
              {item.symbol}
            </p>
          </div>
        </div>
        <span
          className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${scoreColor(item.score)}`}
        >
          <Star size={12} fill="currentColor" />
          {scoreLabel(item.score)} {item.score}/5
        </span>
      </div>

      {/* 종가 */}
      <div className="px-5 pt-4 font-data text-xl font-medium text-on-surface">
        <PriceDisplay symbol={item.symbol} close={item.close} />
      </div>

      {/* 스파크라인 */}
      <div className="mt-3 h-16 px-5 pb-2">
        {item.sparkline && item.sparkline.length > 1 && (
          <Sparkline data={item.sparkline} />
        )}
      </div>

      {/* 시그널 */}
      <div className="mt-auto border-t border-outline-variant px-5 py-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-on-surface-variant">
          분석 시그널
        </p>
        <div className="flex flex-wrap gap-1.5">
          {item.signals.map((signal) => (
            <Tooltip key={signal.name} content={signal.description}>
              <span
                className={`cursor-default rounded-full border px-2.5 py-1 text-xs font-medium ${signalChipColor(signal.name)}`}
              >
                {signal.name}
              </span>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}
