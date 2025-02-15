package usecase

import (
	"time"

	"github.com/Ayyasy123/sharing-vision/internal/model"
	"github.com/Ayyasy123/sharing-vision/internal/repository"
)

type PostUsecase interface {
	CreatePost(req *model.CreatePostRequest) error
	GetPostByID(id int) (*model.PostResponse, error)
	GetPosts(limit, offset int) ([]model.PostResponse, error)
	UpdatePost(id int, req *model.UpdatePostRequest) error
	DeletePost(id int) error
}

type postUsecase struct {
	postRepo repository.PostRepository
}

func NewPostUsecase(postRepo repository.PostRepository) PostUsecase {
	return &postUsecase{postRepo: postRepo}
}

func (p *postUsecase) CreatePost(req *model.CreatePostRequest) error {
	now := time.Now()
	post := &model.Post{
		Title:       req.Title,
		Content:     req.Content,
		Category:    req.Category,
		Status:      req.Status,
		CreatedDate: now,
		UpdatedDate: now,
	}

	err := p.postRepo.CreatePost(post)
	if err != nil {
		return err
	}

	return nil
}

func (p *postUsecase) GetPostByID(id int) (*model.PostResponse, error) {
	user, err := p.postRepo.GetPostByID(id)

	if err != nil {
		return nil, err
	}

	userResponse := &model.PostResponse{
		ID:       user.ID,
		Title:    user.Title,
		Content:  user.Content,
		Category: user.Category,
		Status:   user.Status,
	}
	return userResponse, nil
}

func (p *postUsecase) GetPosts(limit, offset int) ([]model.PostResponse, error) {
	var users []model.Post
	var err error

	if limit == -1 {
		// Ambil semua data jika limit adalah -1
		users, err = p.postRepo.GetAllPosts()
	} else {
		// Ambil data dengan limit dan offset
		users, err = p.postRepo.GetPosts(limit, offset)
	}

	if err != nil {
		return nil, err
	}

	var usersResponse []model.PostResponse
	for _, user := range users {
		usersResponse = append(usersResponse, model.PostResponse{
			ID:       user.ID,
			Title:    user.Title,
			Content:  user.Content,
			Category: user.Category,
			Status:   user.Status,
		})
	}
	return usersResponse, nil
}

func (p *postUsecase) UpdatePost(id int, req *model.UpdatePostRequest) error {
	post, err := p.postRepo.GetPostByID(id)
	if err != nil {
		return err
	}

	post.Title = req.Title
	post.Content = req.Content
	post.Category = req.Category
	post.Status = req.Status
	post.UpdatedDate = time.Now()

	return p.postRepo.UpdatePost(id, post)
}

func (p *postUsecase) DeletePost(id int) error {
	return p.postRepo.DeletePost(id)
}
