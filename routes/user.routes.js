const express = require('express');
const { userController, createEventController, allEventsController, updateEventController, deleteEventController, oneEventController, favoriteEventsController, setFavoriteEventsController } = require('../controllers/user.controllers');

const Favorite = require('../models/Favorites.model')

const { isAuthenticated } = require('../middleware/jwt.middleware')

const router = express.Router();

//GET user's profile page
router.get('/profile', userController);

//GET all of user's saved events
router.get('/my-events', isAuthenticated, favoriteEventsController);

//GET to save user event
router.get('/my-events/:eventId', isAuthenticated, setFavoriteEventsController);

//POST newly created event 
router.post('/create-event', createEventController);

//GET all available events
router.get('/see-events', allEventsController);

//GET individual event details
router.get('/see-event/:eventId', oneEventController);

//PUT (update) individual event (only owners)
router.put('/see-event/:eventId/edit', updateEventController);

//DELETE individual event (only owners)
router.delete('/see-event/:eventId/delete', isAuthenticated, deleteEventController);

router.get('/favorite/:id/delete', (req, res, next) => {
    console.log("Found favorite ID", req.params.id)
    Favorite.findById(req.params.id)
        .then((foundFavorite) => {
            foundFavorite.delete()
            res.json(foundFavorite)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router;