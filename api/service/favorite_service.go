package service

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type FavoriteService struct{}

// GET
// qidとuidから取得
func (s FavoriteService) GetFavoriteByQIDAndUID(db *gorm.DB, c echo.Context) (Favorite, error) {
	var favorite Favorite
	qid := c.Param("qid")
	uid := c.Param("uid")

	if err := db.Table("favorites").Where("qid = ? AND uid = ?", qid, uid).First(&favorite).Error; err != nil {
		return favorite, err
	}
	return favorite, nil
}

// qidから取得
func (s FavoriteService) GetFavoritesByQID(db *gorm.DB, c echo.Context) ([]Favorite, error) {
	var favorite []Favorite
	qid := c.Param("qid")

	if err := db.Table("favorites").Where("qid = ?", qid).Find(&favorite).Error; err != nil {
		return favorite, err
	}
	return favorite, nil
}

// 全てのfavoriteをQIDごとにCount
type FavoriteCount struct {
	QID   int
	Count int64
}

func (s FavoriteService) GetFavoriteCountByQID(db *gorm.DB, c echo.Context) ([]FavoriteCount, error) {
	var favoriteCount []FavoriteCount
	var favorite []Favorite
	if err := db.Table("favorites").Find(&favorite).Error; err != nil {
		return nil, err
	}
	for _, f := range favorite {
		var count int64
		if err := db.Table("favorites").Where("qid = ?", f.QID).Count(&count).Error; err != nil {
			return nil, err
		}
		favoriteCount = append(favoriteCount, FavoriteCount{QID: f.QID, Count: count})
	}
	return favoriteCount, nil
}

// POST
func (s FavoriteService) PostFavorite(db *gorm.DB, c echo.Context) (Favorite, error) {
	var favorite Favorite
	c.Bind(&favorite)
	if err := db.Table("favorites").Create(&favorite).Error; err != nil {
		return favorite, err
	}
	return favorite, nil
}

// DELETE
func (s FavoriteService) DeleteFavorite(db *gorm.DB, c echo.Context) (Favorite, error) {
	var favorite Favorite
	c.Bind(&favorite)

	if err := db.Table("favorites").Where("qid = ? AND uid = ?", favorite.QID, favorite.UID).Delete(&favorite).Error; err != nil {
		return favorite, err
	}
	return favorite, nil
}