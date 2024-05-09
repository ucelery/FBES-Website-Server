const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel')

router.post('/login', async (req, res) => {
    try {
        // Check user credentials against your database
        const user = await UserModel.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET
        )

        console.log(token);
        res.json({ message: 'Login successful', token: token });

    } catch (error) {
        console.error('User does not exist: ', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
})

module.exports = router;