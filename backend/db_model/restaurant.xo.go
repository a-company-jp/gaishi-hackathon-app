package db_model

// Code generated by xo. DO NOT EDIT.

import (
	"database/sql"
)

// Restaurant represents a row from 'public.restaurants'.
type Restaurant struct {
	ID          int            `json:"id"`           // id
	Hostname    string         `json:"hostname"`     // hostname
	Name        string         `json:"name"`         // name
	Address     sql.NullString `json:"address"`      // address
	PhoneNumber sql.NullString `json:"phone_number"` // phone_number
	CreatedAt   sql.NullTime   `json:"created_at"`   // created_at
	UpdatedAt   sql.NullTime   `json:"updated_at"`   // updated_at
}
