package main

import (
	"log"
	"net/http"
	"os"

	"github.com/dongho/easy-stock-server/internal/handler"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "5051"
	}

	mux := http.NewServeMux()

	// 헬스체크 — 서버 상태 확인용
	mux.HandleFunc("GET /health", handler.Health)

	// TODO: 추천 종목, 종목 상세 등 API 라우트 추가 예정

	log.Printf("server starting on :%s", port)
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		log.Fatal(err)
	}
}
