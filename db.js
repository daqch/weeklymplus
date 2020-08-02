const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "elmaster98",
  host: "localhost",
  port: 5432,
  database: "weeklymplus",
});

module.exports = pool;
