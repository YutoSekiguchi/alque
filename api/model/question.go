package model

import (
	"time"
)

// Qusetionテーブルの構成
type Question struct {
	ID               int       `gorm:"primary_key;not null;autoIncrement:true"`
	UID              int       `gorm:"column:uid"`
	TID              int       `gorm:"column:tid"`
	QuestionImageUrl string    `gorm:"type:text;not null"`
	AnswerImageUrl   string    `gorm:"type:text;not null"`
	QuestionLevel    float64   `gorm:"column:question_level;not null"`
	QuestionSentence string    `gorm:"type:text;not null"`
	Comment          string    `gorm:"type:text;"`
	Hint             string    `gorm:"type:text;"`
	Date             string    `gorm:"type:text;not null"`
	CreatedAt        time.Time `sql:"DEFAULT:current_timestamp;column:created_at"`
}