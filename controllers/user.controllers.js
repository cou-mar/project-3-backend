const Event = require('../models/Event.model');

const userController = (req, res, next) => {
    res.send('user routes work')
}

//POST newly created event
const createEventController = (req, res, next) => {
    console.log(req.body);

    Event.create({
        title: req.body.title,
        date: req.body.date,
        address: {
            street: req.body.address.street,
            city: req.body.address.city,
            state: req.body.address.state,
            zipcode: req.body.address.zipcode
        },
        location: {
            latitude: req.body.location.latitude,
            longitude: req.body.location.longitude
        },
        description: req.body.description
    })
    .then(createdEvent => {
        res.send(createdEvent);
    })
    .catch(err => res.send(err));
};

module.exports = {
    userController,
    createEventController
};