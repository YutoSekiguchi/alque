package model

import (
	"time"
)

// User DBのユーザテーブルの構成
type AnswerContent struct {
	ID            int       `gorm:"primary_key;not null;autoIncrement:true"`
	QID           int       `gorm:"not null"`
	UID           int       `gorm:"not null"`
	PredImageUrl  string    `gorm:"type:text;not null"`
	MatchAnswer   int       `gorm:"not null"`
	CreatedAt   time.Time `sql:"DEFAULT:current_timestamp;column:created_at"`
}