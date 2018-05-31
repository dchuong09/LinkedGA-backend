const Chatroom = require('../models/Chatroom');


function index(req, res) {
	Chatroom.find({}, function(err, foundMe) {
		if (err) res.send('Chatroom index controller: ', err);
		res.json(foundMe);
	})
}

function show(req, res) {
	Chatroom.findById(req.params.recmd_id, function(err, foundMsg) {
		if (err) res.send('Chatroom show controller: ', err);
		res.json(foundMsg);
	})
}

function create(req, res) {
	Chatroom.create(req.body, function(err, newMsg) {
		if (err) res.send('Chatroom create controller: ', err);
		res.json(newMsg);
	})
}

module.exports = {
	index: index,
	show: show,
	create: create
}
