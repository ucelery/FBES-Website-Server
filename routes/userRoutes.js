const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
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

router.get('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check user credentials against your database
        const user = await UserModel.findOne({
            username: username,
            password: password
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });

    } catch (error) {
        console.error('User does not exist: ', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
})

module.exports = router;