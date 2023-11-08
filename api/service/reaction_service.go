package service

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type ReactionService struct {}

// GET
// qidから取得
type ReactionWithUser struct {
	Reaction Reaction
	User User
}

func (s ReactionService) GetReactionsByQID(db *gorm.DB, c echo.Context) ([]ReactionWithUser, error) {
	authHeader := c.Request().Header.Get("Authorization")
	u, err := new(UserService).Authenticate(authHeader, db, c)
	if u == nil {
		return nil, err
	}
	var reactionWithUser []ReactionWithUser
	var reaction []Reaction
	qid := c.Param("qid")
	// とりあえずreactionのみ取得
	if err := db.Table("reactions").Where("qid = ?", qid).Find(&reaction).Error; err != nil {
		return nil, err
	}
	// reactionに対応するuserを取得
	for _, r := range reaction {
		var user User
		if err := db.Table("users").Where("id = ?", r.UID).First(&user).Error; err != nil {
			return nil, err
		}
		reactionWithUser = append(reactionWithUser, ReactionWithUser{Reaction: r, User: user})
	}

	return reactionWithUser, nil
}

// 全てのreactionをQIDごとにCount
type ReactionCount struct {
	QID int
	Count int64
}

func (s ReactionService) GetReactionCountByQID(db *gorm.DB, c echo.Context) ([]ReactionCount, error) {
	var reactionCount []ReactionCount
	var reaction []Reaction
	if err := db.Table("reactions").Find(&reaction).Error; err != nil {
		return nil, err
	}
	for _, r := range reaction {
		var count int64
		if err := db.Table("reactions").Where("qid = ?", r.QID).Count(&count).Error; err != nil {
			return nil, err
		}
		reactionCount = append(reactionCount, ReactionCount{QID: r.QID, Count: count})
	}

	return reactionCount, nil
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
