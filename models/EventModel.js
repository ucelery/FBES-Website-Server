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
    date_created: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['upcoming', 'current', 'past', 'archived'],
        required: true
    },
});

const EventModel = mongoose.model('event', schema);
module.exports = EventModel;