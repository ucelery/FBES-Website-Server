const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date_created: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
});

// Define model
const ShowcaseModel = mongoose.model('showcases', schema);
module.exports = ShowcaseModel;