// ./backend/routes/workshopRoutes.js

const express = require('express');
const router = express.Router();
const workshopService = require('../services/workshopService.js');

// GET existing workshops
router.get('/', async function(req, res, next) {
    try {
        res.json(await workshopService.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting the workshops:`, err.message);
        next(err);
    }
});

// POST new workshop
router.post('/', async function(req, res, next) {
    try {
        res.json(await workshopService.create(req.body));
    } catch (err) {
        console.error(`Error while creating the workshop:`, err.message);
        next(err);
    }
});

module.exports = router;
