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
        default: 'active'
    },
}, {
    timestamps: {
        createdAt: 'created_at', updatedAt: 'updated_at'
    }
});

const AnnouncementModel = mongoose.model('announcement', schema);
module.exports = AnnouncementModel;
