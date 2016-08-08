var mongoose = require('mongoose');
var Event = mongoose.model('Event');

// Best do testing with Postman
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// GET request
module.exports.getOrgEvents = function (req, res) {
	Event
	.find({$nor:[{cat: 1}]})
	.exec(function (err, events) {
		if(!events) {
			sendJSONresponse(res, 404, {
				"message" : "no events found"
			});
		} else if (err) {
			sendJSONresponse(res, 404, err);
		} else {
			sendJSONresponse(res, 200, events);
		}
	});
};

module.exports.getLocalEvents = function (req, res) {
	Event
	.find({$nor: [{cat: 0}]})
	.exec(function (err, events) {
		if(!events) {
			sendJSONresponse(res, 404, {
				"message" : "no events found"
			});
		} else if (err) {
			sendJSONresponse(res, 404, err);
		} else {
			sendJSONresponse(res, 200, events);
		}
	});
};

module.exports.getEventbyId = function (req, res) {
	if(req.params && req.params.eventid) {
		Event
		.findById(req.params.eventid)
		.exec(function(err, event) {
			if(!event) {
				sendJSONresponse(res, 404, { "message" : "eventid not found"});
				return;
			} else if (err) {
				sendJSONresponse(res, 404, err);
				return;
			} sendJSONresponse(res, 200, event);
		});
	} else {
		sendJSONresponse(res, 404, {
			"message" : "not found, eventid required"
		});
	}
};

// POST
module.exports.createEvent = function (req, res) {
	Event.create({
		cat : req.body.cat,
		name : req.body.name,
		time : req.body.time,
		location: req.body.location,
		info : req.body.info
	}, function (err, event) {
		if (err) {
			sendJSONresponse(res, 400, err);
		} else {
			sendJSONresponse(res, 200, event);
		}
	});
};

module.exports.updateEvent = function (req, res) {
	if(req.params.eventid) {
		Event
		.findById(req.params.eventid)
		.select('-guestList -comment')
		.exec(function(err, event) {
			if (!event) {
				sendJSONresponse(res, 404, { "message" : "eventid not found"});
				return;
			} else if (err) {
				sendJSONresponse(res, 404, err);
				return;
			}
			// update changes
			event.name = req.body.name;
			// event.time = req.body.time;
			// event.location = req.body.location;
			event.info = req.body.info;
			event.save(function (err, event) {
				if (err) {
					sendJSONresponse(res, 404, err);
				} else {
					sendJSONresponse(res, 200, event);
				}
			});
		});
    } else {
		sendJSONresponse(res, 404, {
			"message" : "not found, eventid required"
		})
	}
};

// DELETE
module.exports.deleteEvent = function (req, res) {
	Event.remove({
		_id : req.params.eventid
	}, function (err, event) {
		if (err) {
			sendJSONresponse(res, 400, err);
		} else {
			sendJSONresponse(res, 201, {
				"message" : "successfully deleted!"
			});
		}
	});
};