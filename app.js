const express = require('express');
const app = express();
const mongoose = require('mongoose');

const studentRoutes = require('./api/routes/students');

mongoose.connect('mongodb+srv://Antor-094:'+ process.env.MONGO_PASS+'@cluster0.psmni.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
app.use('/students',studentRoutes);

module.exports = app;