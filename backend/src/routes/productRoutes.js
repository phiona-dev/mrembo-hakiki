const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")

router.get("/:barcode", async (req, res) => {
    try {
        await productController(req, res)
    } catch(error){
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
})

module.exports = router;