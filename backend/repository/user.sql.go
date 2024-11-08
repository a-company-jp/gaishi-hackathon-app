package repository

import (
	"context"

	"gaishi-app/backend/db_model"

	"gorm.io/gorm"
)

type user struct{}

func NewUser() User { return user{} }

func (r user) GetByID(ctx context.Context, db *gorm.DB, id string) (*db_model.User, error) {
	var user *db_model.User
	if err := db.
		WithContext(ctx).
		Where("id = ?", id).
		First(&user).Error; err != nil {
		return nil, err
	}
	return user, nil
}
