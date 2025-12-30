package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"strconv"
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
	defer rdb.Close()

	err := rdb.Set(context.Background(), "key", "value", 0).Err()

	if err != nil {
		panic(err)
	}

	val, err := rdb.Get(context.Background(), "key").Result()

	fmt.Println(val)

	mux.HandleFunc("/ping", Ping)
	mux.HandleFunc("GET /api/query/{keywords...}", QueryFunc(rdb))

	serverString := fmt.Sprintf(":%v", cfg.Server.Port)
	server := cors(mux)
	http.ListenAndServe(serverString, server)
}

func QueryFunc(rdb *redis.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		page, err := strconv.Atoi(r.URL.Query().Get("page"))
		if err != nil || page < 1 {
			page = 1
		}
		limit, err := strconv.Atoi(r.URL.Query().Get("limit"))
		if err != nil || limit < 1 {
			limit = 10
		}
		keywords := r.PathValue("keywords")
		fmt.Println("you searched for", keywords)
		res := strings.Fields(keywords)
		res = search.ProcessKeywords(res)
		fmt.Println(res)
		AllIds := search.Search(res, rdb)
		object, _ := search.Paginate(res, AllIds, limit, page, rdb)
		fmt.Println(object)
		fmt.Println(AllIds)
		jsonObj, err := json.Marshal(object)
		if err != nil {
			fmt.Println("error while marshaling")
		}
		n, err := w.Write(jsonObj)
		if err != nil {
			fmt.Println("error writing response")
		}
		fmt.Println("wrote ", n, " bytes")
	}
}

func Ping(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "not allowed", http.StatusMethodNotAllowed)
	}
	w.Write([]byte("pong\n"))
}

func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
