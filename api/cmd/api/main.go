package main

import (
	"log"

	"github.com/farbautie/api/config"
	"github.com/farbautie/api/internal/api"
)

func main() {
	cfg, err := config.DefineConfig()
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
	}
	api.Run(cfg)
}
