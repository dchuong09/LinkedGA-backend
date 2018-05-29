const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('./keys');
const userController = require('../controllers/userController');

// Load User Model
const User = require('../models/User');

// User Routes
router.get('/api/users', userController.index);
router.post('/api/users', userController.create);
router.get('/api/users/:user_id', userController.show);
router.put('/api/users/:user_id', userController.update);
router.delete('/api/users/:user_id', userController.destroy);


// Register
router.post('/register', (req, res) => {
	// Find User by Email
	User.findOne({ email: req.body.email })
	  .then(user => {
	  	// If email already exists, send 400 response
	  	if (user) {
	  		return res.status(400).json({ email: 'Email already exists'});
	  		// If not exists, create new user
	  	} else {
	  		// Get avatar from Gravatar 
	  		const avatar = gravatar.url(req.body.email, {
	  			s: '200',
	  			r: 'pg',
	  			d: 'mm',
	  		});

	  		// Create new user
	  		const newUser = new User({
	  			name: req.body.name, 
	  			email: req.body.email,
	  			avatar,
	  			password: req.body.password,
	  		});

	  		// Salt and Hash password with bcryptjs, then save new user
	  		bcrypt.genSalt(10, (err, salt) => {
	  			bcrypt.hash(newUser.password, salt, (err, hash) => {
	  				if (err) throw err;
	  				newUser.password = hash;
	  				newUser.save() 
	  				  .then(user => res.json(user))
	  				  .catch(err => console.log(err));
	  			})	
	  		})
	  	}
	  })
})


// Login
router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	// Find User by email
	User.findOne({ email })
	  .then(user => {
	  	if (!user) {
	  		return res.status(404).json({ email: 'User not found' });
	  	}

	  	// Check password
	  	bcrypt.compare(password, user.password) 
	  	  .then(isMatch => {
	  	  	if (isMatch) {
	  	  		// User matched, send JSON Web Token

	            // Create token payload (you can include anything you want)
	            const payload = { id: user.id, name: user.name, avatar: user.avatar }

	            // Sign token
	            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
	              res.json({ success: true, token: 'Bearer ' + token })
	            });
	  	  	} else {
	  	  		return res.status(400).json({ password: 'Password or email is incorrect' })
	  	  	}
	  	  })
	  })
})

// GET api/users/current (Private)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		id: req.user.id,
		name: req.user.name, 
		email: req.user.email, 
		avatar: req.user.avatar,
	})
})

// GET api/users/test (Public)
router.get('/api/test', (req, res) => res.json({msg: 'Users Endpoint Ok'}));

module.exports = router;