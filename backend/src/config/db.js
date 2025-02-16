const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'YourCorrectPassword', // Use the password you just entered in MySQL
    database: 'edtech_db' // Ensure this database exists in MySQL
});

db.connect((err) => {
    if (err) {
        console.error('❌ MySQL Connection Error:', err);
    } else {
        console.log('✅ MySQL Connected');
    }
});

module.exports = db;
