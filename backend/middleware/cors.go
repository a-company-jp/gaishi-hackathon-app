package middleware

import (
	"github.com/gin-gonic/gin"
	"regexp"
)

type CORS struct {
	targetHostRegex *regexp.Regexp
}

func NewCORS() CORS {
	return CORS{targetHostRegex: regexp.MustCompile(`^https://[a-z0-9\-_.]*\.i\.a\.shion\.pro$`)}
}

func (cr CORS) ConfigureCORS(rg *gin.RouterGroup) {
	rg.Use(cr.middleware())
	// this does absolutely nothing because OPTIONS request will be intercepted by the middleware,
	// but this is needed to listen for OPTIONS requests
	rg.OPTIONS("/*path", func(c *gin.Context) {
		c.AbortWithStatus(200)
	})
}

func (cr CORS) middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")
		if origin == "" {
			origin = c.Request.Header.Get("Referer")
		}
		allowedOrigin := "https://store.i.a.shion.pro"
		if cr.checkHost(origin) {
			allowedOrigin = origin
		}
		c.Header("Access-Control-Allow-Origin", allowedOrigin)
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, Authorization")
		c.Header("Access-Control-Allow-Credentials", "true")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}
		c.Next()
	}
}

func (cr CORS) checkHost(origin string) bool {
	if cr.targetHostRegex.MatchString(origin) {
		return true
	}
	if origin == "http://localhost:3000" {
		return true
	}
	return false
}
