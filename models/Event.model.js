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
        latitude: Number,
        longitude: Number
    },
    description: {
        type: String
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User'}
},
 {
    timestamps: true,
    timeseries: true
 }
);

const Event = model('Event', eventSchema);

module.exports = Event;