"use client";

import { useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

export default function Tooltip({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0, arrowX: 0, below: false });
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleEnter = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const tooltipWidth = 240;
    const gap = 8;

    // 좌우 위치: 트리거 중앙 기준, 화면 밖 안 넘치게
    let x = rect.left + rect.width / 2 - tooltipWidth / 2;
    x = Math.max(12, Math.min(x, window.innerWidth - tooltipWidth - 12));

    // 화살표 위치: 트리거 중앙
    const arrowX = rect.left + rect.width / 2 - x;

    // 위/아래: 위쪽 공간 부족하면 아래로
    const below = rect.top < 80;
    const y = below ? rect.bottom + gap : rect.top - gap;

    setCoords({ x, y, arrowX, below });
    setShow(true);
  }, []);

  return (
    <div
      ref={triggerRef}
      className="inline-block"
      onMouseEnter={handleEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[9999]"
            style={{
              left: coords.x,
              top: coords.below ? coords.y : undefined,
              bottom: coords.below
                ? undefined
                : `${window.innerHeight - coords.y}px`,
              width: 240,
            }}
          >
            <div className="rounded-lg bg-surface-highest px-4 py-3 text-xs leading-relaxed text-on-surface shadow-xl ring-1 ring-outline-variant">
              {content}
            </div>
            {/* 화살표 */}
            <div
              className={`absolute ${coords.below ? "-top-1.5" : "-bottom-1.5"}`}
              style={{ left: coords.arrowX - 6 }}
            >
              <div
                className={`h-3 w-3 rotate-45 bg-surface-highest ring-1 ring-outline-variant ${
                  coords.below
                    ? "[clip-path:polygon(0_0,100%_0,0_100%)]"
                    : "[clip-path:polygon(100%_0,100%_100%,0_100%)]"
                }`}
              />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
