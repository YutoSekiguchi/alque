package controller

import (
	"fmt"
	"net/http"

	"github.com/YutoSekiguchi/alque/service"
	"github.com/labstack/echo/v4"
)

func (ctrl Controller) HandleGetAllTeams(c echo.Context) error {
	var s service.TeamService
	p, err := s.GetAllTeams(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

func (ctrl Controller) HandleGetTeamByID(c echo.Context) error {
	var s service.TeamService
	p, err := s.GetTeamByID(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

func (ctrl Controller) HandleGetTeamByIDAndPassword(c echo.Context) error {
	var s service.TeamService
	p, err := s.GetTeamByIDAndPassword(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// uidからteamの取得
func (ctrl Controller) HandleGetTeamByUID(c echo.Context) error {
	var s service.TeamService
	p, err := s.GetTeamByUID(ctrl.Db, c)
	
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

func (ctrl Controller) HnadlePostTeam(c echo.Context) error {
	var s service.TeamService
	p, err := s.PostTeam(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}