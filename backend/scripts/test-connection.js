const pool = require("../src/config/database")

async function testConnection(){
    try{
        const result = await pool.query("SELECT NOW()")
        console.log("Connection successful")
        console.log("Current timestamp: ", result.rows[0].now)

        const usersResult = await pool.query("SELECT COUNT(*) FROM users")
        console.log(`User table has ${usersResult.rows[0].count} records`)

        const productsResult = await pool.query("SELECT COUNT(*) FROM products")
        console.log(`Products table has ${productsResult.rows[0].count} records`)

        const productsIngredientsResult = await pool.query("SELECT COUNT(*) FROM products_ingredients")
        console.log(`Products_Ingredients table has ${productsIngredientsResult.rows[0].count} records`)
    }catch (error){
        console.error("Connection failed", error.message)
    } finally {
        await pool.end()
    }
}

testConnection()