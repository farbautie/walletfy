package main

import (
	"log"

	"github.com/farbautie/api/internal/api"
	"github.com/farbautie/api/internal/config"
)

func main() {
	cfg, err := config.DefineConfig()
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
	}
	api.Run(cfg)
}
