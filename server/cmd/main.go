package main

import (
	"os"
	"time"

	"github.com/francosae/ai-interviewer/server/pkg/config"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

func main() {
	c, err := config.LoadConfig()

	if err != nil {
		log.Fatal().Err(err).Msg("Failed at loading config")
	}
	log.Logger = zerolog.New(zerolog.ConsoleWriter{Out: os.Stderr, TimeFormat: time.RFC3339}).With().Timestamp().Logger()

	r := gin.Default()

	r.Run(c.Port)
}
