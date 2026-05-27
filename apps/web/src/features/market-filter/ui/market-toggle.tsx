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
    <div className="flex gap-1 rounded-md bg-surface-high p-1">
      {options.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => handleClick(value)}
          className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
            current === value
              ? "bg-primary-container text-on-primary-container"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
