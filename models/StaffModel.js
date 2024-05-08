const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
};

const schema = new mongoose.Schema({
    firstName: reqString,
    middleName: {
        type: String,
        default: null
    },
    lastName: reqString,
    position: reqString,
    email: reqString,
    mobileNo: reqString
});

// Define model
const StaffModel = mongoose.model('staff', schema);
module.exports = StaffModel;