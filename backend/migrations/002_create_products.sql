CREATE TABLE products (
    id UUID PRIMARY KEY
    barcode VARCHAR(100) NOT NULL
    name VARCHAR(100) NOT NULL
    brand VARCHAR(50)
    category VARCHAR(50) DEFAULT 'cosmetics'
    image_url TEXT NULL
    is_counterfeit BOOLEAN DEFAULT false
    notes TEXT NULL
    created_at TIMESTAMP
    updated_at TIMESTAMP
)

CREATE INDEX barcode_value on products (barcode)