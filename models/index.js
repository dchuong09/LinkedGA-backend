const mongoose = require('mongoose');

// Map Global Promise to Resolve Mongo Promise Warning
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/LinkedGA-backend")
  .then(() => console.log('Mongodb connected...'))
  .catch(err => console.log(err));


module.exports.User = require('./user');