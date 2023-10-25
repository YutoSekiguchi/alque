package service

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type AnswerService struct{}

// GET
// idから取得
func (s AnswerService) GetAnswerByID(db *gorm.DB, c echo.Context) (*AnswerContent, error) {
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}
	answer := new(AnswerContent)
	id := c.Param("id")

	if err := db.Table("answer_contents").Where("id = ?", id).First(&answer).Error; err != nil {
		return answer, err
	}

	return answer, nil
}

// uidから取得
func (s AnswerService) GetAnswersByUID(db *gorm.DB, c echo.Context) ([]AnswerContent, error) {
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}
	var answer []AnswerContent
	uid := c.Param("uid")
	if err := db.Table("answer_contents").Where("uid = ?", uid).Find(&answer).Error; err != nil {
		return nil, err
	}

	return answer, nil
}

// qidから取得
func (s AnswerService) GetAnswersByQID(db *gorm.DB, c echo.Context) ([]AnswerContent, error) {
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}
	var answer []AnswerContent
	qid := c.Param("qid")
	if err := db.Table("answer_contents").Where("qid = ?", qid).Find(&answer).Error; err != nil {
		return nil, err
	}

	return answer, nil
}

// qidとuidから取得
func (s AnswerService) GetAnswersByQIDAndUID(db *gorm.DB, c echo.Context) ([]AnswerContent, error) {
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}
	var answer []AnswerContent
	qid := c.Param("qid")
	uid := c.Param("uid")

	if err := db.Table("answer_contents").Where("qid = ? AND uid = ?", qid, uid).Find(&answer).Error; err != nil {
		return nil, err
	}

	return answer, nil
}

// tidから取得
func (s AnswerService) GetAnswersByTID(db *gorm.DB, c echo.Context) ([]AnswerContent, error) {
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}
	var answer []AnswerContent
	tid := c.Param("tid")
	// tidからqidを取得
	var question []Question
	if err := db.Table("questions").Where("tid = ?", tid).Find(&question).Error; err != nil {
		return nil, err
	}
	// qidからanswerを取得
	for _, q := range question {
		if err := db.Table("answer_contents").Where("qid = ?", q.ID).Find(&answer).Error; err != nil {
			return nil, err
		}
	}

	return answer, nil
}


// POST
// answerを投稿
func (s AnswerService) PostAnswer(db *gorm.DB, c echo.Context) (*AnswerContent, error) {
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}

	answer := new(AnswerContent)
	if err := c.Bind(answer); err != nil {
		return nil, err
	}

	if err := db.Table("answer_contents").Create(&answer).Error; err != nil {
		return nil, err
	}

	return answer, nil
}