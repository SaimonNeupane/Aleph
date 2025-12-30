package utils

import (
	"context"
	"fmt"
	"regexp"
	"sort"
	"strconv"
	"strings"

	"github.com/kljensen/snowball"
	"github.com/redis/go-redis/v9"
)

func ProcessKeywords(k []string) []string {
	var a []string
	reg := regexp.MustCompile(`[^a-z0-9]`)

	for _, val := range k {
		val = strings.ToLower(val)

		stemmed, err := snowball.Stem(val, "english", true)
		if err != nil {
			stemmed = val
		}

		cleaned := reg.ReplaceAllString(stemmed, "")
		if cleaned == "" {
			continue
		}

		a = append(a, cleaned)
	}
	fmt.Println("Processed: ", a)
	return a
}

func Intersection(r []string, val []string) []string {
	maxLen := len(r)
	if len(val) > maxLen {
		maxLen = len(val)
	}
	res := make([]string, 0, maxLen)
	i, j := 0, 0
	for i < len(r) && j < len(val) {
		rInt, _ := strconv.Atoi(r[i])
		valInt, _ := strconv.Atoi(val[j])
		if rInt < valInt {
			i++
		} else if rInt > valInt {
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
		sort.Slice(val, func(i, j int) bool {
			a, _ := strconv.Atoi(val[i])
			b, _ := strconv.Atoi(val[j])
			return a < b
		})
		if r == nil {
			r = val
		} else {
			r = Intersection(r, val)
		}
	}
	return r
}
