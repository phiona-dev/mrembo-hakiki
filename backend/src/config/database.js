const { POOL } = require("pg");
require("dotenv").config()

const pool = new POOL({ url: process.env.DATABASE_URL })

module.exports = pool;
