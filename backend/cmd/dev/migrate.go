package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func runMigration(dbUrl string) error {
	log.Println("Running migration...")

	// parse json
	data, err := os.ReadFile("/app/db_schema/config.json")
	if err != nil {
		return fmt.Errorf("failed to read config.json: %w", err)
	}
	type MigrationConfig struct {
		Version *uint `json:"version"`
		Force   *uint `json:"force"`
	}
	var configMigration MigrationConfig
	if err := json.Unmarshal(data, &configMigration); err != nil {
		return fmt.Errorf("failed to unmarshal config.json: %w", err)
	}

	if configMigration.Version == nil {
		return errors.New("version key is missing")
	}

	m, err := migrate.New("file:///app/db_schema/migrations", dbUrl)
	if err != nil {
		return fmt.Errorf("failed to create migration: %w", err)
	}
	version, b, err := m.Version()
	if err != nil {
		if errors.Is(err, migrate.ErrNilVersion) {
			log.Println("No migration version found.")
			version = 0
		} else {
			return fmt.Errorf("failed to get version: %w", err)
		}
	}
	log.Printf("Current version: %v\n, dirty: %v\n", version, b)

	if configMigration.Force != nil {
		log.Printf("Forcing version: %v\n", *configMigration.Force)
		if err := m.Force(int(*configMigration.Force)); err != nil {
			return fmt.Errorf("failed to force migration: %w", err)
		}
		log.Println("Force Migration done.")
		return nil
	}
	log.Printf("Migrating to version: %v\n", *configMigration.Version)
	if err := m.Migrate(*configMigration.Version); err != nil {
		if !errors.Is(err, migrate.ErrNoChange) {
			return fmt.Errorf("failed to migrate: %w", err)
		}
	}
	log.Println("Migration done.")
	return nil
}
