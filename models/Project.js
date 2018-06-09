const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    namee: String,
    githubLink: String,
    siteLink: String,
    photo: String
})

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;