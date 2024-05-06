const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
};

const schema = new mongoose.Schema({
    name: reqString,
    mission: reqString,
    vision: reqString,
});

// Define model
const SchoolModel = mongoose.model('school', schema);
module.exports = SchoolModel;