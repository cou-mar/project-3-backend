const Event = require('../models/Event.model');
const KomenService = require('../services/komen.service');
const PredictHQService = require('../services/predicthq.service');

const komenService = new KomenService();
const predictHQService = new PredictHQService();

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

//GET all available events
const allEventsController = (req, res, next) => {
    // Event.find()
    //     .then(foundEventsArray => {
    //         res.send(foundEventsArray)
    //     })
    //     .catch( err => res.send(err));
    Promise.all([
        komenService.getAllEvents(),
        predictHQService.getAllEvents()
    ])
        .then(([komenArray, predictHQArray]) => {
            console.log(komenArray.data)
            console.log(predictHQArray.data)

            //clean up arrays and merge them together with
            //only the properties that we want

            res.send({
                komenArray: komenArray.data,
                predictHQArray: predictHQArray.data
            })
        })
};

const updateEventController = (req, res, next) => {
    Event.findByIdAndUpdate(req.params.eventId, {

    })
}

module.exports = {
    userController,
    createEventController,
    allEventsController
};