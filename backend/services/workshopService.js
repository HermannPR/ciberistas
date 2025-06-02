// ./backend/services/workshopService.js

const db = require('../db');

async function getMultiple(page = 1) {
    // Llama al procedimiento almacenado para obtener talleres reales
    const talleres = await db.callProcedure('SP_LGG_getTalleres');
    return talleres;
}

async function create(workshop) {
    // Aquí podrías llamar a un procedimiento para insertar talleres si lo deseas
    return { id: Math.floor(Math.random() * 10000), ...workshop };
}

module.exports = {
    getMultiple,
    create
};
