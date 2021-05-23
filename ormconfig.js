module.exports = {
  "type": "mysql",
  "host": process.env.DB_HOST || "localhost",
  "port": process.env.DB_PORT || 3306,
  "username": process.env.DB_USER || "root",
  "password": process.env.DB_PASS || "root",
  "database": process.env.DB_NAME || "smartcitizen",
  "logging": false,
  "entities": ["./src/models/**/*.ts"],
  "migrations": ["./src/database/migrations/**/*.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations/**/*.ts",
  }
};