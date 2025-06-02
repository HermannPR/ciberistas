const express = require('express');
const workshopRoutes = require('./routes/workshopRoutes.js');
const dateRoutes = require('./routes/dateRoutes');


const app = express();
const port = 3000;

app.use(express.json());


// Main
app.use(
    express.urlencoded({
	extended: true,
    })
);

// GET for test purposes
app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

// API routes
app.use('/workshops', workshopRoutes);
app.use('/dates', dateRoutes);

// error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(port, () => {
    console.log(`Ciberistas backend is running in http://localhost:${port}`)
})
