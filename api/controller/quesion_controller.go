package controller

import (
	"fmt"
	"net/http"

	"github.com/YutoSekiguchi/alque/service"
	"github.com/labstack/echo/v4"
)

// HandleGetQuestionByID GET /questions/:id idが一致する質問を取得
func (ctrl Controller) HandleGetQuestionByID(c echo.Context) error {
	var s service.QuestionService
	p, err := s.GetQuestionByID(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// HandleGetQuestionsByTID GET /questions/tid/:tid tidが一致する質問を取得
func (ctrl Controller) HandleGetQuestionsByTID(c echo.Context) error {
	var s service.QuestionService
	p, err := s.GetQuestionsByTID(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// HandlePostQuestion POST /questions 質問の追加
func (ctrl Controller) HandlePostQuestion(c echo.Context) error {
	var s service.QuestionService
	p, err := s.PostQuestion(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}

// HandlePutQuestion PUT /questions/:id 質問の更新
func (ctrl Controller) HandlePutQuestion(c echo.Context) error {
	var s service.QuestionService
	p, err := s.PutQuestion(ctrl.Db, c)

	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusNotFound, err.Error())
	} else {
		return c.JSON(200, p)
	}
}
