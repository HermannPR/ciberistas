// ./backend/config.js
// --- LOCAL (Windows) ---
const config = {
    db: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'ciberistas',
        port: 3306,
        connectTimeout: 60000
    },
    listPerPage: 10,
};

module.exports = config;
