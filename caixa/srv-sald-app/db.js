const mysql = require('mysql2/promise')

const connection = mysql.createPool({
    host: '0.0.0.0',
    port: 8036,
    database: 'relatorio',
    user: 'root',
    password: 'root'
});

module.exports = connection;