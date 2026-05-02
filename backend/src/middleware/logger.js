const { AsyncLocalStorage } = require("node:async_hooks")
const { asyncLocalStorage } = require("./requestId")

function loggerMiddleware(req, res, next){
    const requestId = asyncLocalStorage.getStore();
    const start = Date.now()

    res.on("finish", () => {
        const duration = Date.now() - start;
        const timestamp = new Date().toISOString();
        const logMessage = `[${requestId}]: ${timestamp}: ${req.method}: ${req.url} - ${res.statusCode} ${duration}ms`
        console.log(logMessage)
    })
    next()
}

module.exports = loggerMiddleware;