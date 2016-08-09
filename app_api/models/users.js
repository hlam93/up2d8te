var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	firstName : {
		type: String,
		required: true
	},
	lastName : {
		type: String,
		required: true
	},
	hash:  String,
	salt: String
});

userSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

// check validity on equality between hashes
userSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;
}

userSchema.methods.generateJwt = function () {
	var expiry = new Date();
	// set to expire after 7 days
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		firstName: this.firstName,
		lastName: this.lastName,
		exp: parseInt(expiry.getTime() / 1000)
	}, process.env.JWT_SECRET);
};

mongoose.model('User', userSchema);