require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index.routes');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');


const app = express();

app.use(logger('dev'));
app.use(cors({
    origin: '*',
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

mongoose.connect(process.env.MONGODB_URI)
    .then(x => {
        console.log('CONNECTED TO DB NAMED', x.connections[0].name)
    })
    .catch(err => console.log('ERROR STARTING SERVER', err))

module.exports = app;