package controller

import (
	"fmt"
	"net/http"

	"github.com/YutoSekiguchi/alque/service"
	"github.com/labstack/echo/v4"
)

// HandleGetUserByID GET /users/:uid uidが一致するユーザを取得
func (ctrl Controller) HandleGetUserByID(c echo.Context) error {
	var s service.UserService
	p, err := s.GetUserByID(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// HandleGetUserByEmail GET /users/me そのメールアドレスのユーザが存在するかどうか
func (ctrl Controller) HandleGetUserByEmail(c echo.Context) error {
	var s service.UserService
	p, err := s.GetUserByEmail(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// HandlePostUser POST /users ユーザの追加
func (ctrl Controller) HandlePostUser(c echo.Context) error {
	var s service.UserService
	p, err := s.PostUser(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}