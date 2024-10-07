package api

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/farbautie/api/internal/config"
	"github.com/farbautie/api/pkg/database"
	"github.com/farbautie/api/pkg/server"
)

func Run(config *config.Config) {
	log.Printf("Connecting to database")
	db, err := database.New(config, database.MaxOpenConns(config.PoolSize))
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}
	defer db.Close()
	d :=DefineDependencies(db.Pool)
	router := NewRouter(d)
	log.Printf("Database connected")

	srv := server.New(LoggingMiddleware(router), server.Port(config.Port))
	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt, syscall.SIGTERM)

	select {
	case s := <-interrupt:
		log.Printf("Received signal %s, shutting down...", s)
	case err := <-srv.Notify():
		log.Printf("Server stopped with error: %s", err)
	}

	if err := srv.Shutdown(); err != nil {
		log.Printf("Error shutting down server: %s", err)
	}
}
