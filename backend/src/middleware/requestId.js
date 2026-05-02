const { AsyncLocalStorage } = require("node:async_hooks")
const crypto = require("node:crypto")
const asyncLocalStorage = new AsyncLocalStorage();

function requestMiddleware(req, res, next){
    const id = crypto.randomUUID();
    asyncLocalStorage.run(id, () => {
        res.setHeader("X-Request-Id", id);
        next();
    })
}

module.exports = { requestMiddleware, asyncLocalStorage };