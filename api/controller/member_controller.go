package controller

import (
	"fmt"
	"net/http"

	"github.com/YutoSekiguchi/alque/service"
	"github.com/labstack/echo/v4"
)

// HandleGetMembersByUID GET /members/:uid uidが一致するメンバーを取得
func (ctrl Controller) HandleGetMembersByUID(c echo.Context) error {
	var s service.MemberService
	p, err := s.GetMembersByUID(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// HandleGetMembersByTID GET /members/:tid tidが一致するメンバーを取得
func (ctrl Controller) HandleGetMembersByTID(c echo.Context) error {
	var s service.MemberService
	p, err := s.GetMembersByTID(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// HandlePostMember POST /members メンバーの追加
func (ctrl Controller) HandlePostMember(c echo.Context) error {
	var s service.MemberService
	p, err := s.PostMember(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}