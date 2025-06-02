// ./backend/db.js
const mysql = require('mysql2/promise');
const config = require('./config');

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    try {
        const [results, ] = await connection.execute(sql, params);
        return results;
    } finally {
        await connection.end();
    }
}

async function callProcedure(procName, params = []) {
    const connection = await mysql.createConnection(config.db);
    try {
        const [results] = await connection.query(
            `CALL ${procName}(${params.map(() => '?').join(',')})`,
            params
        );
        return results[0] || results;
    } finally {
        await connection.end();
    }
}

module.exports = {
    query,
    callProcedure
};
