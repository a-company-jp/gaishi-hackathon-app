package graph

import "github.com/a-company-jp/gaishi-hackathon-app/backend/service"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	UserSvc service.User
}

func NewResolver(
	userService service.User,
) *Resolver {
	return &Resolver{
		UserSvc: userService,
	}
}
