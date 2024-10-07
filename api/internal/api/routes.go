package api

import (
	"net/http"
)

func NewRouter(d *Dependencies) *http.ServeMux {
	router := http.NewServeMux()
	router.HandleFunc("/auth/signup", d.auth.SignUp)
	router.HandleFunc("/auth/signin", d.auth.SignIn)

	return router
}
