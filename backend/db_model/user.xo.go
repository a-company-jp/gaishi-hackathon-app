package db_model

// Code generated by xo. DO NOT EDIT.

import (
	"database/sql"
)

// User represents a row from 'public.users'.
type User struct {
	ID        string       `json:"id"`         // id
	Username  string       `json:"username"`   // username
	Email     string       `json:"email"`      // email
	Password  string       `json:"password"`   // password
	CreatedAt sql.NullTime `json:"created_at"` // created_at
}
