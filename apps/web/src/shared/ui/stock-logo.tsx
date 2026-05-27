"use client";

import Image from "next/image";
import { useState } from "react";

function toLogoSymbol(symbol: string) {
  return symbol.replace(/\.(KS|KQ)$/, "");
}

export default function StockLogo({
  symbol,
  name,
  size = 40,
}: {
  symbol: string;
  name: string;
  size?: number;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex shrink-0 items-center justify-center rounded-lg bg-surface-high font-data text-sm font-medium text-on-surface-variant"
      >
        {symbol.replace(/\.\w+$/, "").slice(0, 2)}
      </div>
    );
  }

  return (
    <Image
      src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${toLogoSymbol(symbol)}.png`}
      alt={name}
      width={size}
      height={size}
      className="shrink-0 rounded-lg"
      onError={() => setError(true)}
    />
  );
}
