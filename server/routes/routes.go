package routes

import (
	"github.com/Ayyasy123/sharing-vision/internal/handler"
	"github.com/Ayyasy123/sharing-vision/internal/repository"
	"github.com/Ayyasy123/sharing-vision/internal/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(db *gorm.DB, router *gin.Engine) {
	userRepo := repository.NewPostRepository(db)
	userUsecase := usecase.NewPostUsecase(userRepo)
	handler := handler.NewPostHandler(userUsecase)

	router.POST("/article", handler.CreatePost)
	router.GET("/article", handler.GetPosts)
	router.GET("/article/:id", handler.GetPostByID)
	router.PUT("/article/:id", handler.UpdatePost)
	router.DELETE("/article/:id", handler.DeletePost)
}
