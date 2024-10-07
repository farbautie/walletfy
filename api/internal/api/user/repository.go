package user

import (
	"database/sql"

	"github.com/google/uuid"
)

type Repository interface {
	GetByID(id uuid.UUID) (*User, error)
	GetByEmail(email string) (*User, error)
	Create(user *User) error
	Update(user *User) error
	Delete(id uuid.UUID) error
	List() ([]*User, error)
}

type repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) Repository {
	return &repository{db}
}

func (r *repository) GetByID(id uuid.UUID) (*User, error) {
	return nil, nil
}

func (r *repository) GetByEmail(email string) (*User, error) {
	return nil, nil
}

func (r *repository) Create(user *User) error {
	return nil
}

func (r *repository) Update(user *User) error {
	return nil
}

func (r *repository) Delete(id uuid.UUID) error {
	return nil
}

func (r *repository) List() ([]*User, error) {
	return nil, nil
}
