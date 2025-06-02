// ./backend/routes/dateRoutes

const express = require('express');
const router = express.Router();
const dateService = require('../services/dateService.js');

// GET existing dates
router.get('/', async function(req, res, next) {
    try {
        res.json(await dateService.getMultiple(req.query.page));
    } catch (err) {
        console.error('Error while getting dates:', err.message);
        next(err);
    }
});

// POST new date
router.post('/', async function(req, res, next) {
    try {
        const { date } = req.body;

        if (!date) {
            return res.status(400).json({ error: 'Missing required field: date' });
        }

        res.json(await dateService.create(date));
    } catch (err) {
        console.error('Error while creating date:', err.message);
        next(err);
    }
});

module.exports = router;
