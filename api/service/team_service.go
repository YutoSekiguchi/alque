package service

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type TeamService struct{}

// GET
// team一覧の取得
func (s TeamService) GetAllTeams(db *gorm.DB, c echo.Context) ([]TeamWithoutPassword, error) {
	var team []TeamWithoutPassword

	if err := db.Table("teams").Select("id, name, detail, image, created_at").Find(&team).Error; err!=nil {
		return team, err
	}
	return team, nil
}

// tidからteamの取得
func (s TeamService) GetTeamByID(db *gorm.DB, c echo.Context) (TeamWithoutPassword, error) {
	var team TeamWithoutPassword
	tid := c.Param("tid")

	if err := db.Table("teams").Select("id, name, detail, image, created_at").Where("id = ?", tid).First(&team).Error; err!=nil {
		return team, err
	}
	return team, nil
}

// idとパスワードからteamの取得nosyutoku
func (s TeamService) GetTeamByIDAndPassword(db *gorm.DB, c echo.Context) (Team, error) {
	var team Team
	tid := c.Param("tid")
	password := c.Param("password")

	if err := db.Table("teams").Where("id = ? AND password = ?", tid, password).First(&team).Error; err!=nil {
		return team, err
	}
	return team, nil
}

// uidからteamの取得
func (s TeamService) GetTeamByUID(db *gorm.DB, c echo.Context) ([]TeamWithoutPassword, error) {
	var team []TeamWithoutPassword
	uid := c.Param("uid")

	//membersテーブルをjoinして、uidが一致するteamを取得
	if err := db.Table("teams").Select("teams.id, teams.name, teams.detail, teams.image, teams.created_at").Joins("JOIN members ON teams.id = members.tid").Where("members.uid = ?", uid).Find(&team).Error; err!=nil {
		return team, err
	}
	return team, nil
}


// POST
func (s TeamService) PostTeam(db *gorm.DB, c echo.Context) (Team, error) {
	var team Team
	c.Bind(&team)

	if err := db.Table("teams").Create(&team).Error; err != nil {
		return team, err
	}
	return team, nil
}
