package db_model

// Code generated by xo. DO NOT EDIT.

// TableGuestAllergy represents a row from 'public.table_guest_allergies'.
type TableGuestAllergy struct {
	ID           int `json:"id"`             // id
	TableGuestID int `json:"table_guest_id"` // table_guest_id
	AllergenID   int `json:"allergen_id"`    // allergen_id
}
