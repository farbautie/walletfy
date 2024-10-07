package user

import "github.com/google/uuid"

type Service interface {
	GetByID(id uuid.UUID) (*User, error)
	GetByEmail(email string) (*User, error)
	Create(user *User) error
	Update(user *User) error
	Delete(id uuid.UUID) error
	List() ([]*User, error)
}

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	return &service{repo}
}

func (s *service) GetByID(id uuid.UUID) (*User, error) {
	return nil, nil
}

func (s *service) GetByEmail(email string) (*User, error) {
	return nil, nil
}

func (s *service) Create(user *User) error {
	return nil
}

func (s *service) Update(user *User) error {
	return nil
}

func (s *service) Delete(id uuid.UUID) error {
	return nil
}

func (s *service) List() ([]*User, error) {
	return nil, nil
}
