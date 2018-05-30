const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const linkedGArouter = require('./config/routes');

// BodyParser Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cors Middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

// Test Route
app.get('/', function(req, res) {
	res.send('Server is working...');
});

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB (using mLab)
mongoose.connect(db)
  .then((() => console.log('MongoDB connected...')))
  .catch(err => console.log(err));


// Passport Middleware
app.use(passport.initialize());

// Passport JWT Config
require('./config/passport')(passport);

// App routes
app.use(linkedGArouter);

///LISTEN HERE
app.listen(process.env.PORT || 8080, function() {
	console.log('This server is listening on port 8080')
});
