package controller

import (
	"fmt"
	"net/http"

	"github.com/YutoSekiguchi/alque/service"
	"github.com/labstack/echo/v4"
)

// HandleGetAnswerByID GET /answers/:id idが一致する回答を取得
func (ctrl Controller) HandleGetAnswerByID(c echo.Context) error {
	var s service.AnswerService
	p, err := s.GetAnswerByID(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// HandleGetAnswersByUID GET /answers/uid/:uid uidが一致する回答を取得
func (ctrl Controller) HandleGetAnswersByUID(c echo.Context) error {
	var s service.AnswerService
	p, err := s.GetAnswersByUID(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// HandleGetAnswersByQID GET /answers/qid/:qid qidが一致する回答を取得
func (ctrl Controller) HandleGetAnswersByQID(c echo.Context) error {
	var s service.AnswerService
	p, err := s.GetAnswersByQID(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// HandleGetAnswersByTID GET /answers/tid/:tid tidが一致する回答を取得
func (ctrl Controller) HandleGetAnswersByTID(c echo.Context) error {
	var s service.AnswerService
	p, err := s.GetAnswersByTID(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// HandlePostAnswer POST /answers 回答の追加
func (ctrl Controller) HandlePostAnswer(c echo.Context) error {
	var s service.AnswerService
	p, err := s.PostAnswer(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}
