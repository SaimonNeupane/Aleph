package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"strings"

	"github.com/SaimonNeupane/Aleph/full_text_search/config"
	search "github.com/SaimonNeupane/Aleph/full_text_search/utils"
	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

type query struct {
	keyword string
	URL     url.URL
}

func main() {
	mux := http.NewServeMux()

	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	cfg := config.New()

	address := fmt.Sprintf("%s:%d", cfg.DB.Host, cfg.DB.Port)
	rdb := redis.NewClient(&redis.Options{
		Addr:     address,
		Password: cfg.DB.Password,
		DB:       cfg.DB.DBName,
	})

	err := rdb.Set(context.Background(), "key", "value", 0).Err()

	if err != nil {
		panic(err)
	}

	val, err := rdb.Get(context.Background(), "key").Result()

	fmt.Println(val)

	mux.HandleFunc("/ping", Ping)
	mux.HandleFunc("GET /api/query/{keywords}", QueryFunc(rdb))

	serverString := fmt.Sprintf(":%v", cfg.Server.Port)
	http.ListenAndServe(serverString, mux)
}

func QueryFunc(rdb *redis.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		keywords := r.PathValue("keywords")
		fmt.Println("you searched for", keywords)
		res := strings.Split(keywords, " ")
		fmt.Println(res)
		websites := search.Search(res, rdb)
		fmt.Println(websites)
	}
}

func Ping(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "not allowed", http.StatusMethodNotAllowed)
	}
	w.Write([]byte("pong\n"))
}
