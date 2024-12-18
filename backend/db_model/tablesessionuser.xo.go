package db_model

// Code generated by xo. DO NOT EDIT.

import (
	"database/sql"

	"github.com/google/uuid"
)

// TableSessionUser represents a row from 'public.table_session_users'.
type TableSessionUser struct {
	ID             int          `json:"id"`               // id
	AccountID      uuid.UUID    `json:"account_id"`       // account_id
	TableSessionID int          `json:"table_session_id"` // table_session_id
	UserNumber     int          `json:"user_number"`      // user_number
	CreatedAt      sql.NullTime `json:"created_at"`       // created_at
	UpdatedAt      sql.NullTime `json:"updated_at"`       // updated_at
}
