const express = require("express")
const router = express.Router()

//GET /health
router.get("/", (req, res) => {
    const healthCheck = {
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now()
    }
    try{ //try/catch not necessary
        res.status(200).json(healthCheck)
    }catch(error){
        healthCheck.message = "error"
        res.status(503).send()
    }
})

module.exports = router;