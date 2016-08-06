var express = require('express');
var router = express.Router();

var ctrlEvents = require('../controllers/events');


// Event controls
router.get('/events/org', ctrlEvents.getOrgEvents);
router.get('/events/local', ctrlEvents.getLocalEvents);
router.get('/events/:eventid', ctrlEvents.getEventbyId);
router.post('/events', ctrlEvents.createEvent);
router.put('/events/:eventid', ctrlEvents.updateEvent);
router.delete('/events/:eventid', ctrlEvents.deleteEvent);

module.exports = router;