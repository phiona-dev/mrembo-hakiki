const { getProduct } = require("../services/productService")

async function productController(req, res) {
    const { barcode } = req.params;
    const product = await getProduct(barcode) //returns a promise. 
    if(product){ //A promise is always truthy
        return res.status(200).json({
            message: "Product retrieved successfully", 
            product,
        })
    } else {
        return res.status(404).json({ message: "Product not found" })
    }
}

module.exports = productController