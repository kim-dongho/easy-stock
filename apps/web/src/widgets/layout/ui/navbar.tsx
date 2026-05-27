"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star, BarChart3, Eye, Moon, Sun } from "lucide-react";
import StockSearchInput from "@/features/stock-search/ui/stock-search-input";
import { useTheme } from "@/shared/providers/theme-provider";

const navLinks = [
  { href: "/", label: "추천 종목", icon: Star },
  { href: "/market", label: "시장", icon: BarChart3 },
  { href: "/watchlist", label: "관심 종목", icon: Eye },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <nav className="sticky top-0 z-50 border-b border-outline-variant bg-surface-low">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-heading text-lg font-bold text-primary"
          >
            EasyStock
          </Link>

          <div className="hidden items-center gap-1 sm:flex">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-surface-high text-on-surface"
                      : "text-on-surface-variant hover:bg-surface-high hover:text-on-surface"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StockSearchInput />
          <button
            onClick={toggle}
            className="rounded-md p-2 text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
