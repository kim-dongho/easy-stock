"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StockSearchInput() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticker = query.trim().toUpperCase();
    if (!ticker) return;
    setQuery("");
    router.push(`/stock/${encodeURIComponent(ticker)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="종목 검색 (예: AAPL)"
        className="h-9 w-48 rounded-md border border-outline-variant bg-surface-high pl-9 pr-3 text-sm text-on-surface placeholder:text-outline transition-colors focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container sm:w-72"
      />
    </form>
  );
}
