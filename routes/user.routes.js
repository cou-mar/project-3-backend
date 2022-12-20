const express = require('express');
const { userController, createEventController, allEventsController, updateEventController, deleteEventController, oneEventController, favoriteEventsController } = require('../controllers/user.controllers');

const router = express.Router();

//GET user's profile page
router.get('/profile', userController);

//GET all of user's saved events
router.get('/my-events', favoriteEventsController);

//POST newly created event 
router.post('/create-new', createEventController);

//GET all available events
router.get('/see-events', allEventsController);

//GET individual event details
router.get('/see-event/:eventId', oneEventController);

//PUT (update) individual event (only owners)
router.put('/see-event/:eventId/edit', updateEventController);

//DELETE individual event (only owners)
router.delete('/see-event/:eventId/delete', deleteEventController);

module.exports = router;