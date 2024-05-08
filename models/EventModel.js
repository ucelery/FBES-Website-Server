const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    school_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ['active', 'archived'],
        required: true
    },
});

const EventModel = mongoose.model('event', schema);
module.exports = EventModel;