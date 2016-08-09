var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var getGuestList = function (req, res) {
	if (req.params && req.params.eventid) {
		Event
		.findById(req.params.eventid)
		.select('guestList')
		.exec(function(err, event) {
			var response, guestList;
			if (!event) {
				sendJSONresponse(res, 404, {
					"message" : "eventid not found"
				}); return;
			} else if (err) {
				sendJSONresponse(res, 404, err);
				return;
			}
			if (event.guestList && event.guestList.length > 0) {
				guestList = event.guestList;
				sendJSONresponse(res, 200, guestList);
				} else {
					sendJSONresponse(res, 404, {
						"message" : "guestlist not found"
					});
				};
		});
	} else {
		sendJSONresponse(res, 404, {
			"message" : "not found, eventid required"
		});
	}
};

module.exports.getGuestList = function (req, res) {
	getGuestList(req, res);
};

var doAddGuest = function (req, res, event) {
	if (!event) {
		sendJSONresponse(res, 404, {
			"message" : "eventid not found"
		});
		return;
	} else {
		event.guestList.push({
			email : req.body.email,
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			attending : req.body.attending
		});
		event.save(function (err, event) {
			var thisGuestList;
			if (err) {
				console.log(err);
				sendJSONresponse(res, 400, err);
			} else {
				thisGuestList = event.guestList[event.guestList.length - 1];
				sendJSONresponse(res, 201, thisGuestList);
			}
		});

	}
};

module.exports.addGuest = function (req, res) {
	if(req.params.eventid) {
		Event.findById(req.params.eventid)
		.select('guestList')
		.exec(
			function(err, event) {
				if (err) {
					sendJSONresponse(res, 404, err);
				} else {
					doAddGuest(req, res, event);
					// doRegisterEvent(req, res, event);
				}
			});
	} else {
		sendJSONresponse(res, 404, {
			"message" : "Not found, eventid required"
		});
	}
};

module.exports.findGuest = function (req, res) {
	if (req.params.eventid && req.params.emailid) {
		Event
		.findById(req.params.eventid)
		.select('guestList')
		.exec(function (err, event) {
			var thisGuest;
			if (!event) {
				sendJSONresponse(res, 404, {
					"message" : "eventid does not exist"
				}); return;
			} else if (err) {
				sendJSONresponse(res, 400, err); return;
			}
			if (event.guestList && event.guestList.length > 0) {
				for (var i = 0; i < event.guestList.length; i++)
				{
					if (req.params.emailid === event.guestList[i].email) {
						sendJSONresponse(res, 200, {
							email : req.params.emailid,
							replied : true
						});
						return;
					}
				}
			} else {
				sendJSONresponse(res, 400, {
					"message" : "eventid not found"
				});
			}
		});
	} else {
		sendJSONresponse(res, 404, {
			"message" : "not found, eventid and email required"
		});
	}
};