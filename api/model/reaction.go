package model

import (
	"time"
)

// Reactionsテーブルの構成
type Reaction struct {
	ID               int       `gorm:"primary_key;not null;autoIncrement:true"`
	UID              int       `gorm:"column:uid"`
	QID              int       `gorm:"column:qid"`
	ReactionSentence string    `gorm:"type:text;not null"`
	CreatedAt        time.Time `sql:"DEFAULT:current_timestamp;column:created_at"`
}