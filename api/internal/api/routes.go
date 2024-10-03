package api

import "net/http"

func NewRouter() *http.ServeMux {
	router := http.NewServeMux()

	return router
}
