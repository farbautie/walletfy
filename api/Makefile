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


run: ## Run application
	@echo "Running..."
	@go run cmd/api/main.go
.PHONY: run

build: ## Build the binary
	@echo "Building..."
	@go build -o main cmd/api/main.go
.PHONY: build

clean: ## Clean the binary
	@echo "Cleaning..."
	@rm -f main
.PHONY: clean

watch: ## Live reload
	@echo "Watching..."
	@if command -v air > /dev/null; then \
            air; \
            echo "Watching...";\
        else \
            read -p "Go's 'air' is not installed on your machine. Do you want to install it? [Y/n] " choice; \
            if [ "$$choice" != "n" ] && [ "$$choice" != "N" ]; then \
                go install github.com/air-verse/air@latest; \
                air; \
                echo "Watching...";\
            else \
                echo "You chose not to install air. Exiting..."; \
                exit 1; \
            fi; \
        fi
.PHONY: watch

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

