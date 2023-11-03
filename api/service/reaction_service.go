package service

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type ReactionService struct {}

// GET
// qidから取得
func (s ReactionService) GetReactionsByQID(db *gorm.DB, c echo.Context) ([]Reaction, error) {
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}
	var reaction []Reaction
	qid := c.Param("qid")

	if err := db.Table("reactions").Where("qid = ?", qid).Find(&reaction).Error; err != nil {
		return nil, err
	}

	return nil, c.JSON(http.StatusUnauthorized, map[string]string{
		"message": "Authentication Failed",
	})
}

// POST
// リアクションを追加
func (s ReactionService) CreateReaction(db *gorm.DB, c echo.Context) (*Reaction, error) {
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}
	reaction := new(Reaction)
	if err := c.Bind(reaction); err != nil {
		return nil, err
	}
	reaction.UID = u.ID
	if err := db.Table("reactions").Create(&reaction).Error; err != nil {
		return nil, err
	}

	return reaction, nil
}

// DELETE
// リアクションを削除
func (s ReactionService) DeleteReaction(db *gorm.DB, c echo.Context) (*Reaction, error) {
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}
	reaction := new(Reaction)
	if err := c.Bind(reaction); err != nil {
		return nil, err
	}
	reaction.UID = u.ID
	if err := db.Table("reactions").Where("uid = ? AND qid = ?", reaction.UID, reaction.QID).Delete(&reaction).Error; err != nil {
		return nil, err
	}

	return reaction, nil
}

// PUT
// リアクションを更新
func (s ReactionService) UpdateReaction(db *gorm.DB, c echo.Context) (*Reaction, error) {
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}
	reaction := new(Reaction)
	if err := c.Bind(reaction); err != nil {
		return nil, err
	}
	reaction.UID = u.ID
	if err := db.Table("reactions").Where("uid = ? AND qid = ?", reaction.UID, reaction.QID).Update("reaction_sentence", reaction.ReactionSentence).Error; err != nil {
		return nil, err
	}

	return reaction, nil
}
