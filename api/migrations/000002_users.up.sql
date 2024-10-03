CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(65) NOT NULL UNIQUE,
    hashed_password VARCHAR(110) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT email_unique UNIQUE (email)
);

CREATE INDEX IF NOT EXISTS users_email_index ON users (email);
CREATE INDEX IF NOT EXISTS users_deleted_at_index ON users (deleted_at);
