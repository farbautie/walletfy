CREATE TABLE IF NOT EXISTS payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    amount DECIMAL NOT NULL,
    payment_date VARCHAR(12) NOT NULL,
    transaction_id UUID,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT fk_card FOREIGN KEY (transaction_id)
    REFERENCES transactions (id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS payments_idx_card_id ON payments (id);
CREATE INDEX IF NOT EXISTS payments_transaction_id_index ON payments (transaction_id);
CREATE INDEX IF NOT EXISTS payments_deleted_at_index ON payments (deleted_at);
