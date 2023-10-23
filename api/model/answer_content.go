package model

import (
	"time"
)

// User DBのユーザテーブルの構成
type AnswerContent struct {
	ID            int       `gorm:"primary_key;not null;autoIncrement:true"`
	QID           int       `gorm:"column:qid"`
	UID           int       `gorm:"column:uid"`
	PredImageUrl  string    `gorm:"type:text;not null"`
	MatchAnswer   int       `gorm:"not null"`
	QuestionLevel int			  `gorm:"not null"`
	CreatedAt   time.Time `sql:"DEFAULT:current_timestamp;column:created_at"`
}