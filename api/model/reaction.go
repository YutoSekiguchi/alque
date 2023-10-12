package model

import (
	"time"
)

// Reactionsテーブルの構成
type Reaction struct {
	ID               int       `gorm:"primary_key;not null;autoIncrement:true"`
	UID              int       `gorm:"not null"`
	QID              int       `gorm:"not null"`
	ReactionSentence string    `gorm:"type:text;not null"`
	CreatedAt        time.Time `sql:"DEFAULT:current_timestamp;column:created_at"`
}