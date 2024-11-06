require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
//const mongoose = require('mongoose');
const connectDB = require('./server/config/db');

const app = express();
const PORT = process.env.PORT || 3000;

//database connection
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(express.static('public'));

//template engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });