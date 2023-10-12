package model

import (
	"time"
)

// membersテーブルの構成
type Member struct {
	ID          int       `gorm:"primary_key;not null;autoIncrement:true"`
	UID         int       `gorm:"not null"`
	TID         int       `gorm:"not null"`
	CreatedAt   time.Time `sql:"DEFAULT:current_timestamp;column:created_at"`
}