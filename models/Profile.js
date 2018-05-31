const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  status: String,
  strongSkills: String,
  projects: String
})

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
