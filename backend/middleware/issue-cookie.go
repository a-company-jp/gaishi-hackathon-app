package middleware

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"github.com/a-company-jp/gaishi-hackathon-app/backend/db_model"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
	"log"
	"net/http"
)

const (
	cookieName      = "user-identifier"
	CTX_COOKIE_UUID = "cookie-uuid"
)

type CookieIssuer struct {
	redisC *redis.Client
	dbC    *gorm.DB
}

func NewCookieIssuer(
	redisC *redis.Client,
	dbC *gorm.DB,
) CookieIssuer {
	return CookieIssuer{
		redisC: redisC,
		dbC:    dbC,
	}
}

func (ci CookieIssuer) Configure(rg *gin.RouterGroup) {
	rg.Use(ci.middleware())
}

func (ci CookieIssuer) middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		var cuuid string
		cookie, err := c.Request.Cookie(cookieName)
		if err != nil {
			if !errors.Is(err, http.ErrNoCookie) {
				c.AbortWithStatus(http.StatusInternalServerError)
				log.Fatalf("failed to get cookie: %v\n", err)
				return
			}
			cuuid = ci.issue(c).String()
			cookie = &http.Cookie{
				Name:     cookieName,
				Value:    cuuid,
				Path:     "/",
				Secure:   true,
				HttpOnly: true,
				SameSite: http.SameSiteStrictMode,
			}
			http.SetCookie(c.Writer, cookie)
		} else {
			ucuuid, err := uuid.Parse(cookie.Value)
			if err != nil {
				c.AbortWithStatus(http.StatusInternalServerError)
				log.Fatalf("failed to parse cookie: %v\n", err)
				return
			}
			cuuid = ucuuid.String()
		}
		c.Set(CTX_COOKIE_UUID, cuuid)
		ctx := context.WithValue(c.Request.Context(), CTX_COOKIE_UUID, cuuid)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}

func (ci CookieIssuer) issue(ctx context.Context) uuid.UUID {
	newCUUID := uuid.New()
	newAccount := &db_model.Account{
		ID:          uuid.New(),
		FirebaseUID: sql.NullString{},
	}
	newCookie := &db_model.Cookie{
		ID:        newCUUID,
		AccountID: newAccount.ID,
	}
	if ci.redisC != nil {
		ci.redisC.Set(ctx, fmt.Sprintf("ses2aID-%s", newCUUID.String()), newAccount.ID.String(), 0)
	}
	go func(newAccount *db_model.Account, newCookie *db_model.Cookie) {
		ci.dbC.Create(newAccount)
		ci.dbC.Create(newCookie)
	}(newAccount, newCookie)
	return newCUUID
}
