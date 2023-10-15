package service

import (
	"encoding/base64"
	"net/http"
	"os"
	"strings"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type UserService struct{}

// 認証機能の追加
func (s UserService) Authenticate(authHeader string, db *gorm.DB, c echo.Context) (*User, error) {
	// Authorizationヘッダが空または"Basic "で始まらない場合は認証エラー
	if authHeader == "" || !strings.HasPrefix(authHeader, "Basic ") {
		return nil, c.JSON(http.StatusUnauthorized, map[string]string{ 	
			"message":"Authentication Failed",
		})
	}

	// "Basic "を削除してBase64デコード
	authValue := strings.TrimPrefix(authHeader, "Basic ")
	decodedAuth, err := base64.StdEncoding.DecodeString(authValue)
	if err != nil {
		return nil, c.JSON(http.StatusUnauthorized, map[string]string{ 	
			"message":"Authentication Failed",
		})
	}

	// ユーザー名とパスワードを分割
	credentials := strings.SplitN(string(decodedAuth), ":", 2)
	if len(credentials) != 2 {
		return nil, c.JSON(http.StatusUnauthorized, map[string]string{ 	
			"message":"Authentication Failed",
		})
	}

	appPass := credentials[0]
	APP_PASS := os.Getenv("APP_PASS")
	if appPass != APP_PASS {
		return nil, c.JSON(http.StatusUnauthorized, map[string]string{
			"message": "Authentication Failed",
		})
	}
	userMail := credentials[1]
	u := new(User)
	if err := db.Raw("SELECT * FROM `users` WHERE mail = ? LIMIT 1", userMail).Scan(&u).Error; err != nil {
		return nil, c.JSON(http.StatusUnauthorized, map[string]string{ 	
			"message":"Authentication Failed",
		})
	}
	if u.Mail == "" {
		return nil, c.JSON(http.StatusUnauthorized, map[string]string{ 	
			"message":"Authentication Failed",
		})
	}
	return u, nil
}

// 認証機能の追加
func (s UserService) PostAuthenticate(authHeader string, db *gorm.DB, c echo.Context) error {
	// Authorizationヘッダが空または"Basic "で始まらない場合は認証エラー
	if authHeader == "" || !strings.HasPrefix(authHeader, "Basic ") {
		return c.JSON(http.StatusUnauthorized, map[string]string{ 	
			"message":"Authentication Failed",
		})
	}

	// "Basic "を削除してBase64デコード
	authValue := strings.TrimPrefix(authHeader, "Basic ")
	decodedAuth, err := base64.StdEncoding.DecodeString(authValue)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{ 	
			"message":"Authentication Failed",
		})
	}

	appPass := string(decodedAuth)
	APP_PASS := os.Getenv("APP_PASS")
	if appPass != APP_PASS {
		return c.JSON(http.StatusUnauthorized, map[string]string{
			"message": "Authentication Failed",
		})
	}
	return nil
}

// GET
// uidによって取得
func (s UserService) GetUserByID(db *gorm.DB, c echo.Context) (*User, error) {
	authHeader := c.Request().Header.Get("Authorization")
	authUser, err := s.Authenticate(authHeader, db, c)
	if authUser != nil {
		return nil, err
	}
	user := new(User)
	uid := c.Param("uid")

	if err := db.Table("users").Where("id = ?", uid).First(&user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

// メアドによって情報取得
func (s UserService) GetUserByEmail(db *gorm.DB, c echo.Context) (*User, error) {
	authHeader := c.Request().Header.Get("Authorization")
	mail := c.QueryParam("mail")
	authUser, err := s.Authenticate(authHeader, db, c)
	if authUser == nil {
		return nil, err
	}
	user := new(User)
	if authUser.Mail != mail {
		return nil, c.JSON(http.StatusBadRequest, map[string]string{"message":"No Match mail"})
	} 
	if err := db.Where("mail = ?", mail).First(&user).Error; err != nil {
		return nil, c.JSON(http.StatusNotFound, map[string]string{"message":"No User found"})
	}
	return user, nil
}

// POST
func (s UserService) PostUser(db *gorm.DB, c echo.Context) (User, error) {
	authHeader := c.Request().Header.Get("Authorization")
	var user User
	if err := s.PostAuthenticate(authHeader, db, c); err != nil {
		return user, err
	}
	c.Bind(&user)

	if err := db.Create(&user).Error; err != nil {
		return user, err
	}
	return user, nil
}