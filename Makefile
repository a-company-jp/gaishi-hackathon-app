MD := $(subst $(BSLASH),$(FSLASH),$(shell dirname "$(realpath $(lastword $(MAKEFILE_LIST)))"))
export GOBIN := $(MD)/bin
export PATH := $(GOBIN):$(PATH)

.PHONY: help
help: ## ヘルプを出力
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: gen-help-md
gen-help-md: ## ヘルプをMarkdown形式で出力
	@printf "| コマンド | 説明 |\n"
	@printf "|---------|-------------|\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "| make %-20s | %s |\n", $$1, $$2}'


# TODO: update this to use backend folder
go-install-tools: ## Goツールをインストール
	@echo Install go tools
	@mkdir -p $(GOBIN)
	@cat tools.go | grep _ | awk -F'"' '{print $$2}' | xargs -t -n 1 go install

RDB_HOST ?= 127.0.0.1
RDB_PORT ?= 5432
RDB_USER ?= user
RDB_PASS ?= password
RDB_NAME ?= gaishi
DBMATE_DB_SCHEMA ?= backend
DATABASE_HOST ?= postgres://$(RDB_USER):$(RDB_PASS)@$(RDB_HOST):$(RDB_PORT)
DATABASE_URL ?= $(DATABASE_HOST)/$(RDB_NAME)?sslmode=disable

MIGRATION_COMMENT ?= $(shell bash -c 'read -p "Comments: " pwd; echo $$pwd')
migrate-new: ## マイグレーションファイル作成
ifndef NAME
	@echo "Usage: make NAME=migration_name migrate-new"
else
	migrate create -ext sql -dir ./backend/db_schema/migrations -seq $(NAME)
endif

migrate-setup:
	@go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

migrate-up: ## マイグレーション実行
	migrate -source file://backend/db_schema/migrations -database $(DATABASE_URL) up

migrate-down: ## マイグレーションロールバック
	migrate -source file://backend/db_schema/migrations -database $(DATABASE_URL) down 1

migrate-drop: ## データベース削除
	migrate -source file://backend/db_schema/migrations -database $(DATABASE_URL) drop

migrate-seed-new: ## マイグレーションファイル作成
ifndef NAME
	@echo "Usage: make NAME=migration_name migrate-new"
else
	migrate create -ext sql -dir ./backend/db_schema/seed -seq $(NAME)
endif

migrate-seed-up: ## データベース初期データ投入
	migrate -source file://backend/db_schema/seed -database "$(DATABASE_URL)&x-migrations-table=schema_migrations_seed" up

migrate-seed-down: ## データベース初期データ投入
	migrate -source file://backend/db_schema/seed -database "$(DATABASE_URL)&x-migrations-table=schema_migrations_seed" down 1

## マイグレーションリセット
migrate-reset: migrate-drop migrate-up migrate-seed-up

#.PHONY: backend/format
#backend/format: ## コードのフォーマット
#	@goimports -local gaishi-app -w ./backend

.PHONY: gen
gen: gen-dbmodel gen-api ## 生成系のコマンドを実行

.PHONY: gen-dbmodel
gen-dbmodel: clean-dbmodel ## DBモデルを生成
	@go run -mod=mod github.com/xo/xo schema $(DATABASE_HOST)/$(RDB_NAME)?sslmode=disable --out backend/db_model --src backend/db_model/templates/go -e schema_migrations*

.PHONY: clean-dbmodel
clean-dbmodel: ## DBモデルを削除
	@rm -rf backend/db_model/*.xo.go

.PHONY: gen-api
gen-api: ## schema.graphqlsとmodel.graphqlsからGoのコードを生成する
	cd backend && go run github.com/99designs/gqlgen generate

.PHONY: start-backend
start-backend: ## APIとDBの起動
	docker compose up -d
.PHONY: stop-backend
stop-backend: ## APIとDBの停止
	docker compose down
.PHONY: build-backend-nocache
build-backend-nocache: ## nocacheでビルド
	docker compose build --no-cache
