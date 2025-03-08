const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create a MySQL Connection Pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the Database Connection
(async () => {
    try {
        const connection = await db.getConnection();
        console.log("✅ MySQL Database Connected!");
        connection.release();
    } catch (err) {
        console.error("❌ MySQL Connection Failed:", err.message);
    }
})();

module.exports = db;
