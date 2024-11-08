// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type NewUserInput struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Query struct {
}

type User struct {
	ID        string  `json:"id"`
	Username  string  `json:"username"`
	Email     string  `json:"email"`
	CreatedAt string  `json:"created_at"`
	Followers []*User `json:"followers"`
	Following []*User `json:"following"`
}
