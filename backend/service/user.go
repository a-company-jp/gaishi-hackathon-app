package service

import (
	"context"

	"github.com/a-company-jp/gaishi-hackathon-app/backend/db_model"
	"github.com/a-company-jp/gaishi-hackathon-app/backend/repository"

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
