var mongoose = require('mongoose');

var guestSchema = new mongoose.Schema({
	firstName : { 
		type : String, required: true
	},
	lastName : { 
		type : String, required: true 
	},
	attending : { 
		enum : ['Yes', 'No', 'Maybe'] 
	}
});

var commentSchema = new mongoose.Schema({
	user : { 
		type : String, 
		required: true 
	},
	text : { 
		type : String, 
		minlength: 1
	},
	createdOn: { 
		type : Date, 
		default : Date.now()
	}
});

var eventSchema = new mongoose.Schema({
	cat: { 
		type: Number,
		required: true, 
		min: 0,
		max: 2 // 0 - church, 1 - local, 2 - both
	},
	name: {
		type: String,
		required: true, 
		default : 'My Event'
	},
	createdOn: { 
		type: Date, 
		default : Date.now()
	},
	time: { 
		type: Date
	},
	location: { 
		type: String
	},
	info: { 
		type: String, 
		required: true, 
		minlength: 1
	},
	guestList: [guestSchema],
	comment: [commentSchema]
});

mongoose.model('Event', eventSchema);