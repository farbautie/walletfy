CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date VARCHAR(12) NOT NULL,
    amount DECIMAL NOT NULL,
    total_fees INT NOT NULL,
    credit_card_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT fk_card FOREIGN KEY (credit_card_id)
    REFERENCES cards(id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS transactions_idx_card_id ON transactions(id);
CREATE INDEX IF NOT EXISTS transactions_card_id_index ON transactions (credit_card_id);
CREATE INDEX IF NOT EXISTS transactions_deleted_at_index ON transactions (deleted_at);
