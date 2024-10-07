package config

import (
	"fmt"

	"github.com/ilyakaznacheev/cleanenv"
	_ "github.com/joho/godotenv/autoload"
)

type Config struct {
	App      `yaml:"app"`
	Http     `yaml:"http"`
	Database `yaml:"database"`
}

type Http struct {
	Port string
}

type App struct {
	Name    string `env-required:"true" yaml:"name" env:"APP_NAME"`
	Version string `ènv-required:"true" yaml:"port" env:"PORT"`
}

type Database struct {
	PoolSize    int    `yaml:"pool_size" env:"POOL_SIZE"`
	DatabaseUrl string `yaml:"database_url" env:"DATABASE_URL"`
}

func DefineConfig() (*Config, error) {
	config := &Config{}
	err := cleanenv.ReadConfig("./internal/config/config.yml", config)
	if err != nil {
		return nil, fmt.Errorf("error reading config file: %v", err)
	}

	err = cleanenv.ReadEnv(config)
	if err != nil {
		return nil, fmt.Errorf("error reading environment variables: %v", err)
	}

	return config, nil
}
