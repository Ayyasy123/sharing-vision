package repository

import (
	"github.com/Ayyasy123/sharing-vision/internal/model"
	"gorm.io/gorm"
)

type PostRepository interface {
	CreatePost(post *model.Post) error
	GetPostByID(id int) (*model.Post, error)
	GetPosts(limit, offset int) ([]model.Post, error)
	GetAllPosts() ([]model.Post, error)
	UpdatePost(id int, post *model.Post) error
	DeletePost(id int) error
}

type postRepo struct {
	db *gorm.DB
}

func NewPostRepository(db *gorm.DB) PostRepository {
	return &postRepo{db: db}
}

func (r *postRepo) CreatePost(post *model.Post) error {
	return r.db.Create(post).Error
}

func (r *postRepo) GetPostByID(id int) (*model.Post, error) {
	var post model.Post
	err := r.db.First(&post, id).Error
	return &post, err
}

func (r *postRepo) GetPosts(limit, offset int) ([]model.Post, error) {
	var posts []model.Post
	err := r.db.Limit(limit).Offset(offset).Find(&posts).Error
	return posts, err
}

func (r *postRepo) GetAllPosts() ([]model.Post, error) {
	var posts []model.Post
	err := r.db.Find(&posts).Error
	return posts, err
}

func (r *postRepo) UpdatePost(id int, post *model.Post) error {
	return r.db.Model(&model.Post{}).Where("id = ?", id).Updates(post).Error
}

func (r *postRepo) DeletePost(id int) error {
	return r.db.Delete(&model.Post{}, id).Error
}
