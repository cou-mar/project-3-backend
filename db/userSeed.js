require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.model');

mongoose.connect(process.env.MONGODB_URI)
    .then(x => {
        console.log('CONNECTED TO DB NAMED', x.connections[0].name);
        return User.create({
            name: 'leo',
            email: 'leo@leo.com',
            password: 'leonardo'
        })
    })
    .then(createdUser => {
        console.log('THIS IS THE NEW USER', createdUser)
    })
    .catch(err => console.log(err))