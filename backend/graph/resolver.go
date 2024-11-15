package graph

import (
	"github.com/a-company-jp/gaishi-hackathon-app/backend/service"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	RedisSvc    *service.RedisService
	PostgresSvc service.PostgresService
	//UserSvc service.User
}

func NewResolver(
	redisC *redis.Client,
	dbC *gorm.DB,
	// userService service.User,
) *Resolver {
	return &Resolver{
		RedisSvc:    service.NewRedisService(redisC),
		PostgresSvc: *service.NewPostgresService(dbC),
	}
}
