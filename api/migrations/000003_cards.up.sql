CREATE TYPE credit_card_status AS ENUM (
  'ACTIVE',
  'BLOCKED',
  'CANCELED'
);

CREATE TYPE card_types AS ENUM (
  'AMERICAN_EXPRESS',
  'DINERS_CLUB',
  'DISCOVER',
  'JCB',
  'MASTERCARD',
  'VISA'
);

CREATE TABLE IF NOT EXISTS cards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    card_name VARCHAR(35),
    bank_name VARCHAR(35),
    last_four_number INT CHECK (last_four_number >= 0 AND last_four_number < 10000) NOT NULL,
    card_limit DECIMAL,
    credit_used DECIMAL,
    deadline_date TIMESTAMP,
    payment_date TIMESTAMP,
    card_status credit_card_status,
    card_type card_types, 
    user_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE INDEX cards_idx_card_id ON cards(id);
CREATE INDEX IF NOT EXISTS cards_user_id_index ON cards (user_id);
CREATE INDEX IF NOT EXISTS cards_deleted_at_index ON cards (deleted_at);
