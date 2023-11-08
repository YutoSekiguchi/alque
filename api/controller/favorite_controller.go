package controller

import (
	"fmt"
	"net/http"

	"github.com/YutoSekiguchi/alque/service"
	"github.com/labstack/echo/v4"
)

// HandleGetFavoriteByQIDAndUID GET /favorites/yours/:qid/:uid qidとuidが一致するfavoriteを取得
func (ctrl Controller) HandleGetFavoriteByQIDAndUID(c echo.Context) error {
	var s service.FavoriteService
	p, err := s.GetFavoriteByQIDAndUID(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// HandleGetFavoriteByQID GET /favorites/qid/:qid qidが一致するfavoriteを取得
func (ctrl Controller) HandleGetFavoritesByQID(c echo.Context) error {
	var s service.FavoriteService
	p, err := s.GetFavoritesByQID(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// HandleGetFavoriteCountByQID GET /favorites/count/qid qidごとのfavoriteの数を取得
func (ctrl Controller) HandleGetFavoriteCountByQID(c echo.Context) error {
	var s service.FavoriteService
	p, err := s.GetFavoriteCountByQID(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// HandlePostFavorite POST /favorites favoriteの追加
func (ctrl Controller) HandlePostFavorite(c echo.Context) error {
	var s service.FavoriteService
	p, err := s.PostFavorite(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// HandleDeleteFavorite DELETE /favorites favoriteの削除
func (ctrl Controller) HandleDeleteFavorite(c echo.Context) error {
	var s service.FavoriteService
	p, err := s.DeleteFavorite(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}
