const models = require('../models');
const User = models.User;

function index(req, res) {
	User.find({}, function(err, foundUsers) {
		if (err) res.send('User index controller err: ', err);
		res.json(foundUsers);
	})
}

function show(req, res) {
	User.findById(req.params.user_id, function(err, foundUser) {
		if (err) res.send('User show controller err: ', err);
		res.json(foundUser);
	})
}

function create(req, res) {
	User.create(req.body, function(err, newUser) {
		if (err) res.send('User create controller err: ', err);
		res.json(newUser);
	})
}

function update(req, res) {
	User.findByIdAndUpdate(req.params.user_id, {$set: req.body}, function(err, updatedUser) {
		if (err) res.send('User update controller err: ', err);
		res.json(updatedUser);
	})
}

function destroy(req, res) {
	User.findByIdAndRemove(req.params.user_id, function(err, foundUser) {
		if (err) res.send('User destroy controller err: ', err);
		res.send(404);
	})
}

module.exports = {
	index: index,
	show: show,
	create: create,
	update: update,
	destroy: destroy
}