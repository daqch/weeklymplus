const Pool = require("pg").Pool;

const pool = new Pool({
  user: "diegoadmin",
  password: "elmaster98",
  host: "weeklymplus.cupzmbdch1fu.us-east-1.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
});

module.exports = pool;
