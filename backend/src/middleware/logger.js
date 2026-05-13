const { AsyncLocalStorage } = require("node:async_hooks")
const { asyncLocalStorage } = require("./requestId")

function loggerMiddleware(req, res, next){
    const store = asyncLocalStorage.getStore();
    const requestId = store.id;
    const start = Date.now()

    res.on("finish", () => {
        const duration = Date.now() - start;
        const timestamp = new Date().toISOString();
        const debugInfo = store.debugInfo;

        let debugStr = "";
        if (Object.keys(debugInfo).length > 0){
            debugStr = ` | ${JSON.stringify(debugInfo)}`
        }


        const logMessage = `[${requestId}]: ${timestamp}: ${req.method}: ${req.url} - ${res.statusCode} ${duration}ms${debugStr}`
        console.log(logMessage)
    })
    next()
}

module.exports = loggerMiddleware;