package model

import (
	"time"
)

// User DBのユーザテーブルの構成
type User struct {
	ID          int       `gorm:"primary_key;not null;autoIncrement:true"`
	Name        string    `gorm:"type:text;not null"`
	DisplayName string    `gorm:"type:text;not null;column:display_name"`
	Mail        string    `gorm:"type:text;not null"`
	Image       string    `gorm:"type:text;not null"`
	Dark        int       `gorm:"not null"`
	CreatedAt   time.Time `sql:"DEFAULT:current_timestamp;column:created_at"`
}