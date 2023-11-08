package controller

import (
	"fmt"
	"net/http"

	"github.com/YutoSekiguchi/alque/service"
	"github.com/labstack/echo/v4"
)

func (ctrl Controller) HandleGetReactionsByQID(c echo.Context) error {
	var s service.ReactionService
	p, err := s.GetReactionsByQID(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

func (ctrl Controller) HandleGetReactionCountByQID(c echo.Context) error {
	var s service.ReactionService
	p, err := s.GetReactionCountByQID(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

func (ctrl Controller) HandleCreateReaction(c echo.Context) error {
	var s service.ReactionService
	p, err := s.CreateReaction(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

func (ctrl Controller) HandleDeleteReaction(c echo.Context) error {
	var s service.ReactionService
	p, err := s.DeleteReaction(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

func (ctrl Controller) HandleUpdateReaction(c echo.Context) error {
	var s service.ReactionService
	p, err := s.UpdateReaction(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}