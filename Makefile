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

MIGRATION_COMMENT ?= $(shell bash -c 'read -p "Comments: " pwd; echo $$pwd')
migrate-new: ## マイグレーションファイル作成
	DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME)?sslmode=disable $(GOBIN)/dbmate -d $(DBMATE_DB_SCHEMA)/db_schema/migrations -s $(DBMATE_DB_SCHEMA)/db_schema/schema.sql new $(MIGRATION_COMMENT)

migrate-status: ## マイグレーションステータス確認
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME)?sslmode=disable $(GOBIN)/dbmate -d $(DBMATE_DB_SCHEMA)/db_schema/migrations -s $(DBMATE_DB_SCHEMA)/db_schema/schema.sql status

migrate-up: ## マイグレーション実行
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME)?sslmode=disable $(GOBIN)/dbmate -d $(DBMATE_DB_SCHEMA)/db_schema/migrations -s $(DBMATE_DB_SCHEMA)/db_schema/schema.sql up

migrate-down: ## マイグレーションロールバック
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME)?sslmode=disable $(GOBIN)/dbmate -d $(DBMATE_DB_SCHEMA)/db_schema/migrations -s $(DBMATE_DB_SCHEMA)/db_schema/schema.sql down

migrate-drop: ## データベース削除
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME)?sslmode=disable $(GOBIN)/dbmate -d $(DBMATE_DB_SCHEMA)/db_schema/migrations -s $(DBMATE_DB_SCHEMA)/db_schema/schema.sql drop

migrate-seed: ## データベース初期データ投入
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME)?sslmode=disable $(GOBIN)/dbmate -d $(DBMATE_DB_SCHEMA)/db_schema/seed -s $(DBMATE_DB_SCHEMA)/db_schema/schema.sql up

## マイグレーションリセット
migrate-reset: migrate-drop migrate-up migrate-seed

.PHONY: backend/format
backend/format: ## コードのフォーマット
	@goimports -local gaishi-app -w ./backend

.PHONY: gen
gen: gen-dbmodel gen-api backend/format ## 生成系のコマンドを実行

.PHONY: gen-dbmodel
gen-dbmodel: clean-dbmodel ## DBモデルを生成
	@go run -mod=mod github.com/xo/xo schema $(DATABASE_HOST)/$(RDB_NAME)?sslmode=disable --out backend/db_model --src backend/db_model/templates/go

.PHONY: clean-dbmodel
clean-dbmodel: ## DBモデルを削除
	@rm -rf backend/db_model/*.xo.go

.PHONY: gen-api
gen-api:
	$(GOBIN)/gqlgen

.PHONY: start-backend
start-backend:
	docker compose -f backend/docker-compose.yml up -d
.PHONY: stop-backend
stop-backend:
	docker compose -f backend/docker-compose.yml down
.PHONY: build-backend-nocache
build-backend-nocache:
	docker compose -f backend/docker-compose.yml build --no-cache
