package repository

import (
	"context"

	"gaishi-app/backend/db_model"

	"gorm.io/gorm"
)

type User interface {
	GetByID(ctx context.Context, db *gorm.DB, id string) (*db_model.User, error)
}
