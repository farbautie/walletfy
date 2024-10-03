package database

import (
	"database/sql"
	"time"

	"github.com/farbautie/api/config"
	_ "github.com/lib/pq"
)

const (
	_defaultMaxOpenConns    = 10
	_defaultMaxIdleConns    = 3
	_defaultConnMaxIdleTime = 0
)

type Database struct {
	Pool *sql.DB

	MaxOpenConns    int
	MaxIdleConns    int
	ConnMaxIdleTime time.Duration
}

func New(config *config.Config, options ...Options) (*Database, error) {
	database := &Database{
		MaxOpenConns:    _defaultMaxOpenConns,
		MaxIdleConns:    _defaultMaxIdleConns,
		ConnMaxIdleTime: _defaultConnMaxIdleTime,
	}

	for _, option := range options {
		option(database)
	}

	pool, err := sql.Open("postgres", config.DatabaseUrl+"?sslmode=disable")
	if err != nil {
		return nil, err
	}

	pool.SetMaxOpenConns(int(database.MaxOpenConns))
	pool.SetMaxIdleConns(int(database.MaxIdleConns))
	pool.SetConnMaxIdleTime(database.ConnMaxIdleTime)
	database.Pool = pool

	return database, nil
}

func (d *Database) Close() {
	if d.Pool != nil {
		d.Pool.Close()
	}
}
