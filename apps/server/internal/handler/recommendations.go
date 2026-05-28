package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/dongho/easy-stock-server/internal/db"
)

type Signal struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type Recommendation struct {
	Symbol    string    `json:"symbol"`
	Name      string    `json:"name"`
	Exchange  string    `json:"exchange"`
	Score     int       `json:"score"`
	Close     float64   `json:"close"`
	Signals   []Signal  `json:"signals"`
	Sparkline []float64 `json:"sparkline"`
}

type RecommendationsResponse struct {
	Date    string           `json:"date"`
	Items   []Recommendation `json:"items"`
}

type factorRow struct {
	symbol        string
	name          string
	exchange      string
	close         float64
	rsi14         *float64
	volRatio20d   *float64
	return5d      *float64
	priceVsSma20  *float64
	priceVsSma50  *float64
	priceVsSma200 *float64
	sma20VsSma50  *float64
	sma50VsSma200 *float64
}

func Recommendations(w http.ResponseWriter, r *http.Request) {
	market := r.URL.Query().Get("market") // "kr", "us", "" (전체)

	// 마켓별 최신 시간을 서브쿼리로 구해서 인덱스 활용
	var timeFilter string
	switch market {
	case "kr":
		timeFilter = "f.time = (SELECT MAX(time) FROM factors WHERE symbol LIKE '%.KS' OR symbol LIKE '%.KQ') AND (f.symbol LIKE '%.KS' OR f.symbol LIKE '%.KQ')"
	case "us":
		timeFilter = "f.time = (SELECT MAX(time) FROM factors WHERE symbol NOT LIKE '%.KS' AND symbol NOT LIKE '%.KQ') AND f.symbol NOT LIKE '%.KS' AND f.symbol NOT LIKE '%.KQ'"
	default:
		timeFilter = `(
			(f.time = (SELECT MAX(time) FROM factors WHERE symbol LIKE '%.KS' OR symbol LIKE '%.KQ') AND (f.symbol LIKE '%.KS' OR f.symbol LIKE '%.KQ'))
			OR
			(f.time = (SELECT MAX(time) FROM factors WHERE symbol NOT LIKE '%.KS' AND symbol NOT LIKE '%.KQ') AND f.symbol NOT LIKE '%.KS' AND f.symbol NOT LIKE '%.KQ')
		)`
	}

	query := `
		SELECT
			f.symbol,
			COALESCE(s.name, '') AS name,
			COALESCE(s.exchange, '') AS exchange,
			COALESCE(f.sma_20 * (1 + f.price_vs_sma20), 0) AS close,
			f.rsi_14,
			f.vol_ratio_20d,
			f.return_5d,
			f.price_vs_sma20,
			f.price_vs_sma50,
			f.price_vs_sma200,
			f.sma20_vs_sma50,
			f.sma50_vs_sma200
		FROM factors f
		JOIN stocks s ON s.symbol = f.symbol AND s.active = true
		WHERE ` + timeFilter + `
			AND f.sma20_vs_sma50 > 0
			AND f.sma50_vs_sma200 > 0
			AND f.price_vs_sma200 > 0.05`

	rows, err := db.DB.Query(query)
	if err != nil {
		log.Printf("recommendations query error: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var dateStr string
	var results []Recommendation

	for rows.Next() {
		var fr factorRow
		if err := rows.Scan(
			&fr.symbol, &fr.name, &fr.exchange, &fr.close,
			&fr.rsi14, &fr.volRatio20d, &fr.return5d,
			&fr.priceVsSma20, &fr.priceVsSma50, &fr.priceVsSma200,
			&fr.sma20VsSma50, &fr.sma50VsSma200,
		); err != nil {
			log.Printf("recommendations scan error: %v", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		score, signals := calcSignals(fr)
		if score == 0 {
			continue
		}

		results = append(results, Recommendation{
			Symbol:   fr.symbol,
			Name:     fr.name,
			Exchange: fr.exchange,
			Score:    score,
			Close:    fr.close,
			Signals:  signals,
		})
	}

	// 점수 내림차순 정렬
	sortByScore(results)

	// 상위 20개만
	if len(results) > 20 {
		results = results[:20]
	}

	// 스파크라인 데이터 (상위 종목들의 최근 30일 종가)
	fillSparklines(results)

	// 최신 날짜 조회 (한국/미국 중 가장 최근)
	db.DB.QueryRow("SELECT TO_CHAR(MAX(time), 'YYYY-MM-DD') FROM factors").Scan(&dateStr)

	resp := RecommendationsResponse{Date: dateStr, Items: results}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

// calcSignals — 추세 추종 + 눌림목 전략
// 필수 필터(정배열, 장기추세 위)는 쿼리에서 이미 적용됨.
// 여기서는 매수 타이밍 시그널만 판별한다.
func calcSignals(fr factorRow) (int, []Signal) {
	score := 0
	var signals []Signal

	// 20일선 눌림: 상승 추세에서 잠시 쉬는 구간 (-5% ~ +1%)
	if fr.priceVsSma20 != nil && *fr.priceVsSma20 >= -0.05 && *fr.priceVsSma20 <= 0.01 {
		score += 1
		signals = append(signals, Signal{
			Name:        "20일선 눌림 구간",
			Description: "상승 추세에서 단기 평균선까지 살짝 내려왔어요. 매수 타이밍일 수 있어요.",
		})
	}

	// RSI 건강한 눌림: 40~55 (과매도가 아닌 적당한 조정)
	if fr.rsi14 != nil && *fr.rsi14 >= 40 && *fr.rsi14 <= 55 {
		score += 1
		signals = append(signals, Signal{
			Name:        "건강한 조정 구간",
			Description: "과열도 과매도도 아닌 적당한 쉬어가기 구간이에요.",
		})
	}

	// 거래량 수축: 눌림 중 거래량 감소 (VCP 수축 구간)
	if fr.volRatio20d != nil && *fr.volRatio20d < 1.0 {
		score += 1
		signals = append(signals, Signal{
			Name:        "거래량 수축 중",
			Description: "거래량이 줄어들고 있어요. 조용한 눌림은 곧 반등의 신호일 수 있어요.",
		})
	}

	// 거래량 급증 돌파: 눌림 후 거래량과 함께 반등
	if fr.volRatio20d != nil && *fr.volRatio20d > 2.0 {
		score += 1
		signals = append(signals, Signal{
			Name:        "거래량 돌파",
			Description: "거래량이 평소의 2배 이상이에요. 새로운 상승이 시작될 수 있어요.",
		})
	}

	// 단기 모멘텀: 5일 수익률 3% 이상 (의미 있는 반등)
	if fr.return5d != nil && *fr.return5d > 0.03 {
		score += 1
		signals = append(signals, Signal{
			Name:        "강한 단기 반등",
			Description: "최근 5일간 3% 이상 올랐어요. 눌림 후 반등이 시작된 신호예요.",
		})
	}

	return score, signals
}

func fillSparklines(items []Recommendation) {
	if len(items) == 0 {
		return
	}

	// IN 절용 심볼 목록
	symbols := make([]string, len(items))
	for i, item := range items {
		symbols[i] = item.Symbol
	}

	// 종목별 최근 30일 종가 조회 (LATERAL로 인덱스 활용)
	query := `
		SELECT s.sym, m.close
		FROM unnest($1::text[]) AS s(sym)
		CROSS JOIN LATERAL (
			SELECT close, time FROM market_data
			WHERE symbol = s.sym
			ORDER BY time DESC LIMIT 30
		) m
		ORDER BY s.sym, m.time ASC
	`

	rows, err := db.DB.Query(query, symbols)
	if err != nil {
		log.Printf("sparkline query error: %v", err)
		return
	}
	defer rows.Close()

	// 심볼별 종가 배열
	sparkMap := make(map[string][]float64)
	for rows.Next() {
		var sym string
		var close float64
		if err := rows.Scan(&sym, &close); err != nil {
			log.Printf("sparkline scan error: %v", err)
			continue
		}
		sparkMap[sym] = append(sparkMap[sym], close)
	}

	for i := range items {
		if data, ok := sparkMap[items[i].Symbol]; ok {
			items[i].Sparkline = data
		}
	}
}

func sortByScore(items []Recommendation) {
	for i := 1; i < len(items); i++ {
		for j := i; j > 0 && items[j].Score > items[j-1].Score; j-- {
			items[j], items[j-1] = items[j-1], items[j]
		}
	}
}
