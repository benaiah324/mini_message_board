const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE_URL || process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on("connect", () => {
  ssl: isProduction ? { rejectUnauthorized: false } : false;
  console.log(
    `Connected to the database ${process.env.DATABASE_URL ? process.env.DATABASE_URL.split("/")[3] : process.env.DB_DATABASE_NAME} at 
    ${process.env.DB_HOST}:${process.env.DB_PORT} as user 
    ${process.env.DB_USER}`,
  );
});

module.exports = pool;
