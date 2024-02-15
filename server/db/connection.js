const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodetest'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.code);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;