package config

import (
	"fmt"
	"log"
	"os"

	"github.com/Ayyasy123/sharing-vision/internal/model"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// // Ambil environment variable
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	// // Buat DSN
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbUser, dbPassword, dbHost, dbPort, dbName,
	)

	// Konfigurasi koneksi database with xampp
	// dsn := "root:@tcp(127.0.0.1:3306)/sharing-vision?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Error connecting to database", err)
	}

	// migrate the schema
	err = db.AutoMigrate(&model.Post{})
	if err != nil {
		log.Fatal("Error migrating schema", err)
	}

	DB = db
	fmt.Println("Connected to database and migrated successfully")

}
