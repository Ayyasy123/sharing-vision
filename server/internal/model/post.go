package model

import "time"

type Post struct {
	ID          int       `json:"id" gorm:"primary_key,auto_increment"`
	Title       string    `json:"title" gorm:"varchar(200);not null"`
	Content     string    `json:"content" gorm:"text;not null"`
	Category    string    `json:"category" gorm:"varchar(100);not null"`
	CreatedDate time.Time `json:"created_date,omitempty"`
	UpdatedDate time.Time `json:"updated_date,omitempty"`
	Status      string    `json:"status" gorm:"type:ENUM('publish','draft','trash');varchar(100);not null"`
}

type CreatePostRequest struct {
	Title    string `json:"title" validate:"required,min=20"`
	Content  string `json:"content" validate:"required,min=200"`
	Category string `json:"category" validate:"required,min=3"`
	Status   string `json:"status" validate:"required,oneof=publish draft trash"`
}

type UpdatePostRequest struct {
	Title    string `json:"title" validate:"required,min=20"`
	Content  string `json:"content" validate:"required,min=200"`
	Category string `json:"category" validate:"required,min=3"`
	Status   string `json:"status" validate:"required,oneof=publish draft trash"`
}

type PostResponse struct {
	ID       int    `json:"id"`
	Title    string `json:"title"`
	Content  string `json:"content"`
	Category string `json:"category"`
	Status   string `json:"status"`
}
