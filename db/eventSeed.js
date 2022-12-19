require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('../models/Event.model');

mongoose.connect(process.env.MONGODB_URI)
    .then(x => {
        console.log('CONNECTED TO DB NAMED', x.connections[0].name);
        return Event.create({
            title: 'test event',
            date: '12-16-22',
            address: {
                street: '123 sunflower cir',
                city: 'wpb',
                state: 'fl',
                zipcode: 33401
            },
            location: {
                latitude: 44.9699,
                longitude: -93.28127
            },
            description: 'mock marathon details'
        })
    })
    .then(createdEvent => {
        console.log('THIS IS THE NEW EVENT', createdEvent)
    })
    .catch(err => console.log(err))