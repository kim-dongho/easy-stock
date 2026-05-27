package main

import (
	"log"
	"net/http"
	"os"

	"github.com/dongho/easy-stock-server/internal/db"
	"github.com/dongho/easy-stock-server/internal/handler"
)

func main() {
	db.Init()

	port := os.Getenv("PORT")
	if port == "" {
		port = "5051"
	}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", handler.Health)
	mux.HandleFunc("GET /api/recommendations", handler.Recommendations)

	log.Printf("server starting on :%s", port)
	if err := http.ListenAndServe(":"+port, cors(mux)); err != nil {
		log.Fatal(err)
	}
}

func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			return
		}
		next.ServeHTTP(w, r)
	})
}
