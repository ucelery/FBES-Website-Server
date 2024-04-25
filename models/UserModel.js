const mongoose = require('mongoose');

// NOTE: this schema is highly unsecure
// - Separate the user data and user profile
// -- User Data will contain the login credentials (Encrypted)
// -- User Profile will contain all the necessary data of the profile
// -- User Profile ofcourse is linked with User Data
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Define model
const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;