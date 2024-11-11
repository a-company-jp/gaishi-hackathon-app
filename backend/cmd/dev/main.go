package main

import (
	"context"
	"fmt"
	"github.com/redis/go-redis/v9"
	"log"

	"github.com/a-company-jp/gaishi-hackathon-app/backend/middleware"
	"github.com/a-company-jp/gaishi-hackathon-app/backend/pkg/settings"
	"github.com/a-company-jp/gaishi-hackathon-app/backend/repository"
	"github.com/a-company-jp/gaishi-hackathon-app/backend/service"

	"github.com/a-company-jp/gaishi-hackathon-app/backend/graph"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Defining the Graphql handler
func graphqlHandler(userSvc service.User) gin.HandlerFunc {
	// NewExecutableSchema and Config are in the generated.go file
	// Resolver is in the resolver.go file
	resolvers := graph.NewResolver(userSvc)
	h := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: resolvers}))

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

// Defining the Playground handler
func playgroundHandler() gin.HandlerFunc {
	h := playground.Handler("GraphQL", "/query")

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

func main() {
	engine := gin.Default()
	conf := settings.Get()
	var dbUrl string
	switch conf.Infrastructure.Postgres.Protocol {
	case "tcp":
		dbUrl = fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
			conf.Infrastructure.Postgres.User,
			conf.Infrastructure.Postgres.Password,
			conf.Infrastructure.Postgres.Host,
			conf.Infrastructure.Postgres.Port,
			conf.Infrastructure.Postgres.DBName)
	case "unix":
		dbUrl = fmt.Sprintf("postgres://%s:%s@/%s?host=%s",
			conf.Infrastructure.Postgres.User,
			conf.Infrastructure.Postgres.Password,
			conf.Infrastructure.Postgres.DBName,
			conf.Infrastructure.Postgres.UnixSocket)
	default:
		log.Fatalf("invalid protocol: %s", conf.Infrastructure.Postgres.Protocol)
	}

	db, err := gorm.Open(postgres.Open(dbUrl), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect to database, err: %v", err)
	}

	var redisClient *redis.Client
	if conf.Infrastructure.Redis.Enable {
		log.Println("Redis is enabled")
		redisDst := fmt.Sprintf("%s:%s", conf.Infrastructure.Redis.Host, conf.Infrastructure.Redis.Port)
		redisClient = redis.NewClient(&redis.Options{
			Addr:     redisDst,
			Password: "", // no password set
			DB:       0,  // use default DB
		})
		ctx := context.Background()
		p := redisClient.Ping(ctx)
		if p.Err() != nil {
			log.Fatalf("failed to connect to redis, err: %v", p.Err())
		}
	}

	apiV1 := engine.Group("/api/v1")
	middleware.NewCORS().ConfigureCORS(apiV1)

	if err := implement(apiV1, db); err != nil {
		log.Fatalf("Failed to start server... %v", err)
		return
	}
	if err := engine.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server... %v", err)
		return
	}
}

func implement(rg *gin.RouterGroup, db *gorm.DB) error {
	// graphql playground
	rg.GET("/", playgroundHandler())

	userRepo := repository.NewUser()
	userSvc := service.NewUser(db, userRepo)

	rg.POST("/query", graphqlHandler(userSvc))

	return nil
}
