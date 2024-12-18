package db_model

// Code generated by xo. DO NOT EDIT.

import (
	"database/sql"
)

// Allergen represents a row from 'public.allergens'.
type Allergen struct {
	ID        int          `json:"id"`         // id
	CreatedAt sql.NullTime `json:"created_at"` // created_at
	UpdatedAt sql.NullTime `json:"updated_at"` // updated_at
}
