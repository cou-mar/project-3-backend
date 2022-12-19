const express = require('express');
const { userController } = require('../controllers/user.controllers');

const router = express.Router();

//GET user's profile page
router.get('/profile', userController);

//GET all of user's saved events
router.get('/my-events', userController);

//POST newly created event 
router.post('/create-new', userController);

//GET all available events
router.get('/see-events', userController);

//POST comment on an event (only non-owners)
router.post('/see-event/:eventId/comment/add', userController);

//PUT (update) individual event (only owners)
router.put('/see-event/:eventId/edit', userController);

//DELETE individual event (only owners)
router.delete('/see-event/:eventId/edit', userController);

module.exports = router;