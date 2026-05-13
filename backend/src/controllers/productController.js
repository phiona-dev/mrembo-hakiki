const { getProduct } = require("../services/productService")
const { asyncLocalStorage } = require("../middleware/requestId")

async function productController(req, res) {
    const { barcode } = req.params;
    const { is_counterfeit } = req.query;

    const store = asyncLocalStorage.getStore();
    store.debugInfo.requestedBarcode = barcode


    const product = await getProduct(barcode) //returns a promise.
    store.debugInfo.returnedBarcode = product?.barcode
    store.debugInfo.returnedName = product?.name
    
    
    if(product){ //A promise is always truthy
        return res.status(200).json({
            message: "Product retrieved successfully", 
            //is_counterfeit: "is_counterfeit" in req.query?.undefined, //undefined means we won't include it in the response
            product,
        })
    } else {
        return res.status(404).json({ message: "Product not found" })
    }
}

module.exports = productController