package auth

import "github.com/farbautie/api/internal/api/user"

type Service interface {
	SignUp(credentials Credentials)
	SignIn(credentials Credentials)
}

type service struct {
	repo user.Repository
}

func NewService(repo user.Repository) Service {
	return &service{repo}
}

func (s *service) SignUp(credentials Credentials) {}
func (s *service) SignIn(credentials Credentials) {}

