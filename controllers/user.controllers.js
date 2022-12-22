const Favorite = require('../models/Favorites.model');
const Event = require('../models/Event.model');
const KomenService = require('../services/komen.service');
const PredictHQService = require('../services/predicthq.service');

const komenService = new KomenService();
const predictHQService = new PredictHQService();

const userController = (req, res, next) => {
    res.send('user routes work')
}

//GET all of user's saved events
const favoriteEventsController = (req, res, next) => {
    Favorite.find()
        .then(favoriteEventsArray => {
            res.send(favoriteEventsArray)
        })
        .catch(err => res.send(err));
}

const setFavoriteEventsController = (req, res, next) => {
    const { eventId } = req.params;

    Favorite.create({
        user: req.payload._id,
        myEvent: eventId
    })
        .then(createdFavorite => {
            res.send(createdFavorite)
        })
        .catch(err => res.send(err));

}

//POST newly created event
const createEventController = (req, res, next) => {
    console.log(req.body);

    Event.create({
        title: req.body.title,
        date: req.body.date,
        address: req.body.address,
        location: req.body.location,
        description: req.body.description,
        owner: req.payload._id
    })
    .then(createdEvent => {
        res.send(createdEvent);
    })
    .catch(err => res.send(err));
};

//GET all available events
const allEventsController = (req, res, next) => {
    
    //     .then(foundEventsArray => {
    //         res.send(foundEventsArray)
    //     })
    //     .catch( err => res.send(err));
    Promise.all([
        komenService.getAllEvents(),
        predictHQService.getAllEvents(),
        Event.find()
    ])
        .then(([komenArray, predictHQArray, foundEventsArray]) => {
            console.log(komenArray.data)
            console.log(predictHQArray.data)
            console.log(foundEventsArray)
            //clean up arrays and merge them together with
            //only the properties that we want

            res.send({
                komenArray: komenArray.data,
                predictHQArray: predictHQArray.data,
                foundEventsArray
            })
        })
};

//GET individual event details
const oneEventController = (req, res, next) => {
    Event.findById(req.params.eventId)
        .then(foundEvent => {
            res.send(foundEvent)
        })
        .catch(err => res.send(err));
}

//PUT (update) individual event (only owners)
const updateEventController = (req, res, next) => {
    Event.findByIdAndUpdate(req.params.eventId, {
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
    }, {new: true})
        .then(updatedEvent => {
            res.send(updatedEvent);
        })
        .catch(err => res.send(err));
}

//DELETE individual event (only owners)
const deleteEventController = (req, res, next) => {
    Event.findOneAndDelete({
        _id: req.params.eventId,
        owner: req.payload._id
    })
        .then(deletedProject => {
            res.send(deletedProject);
        })
        .catch(err => res.send(err));
};

module.exports = {
    userController,
    favoriteEventsController,
    setFavoriteEventsController,
    createEventController,
    allEventsController,
    oneEventController,
    updateEventController,
    deleteEventController
};