package auth

import "net/http"

type Handler struct {
	service Service
}

func NewHandler(service Service) *Handler {
	return &Handler{service}
}

func (h *Handler) SignUp(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement SignUp
}

func (h *Handler) SignIn(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement SignIn
}

