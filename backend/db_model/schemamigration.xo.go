package db_model

// Code generated by xo. DO NOT EDIT.

// SchemaMigration represents a row from 'public.schema_migrations'.
type SchemaMigration struct {
	Version int64 `json:"version"` // version
	Dirty   bool  `json:"dirty"`   // dirty
}
