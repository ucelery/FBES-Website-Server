const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const StaffModel = require('../models/StaffModel');

// Users
router.get('/get', async (req, res) => {
    try {
        const data = await StaffModel.find();

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add', async (req, res) => {
    try {
        // Check if user already exists
        const newStaff = await StaffModel({
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            position: req.body.position
        });

        await newStaff.save();

        res.status(201).json({ message: 'Staff added successfully', user: newStaff });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

router.post('/update', async (req, res) => {
    try {
        if (!req.body.staff_id) {
            return res.status(400).json({ error: 'staff_id key is required but is null' });
        }

        // Check if user already exists
        const newStaff = await StaffModel.findByIdAndUpdate(req.body.staff_id, {
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            position: req.body.position
        }, {
            new: true
        });

        res.status(201).json({ message: 'Staff edited successfully', user: newStaff });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

router.post('/delete', async (req, res) => {
    try {
        if (!req.body.staff_id) {
            return res.status(400).json({ error: 'staff_id key is required but is null' });
        }

        const staff = await StaffModel.findByIdAndDelete(req.body.staff_id);

        if (!staff) {
            return res.status(400).json({ error: 'Cannot find staff to delete' });
        }

        res.status(201).json({ message: 'Staff deleted successfully' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

module.exports = router;