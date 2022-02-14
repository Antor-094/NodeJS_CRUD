const express = require('express');
const app = express();

const studentRoutes = require('./api/routes/students');

app.use('/students',studentRoutes);

module.exports = app;