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
	cookieName       = "user-identifier"
	CTX_COOKIE_UUID  = "cookie-uuid"
	CTX_ACCOUNT_UUID = "account-uuid"
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
		var cuuid, auuid string
		cookie, err := c.Request.Cookie(cookieName)
		if err != nil {
			if !errors.Is(err, http.ErrNoCookie) {
				c.AbortWithStatus(http.StatusInternalServerError)
				log.Fatalf("failed to get cookie: %v\n", err)
				return
			}
			auuid, cuuid = ci.issue(c)
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
			auuid, cuuid = ci.QueryAccountID(c.Request.Context(), cuuid)
		}
		c.Set(CTX_ACCOUNT_UUID, auuid)
		c.Set(CTX_COOKIE_UUID, cuuid)
		ctx := context.WithValue(c.Request.Context(), CTX_COOKIE_UUID, cuuid)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}

func (ci CookieIssuer) issue(ctx context.Context) (auuid, cuuid string) {
	newCUUID := uuid.New()
	newAUUID := uuid.New()
	newAccount := &db_model.Account{
		ID:          newAUUID,
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
	return newAUUID.String(), newCUUID.String()
}

func (ci CookieIssuer) QueryAccountID(ctx context.Context, cuuidIn string) (auuid, cuuid string) {
	if ci.redisC != nil {
		aid, err := ci.redisC.Get(ctx, fmt.Sprintf("ses2aID-%s", cuuidIn)).Result()
		if err == nil {
			return aid, cuuidIn
		}
	}
	var cookie db_model.Cookie
	if err := ci.dbC.Where("id = ?", cuuidIn).First(&cookie).Error; err == nil {
		return cookie.AccountID.String(), cuuidIn
	}
	return ci.issue(ctx)
}
