const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

// Users
router.get('/get', async (req, res) => {
    try {
        const data = await UserModel.find();

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add', async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new UserModel({
            username: req.body.username,
            password: req.body.password
        });

        await newUser.save();

        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

router.post('/delete', async (req, res) => {
    try {
        if (!req.body.user_id) {
            return res.status(400).json({ error: 'user_id key is required but is null' });
        }

        const user = await EventModel.findByIdAndDelete(req.body.user_id);

        if (!user) {
            return res.status(400).json({ error: 'Cannot find user to delete' });
        }

        res.status(201).json({ message: 'User Deleted Successfully' });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
})

module.exports = router;