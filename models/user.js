const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Project = require('./Project');

const UserSchema = new Schema({
	name: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
	github: {
		type: String,
		require: true
	},
	location: {
		type: String,
		require: true
	},
	course: {
		type: String,
		require: true
	}, 
	status: {
		type: String,
	}, 
	photo: String,
	projects: [Project.schema],
})

const User = mongoose.model('users', UserSchema);

module.exports = User;
