const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOSTNAME,
    port: process.env.DB_PORT,
    database: process.env.DB
})

module.exports = pool;