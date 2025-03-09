const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Test Database Connection
db.getConnection()
    .then(connection => {
        console.log('✅ MySQL Connected Successfully!');
        connection.release();
    })
    .catch(err => {
        console.error('❌ MySQL Connection Failed:', err);
    });

module.exports = db;
