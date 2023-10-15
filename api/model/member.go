package model

import (
	"time"
)

// membersテーブルの構成
type Member struct {
	ID          int       `gorm:"primary_key;not null;autoIncrement:true"`
	UID         int       `gorm:"column:uid"`
	TID         int       `gorm:"column:tid"`
	CreatedAt   time.Time `sql:"DEFAULT:current_timestamp;column:created_at"`
}