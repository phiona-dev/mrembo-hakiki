CREATE TABLE products_ingredients (
    id UUID PRIMARY KEY
    product_id int
    FOREIGN KEY (product_id) REFERENCES products(id)
    ingredient_name VARCHAR(100)
    is_flagged BOOLEAN
)