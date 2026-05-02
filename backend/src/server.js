const { requestMiddleware } = require("./middleware/requestId")
const loggerMiddleware = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const express = require("express")
const cors = require("cors");
const healthRouter = require("./routes/health")
require("dotenv").config();

const app = express();

app.use(cors())
app.use(express.json())
app.use(requestMiddleware)
app.use(loggerMiddleware)

app.use("/health", healthRouter)

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" })
})
//after all routes
app.use(errorHandler)

const PORT = process.env.PORT ||5000
const NODE_ENV = process.env.NODE_ENV || "development"

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})