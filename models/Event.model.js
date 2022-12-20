const {Schema, model} = require('mongoose');



const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipcode: Number
    },
    location: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },
    description: {
        type: String
    }
},
 {
    timestamps: true,
    timeseries: true
 }
);

const Event = model('Event', eventSchema);

module.exports = Event;