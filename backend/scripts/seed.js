const fs = require("fs")
const path = require("path")
const pool = require("../src/config/database")

async function seed(){
    const seedFile = path.join(__dirname, "..", "seed-data", "products.json")
    const raw = fs.readFileSync(seedFile, "utf8")
    const { products } = JSON.parse(raw)

    let insertedCount = 0;
    try{
        for(const product of products){
            const { barcode, name, brand, category, image_url, is_counterfeit, notes } = product;
            const existing = await pool.query("SELECT id FROM products WHERE barcode=$1", [barcode])
            if (existing.rowCount > 0){
                continue
            }
            await pool.query("INSERT INTO products (barcode, name, brand, category, image_url, is_counterfeit, notes) VALUES ($1, $2, $3, $4, $5, $6, $7)", [barcode, name, brand, category, image_url, is_counterfeit, notes])
            insertedCount += 1;
            console.log(`Inserted product ${name} (barcode:${barcode})`)
        }
        console.log(`Seeded ${insertedCount} products total.`)
    }catch (error){
        console.error("Seed failed:", error.message)
    } finally {
        await pool.end()
    }
}

seed();
