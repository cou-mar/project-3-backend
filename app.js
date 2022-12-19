require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index.routes');
const authRouter = require('./routes/auth.routes');

const PORT = process.env.PORT;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

mongoose.connect(process.env.MONGODB_URI)
    .then(x => {
        console.log('CONNECTED TO DB NAMED', x.connections[0].name)
    })
    .catch(err => console.log('ERROR STARTING SERVER', err))

module.exports = app;