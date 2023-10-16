package service

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type MemberService struct{}

// GET
// uidから取得
func (s MemberService) GetMembersByUID(db *gorm.DB, c echo.Context) ([]Member, error) {
	var member []Member
	uid := c.Param("uid")

	if err := db.Table("members").Where("uid = ?", uid).Find(&member).Error; err != nil {
		return member, err
	}
	return member, nil
}

// uidから取得
func (s MemberService) GetMembersByTID(db *gorm.DB, c echo.Context) ([]Member, error) {
	var member []Member
	tid := c.Param("tid")

	if err := db.Table("members").Where("tid = ?", tid).Find(&member).Error; err != nil {
		return member, err
	}
	return member, nil
}

// POST
func (s MemberService) PostMember(db *gorm.DB, c echo.Context) (Member, error) {
	var member Member
	c.Bind(&member)

	if err := db.Table("members").Create(&member).Error; err != nil {
		return member, err
	}
	return member, nil
}
