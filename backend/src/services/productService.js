const pool = require("../config/database")

//async function getAllProducts(){
  //  const result = await pool.query("SELECT * FROM products")
    //return result.rows
//}

async function getProduct(barcode){
    const result = await pool.query("SELECT * FROM products WHERE barcode=$1", [barcode])
    //await pool.query("SELECT pg_sleep(5)")
    
    if (result){
        return result.rows[0]
    } else {
        return null
    } // or simply result.rows[0] || null
}

module.exports = { getProduct }