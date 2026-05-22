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
	mux.HandleFunc("GET /health", handler.Health)

	log.Printf("server starting on :%s", port)
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		log.Fatal(err)
	}
}
