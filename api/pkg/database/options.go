package database

import (
	"time"
)

type Options func(*Database)

func MaxOpenConns(maxOpenConns int) Options {
	return func(p *Database) {
		p.MaxOpenConns = maxOpenConns
	}
}

func MaxIdleConns(maxIdleConns int) Options {
	return func(p *Database) {
		p.MaxIdleConns = maxIdleConns
	}
}

func ConnMaxIdleTime(connMaxIdleTime time.Duration) Options {
	return func(p *Database) {
		p.ConnMaxIdleTime = connMaxIdleTime
	}
}
