const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',       // your database username
  host: 'localhost',           // your database host
  database: 'OINS_DB',   // your database name
  password: 'admin',   // your database password
  port: 5432,                  // default PostgreSQL port
});

module.exports = pool;