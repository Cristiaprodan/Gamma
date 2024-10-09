// server/db.js
const { Client } = require("pg"); // Use require after switching to CommonJS

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_URL,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

client
  .connect()
  .then(() => {
    console.log("PostgreSQL connection successful.");
  })
  .catch((err) => {
    console.error("PostgreSQL connection error:", err);
  });

module.exports = client;
