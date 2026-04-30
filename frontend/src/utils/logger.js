
class Logger {
    constructor(){
        this.levels = ["debug", "info", "warn", "error"]
        this.currentLevel = "debug"
        this.sessionId = crypto.randomUUID()
    }

    setLevel(level){
        if (this.levels.includes(level)){
            this.currentLevel = level;
        } else {
            console.error(`Invalid log level: ${level}`)
        }
    }

    log(level, message, context={}){
        const levelIndex = this.levels.indexOf(level)
        const currentLevelIndex = this.levels.indexOf(this.currentLevel)
        if (levelIndex >= currentLevelIndex){
            const timestamp = new Date().toISOString()
            const logMessage =   `[${this.sessionId}] ${level.toUpperCase()} ${timestamp}: ${message}${Object.keys(context).length > 0 ? ` | ${JSON.stringify(context)}` : ''}`
            console[level](logMessage)
        }
    }

    sendLog = async (level, message, context={}) => {
        try{
            await fetch("/api/logs/client-errors", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ level, message, context, sessionId: this.sessionId})
            })
        } catch (error) {
            console.error("Failed to send log to server: ", error)
        }
    }

    debug(message, context){
        this.log("debug", message, context)
    }

    info(message, context){
        this.log("info", message, context)
    }
    warn(message, context){
        this.log("warn", message, context)
        this.sendLog("warn", message, context)
    }
    error(message, context){
        this.log("error", message, context)
        this.sendLog("error", message, context)
    }
}

const logger = new Logger()
export default logger;