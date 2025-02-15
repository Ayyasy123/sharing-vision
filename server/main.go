package main

import (
	"log"
	"net/http"
	"time"

	"github.com/Ayyasy123/sharing-vision/config"
	"github.com/Ayyasy123/sharing-vision/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDatabase()

	// CORS middleware configuration

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://example.com"}, // Allowed domains
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},      // Allowed methods
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},      // Allowed headers
		ExposeHeaders:    []string{"Content-Length"},                               // Exposed headers
		AllowCredentials: true,                                                     // Allow credentials (cookies, authorization headers)
		MaxAge:           12 * time.Hour,                                           // Cache preflight requests for 12 hours
	}))
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	routes.SetupRoutes(config.DB, router)

	// start the server
	log.Println("Server is running on port 8080")
	err := router.Run(":8080")
	if err != nil {
		log.Fatal(err)
	}
}
