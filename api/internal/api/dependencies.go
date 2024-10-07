package api

import (
	"database/sql"

	"github.com/farbautie/api/internal/api/auth"
	"github.com/farbautie/api/internal/api/user"
)

type Dependencies struct {
	auth *auth.Handler
	user *user.Handler
}

func DefineDependencies(db *sql.DB) *Dependencies {
	// user dependencies
	userRepo := user.NewRepository(db)
	userService := user.NewService(userRepo)
	userHander := user.NewHandler(userService)
	// auth dependencies
	authService := auth.NewService(userRepo)
	authHandler := auth.NewHandler(authService)


	return &Dependencies{
		auth: authHandler,
		user: userHander,
	}
}
