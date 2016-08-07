var mongoose = require('mongoose');

var readingSchema = new mongoose.Schema({
	book : { type: String, required : true },
	chapter : { type: String, required : true },
	verses : { type: String, required : true },
	text : { type: String, required : true }
});

var entriesSchema = new mongoose.Schema({
	day : { type : Date },
	readings : [readingSchema]
});

mongoose.model('Entries', entriesSchema);