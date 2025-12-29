package config

import (
	"log"

	"github.com/joeshaw/envdecode"
)

type Conf struct {
	Server ConfServer
	DB     ConfDB
}

type ConfDB struct {
	Host     string `env:"DB_HOST,required"`
	Port     int    `env:"DB_PORT,required"`
	Username string `env:"DB_USER"`
	Password string `env:"DB_PASS"`
	DBName   int    `env:"DB_NAME"`
}

type ConfServer struct {
	Port  int  `env:"SERVER_PORT,required"`
	Debug bool `env:"SERVER_DEBUG,required"`
}

func New() *Conf {
	var c Conf
	if err := envdecode.StrictDecode(&c); err != nil {
		log.Fatalf("Failed to decode: %s", err)
	}

	return &c
}

func NewDB() *ConfDB {
	var c ConfDB
	if err := envdecode.StrictDecode(&c); err != nil {
		log.Fatalf("Failed to decode: %s", err)
	}

	return &c
}
