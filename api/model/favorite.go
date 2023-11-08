package model

import (
	"time"
)

// Favoriteテーブルの構成
type Favorite struct {
	ID          int       `gorm:"primary_key;not null;autoIncrement:true"`
	UID         int       `gorm:"not null"`
	QID         int       `gorm:"not null"`
	CreatedAt   time.Time `sql:"DEFAULT:current_timestamp;column:created_at"`
}