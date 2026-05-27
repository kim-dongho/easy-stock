"use client";

import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "", label: "전체" },
  { value: "kr", label: "한국" },
  { value: "us", label: "미국" },
] as const;

export default function MarketToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("market") ?? "";

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("market", value);
    } else {
      params.delete("market");
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
      {options.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => handleClick(value)}
          className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
            current === value
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
