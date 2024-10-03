include .env
export

TABLE := $(table)
NAME := $(name)
VERSION := $(version)
LOCAL_BIN := $(CURDIR)/bin
PATH := $(LOCAL_BIN):$(PATH)

.PHONY: help
help: ## Display this help screen
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

migration-up: ## Run migrations
	migrate -database "$(DATABASE_URL)?sslmode=disable" -path migrations up $(VERSION)
.PHONY: migration-up

migration-down: ## Down migrations
	migrate -database "$(DATABASE_URL)?sslmode=disable" -path migrations down $(VERSION)
.PHONY: migration-down

migration-create: ## Create migration
	migrate create -ext sql -dir migrations $(VERSION) -seq $(NAME)
.PHONY: migration-create

migration-force: ## Force migrations
	migrate -database "$(DATABASE_URL)?sslmode=disable" -path migrations down $(VERSION) force $(VERSION)
.PHONY: migration-force

migration-version: ## Show migration version
	migrate -database "$(DATABASE_URL)?sslmode=disable" -path migrations down $(VERSION) version
.PHONY: migration-version
