package service

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type QuestionService struct{}

// GET
// idから取得
func (s QuestionService) GetQuestionByID(db *gorm.DB, c echo.Context) (*Question, error) {
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}
	question := new(Question)
	id := c.Param("id")

	if err := db.Table("questions").Where("id = ?", id).First(&question).Error; err != nil {
		return question, err
	}

	var member []Member
	if err := db.Table("members").Where("uid = ?", u.ID).Find(&member).Error; err != nil {
		return nil, err
	}
	isAuth := false
	for _, m := range member {
		// tidが一致したらisAuthをtrueにする
		if string(rune(m.TID)) == string(rune(question.TID)) {
			isAuth = true
		}
	}
	if !isAuth {
		return nil, c.JSON(http.StatusUnauthorized, map[string]string{
			"message": "Authentication Failed",
		})
	}

	return question, nil
}

// tidから取得
func (s QuestionService) GetQuestionsByTID(db *gorm.DB, c echo.Context) ([]Question, error) {
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}
	var member []Member
	var question []Question
	tid := c.Param("tid")
	if err := db.Table("members").Where("uid = ?", u.ID).Find(&member).Error; err != nil {
		return nil, err
	}
	isAuth := false
	for _, m := range member {
		// tidが一致したらisAuthをtrueにする
		if string(rune(m.TID)) == tid {
			isAuth = true
		}
	}
	if !isAuth {
		return nil, c.JSON(http.StatusUnauthorized, map[string]string{
			"message": "Authentication Failed",
		})
	}

	if err := db.Table("questions").Where("tid = ?", tid).Find(&question).Error; err != nil {
		return question, err
	}
	return question, nil
}

// questionとuserとTeamWithoutPasswordを組み合わせた構造体の定義
type QuestionWithUser struct {
	Question Question
	User User
	TeamWithoutPassword TeamWithoutPassword
}

// uidからmemberの中のtid（複数ある可能性がある）を取得して、そのtid群からquestionとuserを組み合わせたものを取得
func (s QuestionService) GetQuestionsInMyTeams(db *gorm.DB, c echo.Context) ([]QuestionWithUser, error) {
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}
	var member []Member
	var question []Question
	var questionWithUser []QuestionWithUser
	if err := db.Table("members").Where("uid = ?", u.ID).Find(&member).Error; err != nil {
		return nil, err
	}
	fmt.Println(member)
	// tidのリストの作成最初の要素は0で
	tidList := []string{"0"}
	for _, m := range member {
		tidList = append(tidList, string(rune(m.TID)))
	}

	if err := db.Table("questions").Where("tid IN ?", tidList).Find(&question).Error; err != nil {
		return questionWithUser, err
	}
	for _, q := range question {
		var user User
		if err := db.Table("users").Where("id = ?", q.UID).Find(&user).Error; err != nil {
			return questionWithUser, err
		}
		var teamWithoutPassword TeamWithoutPassword
		if err := db.Table("teams").Where("id = ?", q.TID).Find(&teamWithoutPassword).Error; err != nil {
			return questionWithUser, err
		}
		
		questionWithUser = append(questionWithUser, QuestionWithUser{q, user, teamWithoutPassword})
	}
	return questionWithUser, nil
}


// POST
func (s QuestionService) PostQuestion(db *gorm.DB, c echo.Context) (*Question, error) {
	// authentification
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}
	question := new(Question)
	c.Bind(&question)

	if err := db.Table("questions").Create(&question).Error; err != nil {
		return question, err
	}
	return question, nil
}

// PUT
func (s QuestionService) PutQuestion(db *gorm.DB, c echo.Context) (*Question, error) {
	// authentification
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}
	
	question := new(Question)
	c.Bind(&question)

	// tidが一致するか確認
	var member []Member
	if err := db.Table("members").Where("uid = ?", u.ID).Find(&member).Error; err != nil {
		return nil, err
	}
	isAuth := false
	for _, m := range member {
		// tidが一致したらisAuthをtrueにする
		if string(rune(m.TID)) == string(rune(question.TID)) {
			isAuth = true
		}
	}
	if !isAuth {
		return nil, c.JSON(http.StatusUnauthorized, map[string]string{
			"message": "Authentication Failed",
		})
	}

	if err := db.Table("questions").Save(&question).Error; err != nil {
		return question, err
	}
	return question, nil
}