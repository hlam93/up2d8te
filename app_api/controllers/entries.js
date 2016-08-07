var mongoose = require('mongoose');
var Entries = mongoose.model('Entries');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getEntries = function (req, res) {
	Entries
	.find({})
	.exec(function (err, entry) {
		if (!entry) {
			sendJSONresponse(res, 404, {
				"message" : "no entry found"
			});
		} else if (err) {
			sendJSONresponse(res, 400, err);
		}
		sendJSONresponse(res, 200, entry);
	});
};

module.exports.getEntryById = function (req, res) {
	if (req.params.entryid) {
		Entries
		.findById(req.params.entryid)

		.exec(function (err, entry) {
			if (!entry) {
				sendJSONresponse(res, 404, {
					"message" : "entryid not found"
				});
			} else if (err) {
				sendJSONresponse(res, 400, err);
			}
			sendJSONresponse(res, 200, entry);
	});
	} else {
		sendJSONresponse(res, 404, {
			"message" : "not found, entryid required"
		});
	}
};

module.exports.createEntry = function (req, res) {
	Entries.create({
		day : Date.now()
	}, function (err, entry) {
		if (err) {
			console.log(err);
			sendJSONresponse(res, 400, err);
		} else {
			sendJSONresponse(res, 201, entry);
		}
	});
};

var doAddEntry = function (req, res, entry) {
	entry.readings.push({
		book : req.body.book,
		chapter : req.body.chapter,
		verses : req.body.verses,
		text : req.body.text
	});
	entry.save(function(err, entry) {
		var thisReading;
		if (err) {
			sendJSONresponse(res, 400, err);
		} else {
			thisReading = entry.readings[entry.readings.length - 1];
			sendJSONresponse(res, 201, thisReading);
		}
	});
};

module.exports.deleteEntry = function (req, res) {
	if (req.params.entryid) {
		Entries.findByIdAndRemove(req.params.entryid)
		.exec(
			function(err, entry) {
				if (err) {
					sendJSONresponse(res, 400, err);
					return;
				}
				sendJSONresponse(res, 204, null);
			});
	} else {
		sendJSONresponse(res, 404, {
			"message" : "not found, entryid required"
		});
	}
};

module.exports.getReadings = function (req, res) {
	if (req.params.entryid) {
		Entries.findById(req.params.entryid)
		.select('readings')
		.exec(function (err, readings) {
			if (!readings) {
				sendJSONresponse(res, 404, {
					"message" : "no readings found for entryid"
				});
			}
			else if (err) {
				sendJSONresponse(res, 400, err);
			}
			sendJSONresponse(res, 200, readings);
		});
	} else {
		sendJSONresponse(res, 404, {
			"message" : "not found, entryid required"
		});
	}
};

module.exports.getReadingById = function (req, res) {
	if (!req.params.entryid && req.params.readingid) {
		sendJSONresponse(res, 404, {
			"message" : "not found, both entryid and readingid required"
		});
	}
	Entries
	.findById(req.params.entryid)
	.select('readings')
	.exec(function (err, entry) {
		var response, reading;
		if (!entry) {
			sendJSONresponse(res, 404, {
				"message" : "entryid not found"
			}); return;
		} else if (err) {
			sendJSONresponse(res, 400, err);
			return;
		}
		if (entry.readings && entry.readings.length > 0) {
			reading = entry.readings.id(req.params.readingid);
			if (!reading) {
				sendJSONresponse(res, 404, {
					"message" : "readingid not found"
				});
			} else {
				response = {
					reading : reading
				}
				sendJSONresponse(res, 200, response);
			}
		} else {
			sendJSONresponse(res, 404, {
				"message" : "No readings found"
			});
		}
	});
};

module.exports.createReading = function (req, res) {
	if (!req.params.entryid) {
		sendJSONresponse(res, 404, {
			"message" : "not found, entryid required"
		});
		return;
	} else {
		Entries.findById(req.params.entryid)
		.select('readings')
		.exec(
			function (err, entry) {
				if (err) {
					sendJSONresponse(res, 404, err);
					return;
				} else {
					doAddEntry(req, res, entry);
				}
		});
	}
};

module.exports.deleteReading = function (req, res) {
	if (req.params.entryid) {
		Entries.findById(req.params.entryid)
		.exec(function (err, entry) {
			if (err) {
				sendJSONresponse(res, 400, err); return;
			}
			if (entry.readings && entry.readings.length > 0) {
				if (!entry.readings.id(req.params.readingid)) {
					sendJSONresponse(res, 404, {
						"message" : "readingid not found"
					});
				} else {
					entry.readings.id(req.params.readingid).remove();
					entry.save(function (err) {
						if (err) {
							sendJSONresponse(res, 404, err);
						} else {
							sendJSONresponse(res, 204, null);
						}
					});
				}
			} else {
				sendJSONresponse(res, 404, {
					"message" : "no readings to delete"
				});
			}
		});
	} else {
		sendJSONresponse(res, 404, {
			"message" : "not found, entryid required"
		});
	}
};

module.exports.updateReading = function (req, res) {
	if (req.params.entryid && req.params.readingid) {
		Entries
		.findById(req.params.entryid)
		.select('readings')
		.exec(function(err, entry) {
			var thisReading;
			if (!entry) {
				sendJSONresponse(res, 404, {
					"message" : "entryid not found"
				});
				return;
			} else if (err) {
				sendJSONresponse(res, 400, err); return;
			}
			if (entry.readings && entry.readings.length > 0) {
				thisReading = entry.readings.id(req.params.readingid);
				if (!thisReading) {
					sendJSONresponse(res, 404, {
						"message" : "readingid not found"
					});
				} else {
					thisReading.book = req.body.book;
					thisReading.chapter = req.body.chapter;
					thisReading.verses = req.body.verses;
					thisReading.text = req.body.text;
					entry.save(function(err, thisReading) {
						if (err) {
							sendJSONresponse(res, 400, err);
						} else {
							sendJSONresponse(res, 200, thisReading);
						}
					});
				}
			} else {
				sendJSONresponse(res, 404, {
					"message" : "no reading to update"
				});
			}
		});
	} else {
		sendJSONresponse(res, 404, {
			"message" : "not found, entryid and readingid required"
		});
	}
};

module.exports.updateEntry = function (req, res) {
	if (req.params.entryid) {
		Entries
		.findById(req.params.entryid)
		.exec(function (err, entry) {
			if (!entry) {
				sendJSONresponse(res, 404, {
					"message" : "not found, entryid not found"
				});
			}
			else if (err) {
				sendJSONresponse(res, 400, err);
			}
			entry.day = req.body.day;
			entry.save(function(err, entry) {
				if (err) {
					sendJSONresponse(res, 400, err);
				} else {
					sendJSONresponse(res, 200, entry);
				}
			});
		});
	} else {
		sendJSONresponse(res, 404, {
			"message" : "not found, entry id required"
		});
	}
};