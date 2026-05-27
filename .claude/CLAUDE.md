# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## 프로젝트 개요 — Easy Stock (주식 매수 추천 사이트)

## 프로젝트 구조

- `apps/web/` — Next.js (TypeScript, Tailwind, App Router, FSD 아키텍처)
- `apps/server/` — Go API 서버 (DB 읽기 전용)
- DB는 기존 quant-platform의 PostgreSQL(TimescaleDB)을 공유 (SELECT only)

## 프론트엔드 아키텍처 (FSD)

`apps/web/src/` 하위에 Feature-Sliced Design 적용:

```
src/
├── app/          # App Router 페이지, 레이아웃, 글로벌 설정
├── widgets/      # 독립적인 UI 블록 (Navbar, Footer 등)
├── features/     # 사용자 인터랙션 단위 (종목 검색, 추천 필터 등)
├── entities/     # 비즈니스 엔티티 (stock, signal 등)
└── shared/       # 공용 UI, 유틸, 타입, API 클라이언트
```

- 상위 레이어는 하위 레이어만 import 가능 (app → widgets → features → entities → shared)
- 각 슬라이스 내부는 `ui/`, `model/`, `api/`, `lib/` 세그먼트로 구성
- 파일/디렉토리 네이밍은 kebab-case (예: `stock-search`, `stock-card.tsx`)

## 개발 서버

- Next.js: `pnpm dev` (port 5050, 루트에서 실행 가능)
- Go: `cd apps/server && go run .` (port 5051)

## 규칙

- Go 서버는 DB에 SELECT만 수행 (INSERT/UPDATE/DELETE 금지)
- 기술 용어는 초보 친화적 표현으로 변환하여 프론트에 노출
