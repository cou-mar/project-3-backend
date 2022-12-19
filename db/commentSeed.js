require('dotenv').config();
const mongoose = require('mongoose');
const Comment = require('../models/Comment.model');

mongoose.connect(process.env.MONGODB_URI)
    .then(x => {
        console.log('CONNECTED TO DB NAMED', x.connections[0].name);
        return Comment.create({
            body: 'testing comment model'
        })
    })
    .then(createdComment => {
        console.log('THIS IS THE NEW COMMENT', createdComment)
    })
    .catch(err => console.log(err))