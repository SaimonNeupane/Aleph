package search

import (
	"context"

	"github.com/redis/go-redis/v9"
)

func Intersection(r []string, val []string) []string {
	maxLen := len(r)
	if len(val) > maxLen {
		maxLen = len(val)
	}
	res := make([]string, 0, maxLen)
	var i, j int
	for i < len(r) && j < len(val) {
		if r[i] < val[j] {
			i++
		} else if r[i] > val[j] {
			j++
		} else {
			res = append(res, r[i])
			i++
			j++
		}
	}
	return res
}

func Search(keys []string, rdb *redis.Client) []string {
	var r []string
	for _, token := range keys {
		val, err := rdb.SMembers(context.Background(), token).Result()
		if err != nil {
			return nil
		}
		if r == nil {
			r = val
		} else {
			r = Intersection(r, val)
		}
	}
	return r
}
