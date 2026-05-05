CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    barcode VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(50),
    category VARCHAR(50) DEFAULT 'cosmetics',
    image_url TEXT NULL,
    is_counterfeit BOOLEAN DEFAULT false,
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode);