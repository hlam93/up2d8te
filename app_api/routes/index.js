var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});

var ctrlEvents = require('../controllers/events');
var ctrlEntries = require('../controllers/entries');
var ctrlGuestlist = require('../controllers/guestlist');
var ctrlAuth = require('../controllers/authentication');

// Event controls
router.get('/events/org', ctrlEvents.getOrgEvents);
router.get('/events/local', ctrlEvents.getLocalEvents);
router.get('/events/:eventid', ctrlEvents.getEventbyId);
router.post('/events', auth, ctrlEvents.createEvent);
router.put('/events/:eventid', auth, ctrlEvents.updateEvent);
router.delete('/events/:eventid', auth, ctrlEvents.deleteEvent);

// Guestlist here
router.get('/events/org/:eventid', ctrlGuestlist.getGuestList);
router.get('/events/local/:eventid', ctrlGuestlist.getGuestList);
router.post('/events/:eventid', ctrlGuestlist.addGuest);

// Entries here
router.get('/brp', ctrlEntries.getEntries);
router.get('/brp/:entryid', ctrlEntries.getEntryById);
router.post('/brp', ctrlEntries.createEntry);
router.put('/brp/:entryid', ctrlEntries.updateEntry);
router.delete('/brp/:entryid', ctrlEntries.deleteEntry);

// Readings here
router.get('/brp/:entryid/readings', ctrlEntries.getReadings);
router.get('/brp/:entryid/readings/:readingid', ctrlEntries.getReadingById);
router.post('/brp/:entryid/readings', ctrlEntries.createReading);
router.put('/brp/:entryid/readings/:readingid', ctrlEntries.updateReading);
router.delete('/brp/:entryid/readings/:readingid', ctrlEntries.deleteReading);

// Authentication 
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;