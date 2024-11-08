package service

import (
	"context"

	"gaishi-app/backend/db_model"
	"gaishi-app/backend/repository"

	"gorm.io/gorm"
)

type User struct {
	db       *gorm.DB
	userRepo repository.User
}

func NewUser(db *gorm.DB, userRepo repository.User) User {
	return User{
		db:       db,
		userRepo: userRepo,
	}
}

func (s *User) GetByID(ctx context.Context, id string) (*db_model.User, error) {
	row, err := s.userRepo.GetByID(ctx, s.db, id)
	if err != nil {
		return nil, err
	}
	return row, nil
}
