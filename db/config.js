const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";
const hasRealConnectionString =
  typeof process.env.DATABASE_URL === "string" &&
  /^postgres(?:ql)?:\/\//i.test(process.env.DATABASE_URL);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: hasRealConnectionString ? undefined : process.env.DB_DATABASE_NAME,
  connectionString: hasRealConnectionString
    ? process.env.DATABASE_URL
    : undefined,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

pool.on("connect", () => {
  const dbName = hasRealConnectionString
    ? process.env.DATABASE_URL.split("/").pop().split("?")[0]
    : process.env.DB_DATABASE_NAME;

  console.log(
    `Connected to the database ${dbName} at ${process.env.DB_HOST}:${process.env.DB_PORT} as user ${process.env.DB_USER}`,
  );
});

module.exports = pool;
