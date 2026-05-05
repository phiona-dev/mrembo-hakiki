const fs = require("fs")
const path = require("path")
const pool = require("../src/config/database")

async function runMigrations(){
    //create migrations table if it doesn't exist
    await pool.query(`
        CREATE TABLE IF NOT EXISTS migrations (
            id SERIAL PRIMARY KEY,
            filename VARCHAR(255) UNIQUE NOT NULL,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `)

    const migrationsDir = path.join(__dirname, "../migrations")
    const files = fs.readdirSync(migrationsDir).sort()

    for (const file of files){ //files is an array
        if(file.endsWith(".sql")){
            //check if migration has already been run
            const checkResult = await pool.query("SELECT id FROM migrations WHERE filename = $1", [file])

            if (checkResult.rows.length > 0){
                console.log(`Skipping ${file} - already executed`)
                continue
            }

            console.log(`Running migration: ${file}`)
            const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8")
            await pool.query(sql)

            //Record the migrations as executed
            await pool.query("INSERT INTO migrations (filename) VALUES ($1)", [file])
            
            console.log(`Completed ${file} migration`)
        }
    }
    console.log("All migrations completed")
    await pool.end()
}

runMigrations().catch(console.error)