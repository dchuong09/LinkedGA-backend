const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const ChatroomSchema = new Schema({
	name: String,
	message: String,

})

const Chatroom = mongoose.model('Chatroom', ChatroomSchema);

module.exports = Chatroom;
