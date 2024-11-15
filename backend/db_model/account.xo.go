// Package db_model contains generated code for schema 'public'.
package db_model

// Code generated by xo. DO NOT EDIT.

import (
	"database/sql"
)

// Account represents a row from 'public.accounts'.
type Account struct {
	ID          int            `json:"id"`           // id
	FirebaseUID sql.NullString `json:"firebase_uid"` // firebase_uid
	CreatedAt   sql.NullTime   `json:"created_at"`   // created_at
	UpdatedAt   sql.NullTime   `json:"updated_at"`   // updated_at
}