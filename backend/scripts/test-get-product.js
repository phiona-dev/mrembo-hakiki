const { getProduct } = require("../src/services/productService")

async function run() {
    let barcode = process.argv[2] || "4901234567890"
    

    const product = await getProduct(barcode)

    if (product){
        console.log("Found product:", product)
    } else {
        console.log("No product found for barcode: ", barcode)
    }

    process.exit(0)
}

run().catch(error => {
    console.error("Test failed: ", error)
    process.exit(1)
})