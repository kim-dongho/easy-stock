# Easy Stock

주식 초보도 이해할 수 있는 매수 추천 사이트. 한국 + 미국 주식 지원.

기술 용어를 쉬운 말로 번역해서 보여주는 UX가 핵심.

## 아키텍처

```
Next.js (프론트) → Go API (읽기 전용) → PostgreSQL/TimescaleDB
```

- 데이터는 별도 [quant-platform](https://github.com/kim-dongho/my-quant-project) 엔진이 적재
- 이 프로젝트는 적재된 데이터를 **SELECT only**로 소비

## 기술 스택

| 영역          | 스택                                             |
| ------------- | ------------------------------------------------ |
| 프론트엔드    | Next.js 16, TypeScript, Tailwind v4, React Query |
| API 서버      | Go 1.25, net/http                                |
| DB            | PostgreSQL 14 (TimescaleDB) — 공유               |
| 패키지 매니저 | pnpm (워크스페이스)                              |
| 컨테이너      | Docker Compose                                   |

## 프로젝트 구조

```
apps/
├── web/                    # Next.js (FSD 아키텍처)
│   └── src/
│       ├── app/            # 페이지, 레이아웃
│       ├── widgets/        # Navbar 등 독립 UI 블록
│       ├── features/       # 마켓 필터, 종목 검색
│       ├── entities/       # 추천 종목 카드, 타입, API 훅
│       └── shared/         # axios 클라이언트, 공용 UI
└── server/                 # Go API
    └── internal/
        ├── db/             # DB 연결
        └── handler/        # API 핸들러
```

## 추천 로직

**추세 추종 + 눌림목 전략** — 이미 상승 추세인 종목에서 매수 타이밍을 찾는다.

### 필수 필터 (쿼리에서 제외)

- 이평선 정배열: SMA20 > SMA50 > SMA200
- 장기 추세 위: 주가 > SMA200 × 1.05

### 시그널 (각 1점, 총 5점)

| 시그널         | 조건                   | 의미                             |
| -------------- | ---------------------- | -------------------------------- |
| 20일선 눌림    | price_vs_sma20 -5%~+1% | 상승 추세에서 쉬는 구간          |
| 건강한 조정    | RSI 40~55              | 과열도 과매도도 아닌 적당한 조정 |
| 거래량 수축    | vol_ratio < 1.0        | VCP 수축 구간                    |
| 거래량 돌파    | vol_ratio > 2.0        | 눌림 후 돌파 시작                |
| 강한 단기 반등 | return_5d > 3%         | 의미 있는 반등                   |

점수 높은 순으로 상위 20개 종목 추천. 시그널 설명은 초보 친화 문구로 표시.

## 개발 환경 세팅

```bash
# 의존성 설치
pnpm install

# 프론트엔드 (port 5050)
pnpm dev

# Go 서버 (port 5051)
cd apps/server && go run .

# Docker로 Go 서버 실행
docker compose up --build
```

### 환경변수

```bash
# .env.example 참고
DATABASE_URL=postgres://user:password@localhost:15432/quant?sslmode=disable
PORT=5051
```

## 로드맵

### 1차 (현재)

- [x] 추천 종목 리스트 (카드형, 시그널 점수)
- [x] 마켓 필터 (전체/한국/미국)
- [x] 종목 검색
- [ ] 종목 상세 페이지 (차트 + 분석)

### 2차

- [ ] 애널리스트 목표가 / 컨센서스
- [ ] 재무제표 요약 (PER, PBR, ROE)
- [ ] 실적 서프라이즈 알림
- [ ] Simply Wall St 스타일 시각적 종목 요약
