package router

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"

	"github.com/YutoSekiguchi/alque/controller"
)

func InitRouter(db *gorm.DB) {
	e := echo.New()

	// Middleware
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "method=${method}, uri=${uri}, status=${status}\n",
	}))
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", "http://localhost:7130", "https://vps7.nkmr.io", "http://vps7.nkmr.io"},
		AllowHeaders: []string{echo.HeaderAuthorization, echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))
	ctrl := controller.NewController(db)

	user := e.Group("/users")
	{
		user.POST("", ctrl.HandlePostUser)
		user.GET("/:uid", ctrl.HandleGetUserByID)
		user.GET("/me", ctrl.HandleGetUserByEmail)
	}

	member := e.Group("/members")
	{
		member.POST("", ctrl.HandlePostMember)
		member.GET("/uid/:uid", ctrl.HandleGetMembersByUID)
		member.GET("/tid/:tid", ctrl.HandleGetMembersByTID)
	}

	team := e.Group("/teams")
	{
		team.POST("", ctrl.HnadlePostTeam)
		team.GET("", ctrl.HandleGetAllTeams)
		team.GET("/:tid", ctrl.HandleGetTeamByID)
		team.GET("/auth/:tid/:password", ctrl.HandleGetTeamByIDAndPassword)
	}

	// Routing
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, Echo!")
	})

	e.Logger.Fatal(e.Start(":8080"))
}
