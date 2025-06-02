// ./backend/services/dateService.js

async function getCurrentDate() {
    // Devuelve la fecha y hora actual
    return { date: new Date().toISOString() };
}

async function create(dateObj) {
    // Simula guardar una fecha (placeholder)
    return { id: Math.floor(Math.random() * 10000), ...dateObj };
}

module.exports = {
    getCurrentDate,
    create
};
