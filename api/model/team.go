package model

import (
	"time"
)

// Teamテーブルの構成
type Team struct {
	ID          int       `gorm:"primary_key;not null;autoIncrement:true"`
	Name        string    `gorm:"type:text;not null"`
	Password    string    `gorm:"type:text;not null"`
	Detail      string    `gorm:"type:text;not null"`
	Image       string    `gorm:"type:text;not null"`
	CreatedAt   time.Time `sql:"DEFAULT:current_timestamp;column:created_at"`
}