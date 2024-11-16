package middleware

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/a-company-jp/gaishi-hackathon-app/backend/db_model"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
	"log"
	"net/http"
	"regexp"
)

const (
	cookieName              = "user-identifier"
	CTX_COOKIE_UUID         = "cookie-uuid"
	CTX_ACCOUNT_UUID        = "account-uuid"
	CTX_RESTAURANT_HOSTNAME = "rest-host"
	CTX_RESTAURANT_ID       = "rest-id"
)

type CookieIssuer struct {
	redisC  *redis.Client
	dbC     *gorm.DB
	hostReg *regexp.Regexp
}

func NewCookieIssuer(
	redisC *redis.Client,
	dbC *gorm.DB,
) CookieIssuer {
	return CookieIssuer{
		redisC:  redisC,
		dbC:     dbC,
		hostReg: regexp.MustCompile(`^([a-zA-Z0-9-_]+)\.i.a.shion.pro`),
	}
}

func (ci CookieIssuer) Configure(rg *gin.RouterGroup) {
	rg.Use(ci.middleware())
}

func (ci CookieIssuer) middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		restHost := ci.getRestaurantHost(c)
		if restHost == "" {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid host"})
			return
		}
		c.Set(CTX_RESTAURANT_HOSTNAME, restHost)
		id, err := ci.resolveRestaurantID(c.Request.Context(), restHost)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid host"})
			return
		}
		c.Set(CTX_RESTAURANT_ID, id)
		auuid, cuuid := ci.processCookie(c)
		c.Set(CTX_ACCOUNT_UUID, auuid)
		c.Set(CTX_COOKIE_UUID, cuuid)
		ctx := context.WithValue(c.Request.Context(), CTX_COOKIE_UUID, cuuid)
		ctx = context.WithValue(ctx, CTX_ACCOUNT_UUID, auuid)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}

func (ci CookieIssuer) getRestaurantHost(c *gin.Context) string {
	host := c.Request.Host
	if host == "localhost:8080" {
		return "store1"
	}
	if ci.hostReg.MatchString(host) {
		return ci.hostReg.FindStringSubmatch(host)[1]
	}
	return ""
}

func (ci CookieIssuer) processCookie(c *gin.Context) (string, string) {
	var cuuid, auuid string
	cookie, err := c.Request.Cookie(cookieName)
	if err == nil {
		ucuuid, err := uuid.Parse(cookie.Value)
		if err == nil {
			cuuid = ucuuid.String()
			auuid, cuuid = ci.QueryAccountID(c.Request.Context(), cuuid)
		} else {
			auuid, cuuid = ci.issue(c)
		}
	} else {
		auuid, cuuid = ci.issue(c)
	}
	cookie = &http.Cookie{
		Name:     cookieName,
		Value:    cuuid,
		Path:     "/",
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
	}
	http.SetCookie(c.Writer, cookie)
	return auuid, cuuid
}

func (ci CookieIssuer) issue(ctx context.Context) (auuid, cuuid string) {
	log.Println("issue cookie")
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

func (ci CookieIssuer) resolveRestaurantID(ctx context.Context, restHost string) (int, error) {
	if ci.redisC != nil {
		aid, err := ci.redisC.Get(ctx, fmt.Sprintf("restHost-ID:%s", restHost)).Int()
		if err == nil {
			return aid, nil
		}
	}
	var restaurant db_model.Restaurant
	if err := ci.dbC.Where("hostname = ?", restHost).First(&restaurant).Error; err != nil {
		return 0, err
	}
	if ci.redisC != nil {
		ci.redisC.Set(ctx, fmt.Sprintf("restHost-ID:%s", restHost), restaurant.ID, 0)
	}
	return restaurant.ID, nil
}
