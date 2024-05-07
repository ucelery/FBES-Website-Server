const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SchoolModel = require('../models/SchoolModel');

router.get('/get', async (req, res) => {
    try {
        const data = await SchoolModel.find();

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const existingSchool = await SchoolModel.findOne({ name: req.body.name });
        if (existingSchool) {
            return res.status(400).json({ error: 'School already exists please double check the name' });
        }

        const newSchool = new SchoolModel({
            name: req.body.name,
            mission: req.body.mission,
            vision: req.body.vision
        });

        await newSchool.save();

        res.status(201).json({ message: 'School added successfully', school: newSchool });
    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

router.post('/update', async (req, res) => {
    try {
        if (!req.body.school_id) {
            return res.status(400).json({ error: 'school_id key is required but is null' });
        }

        const school = await SchoolModel.findByIdAndUpdate(req.body.school_id, {
            name: req.body.name,
            mission: req.body.mission,
            vision: req.body.vision,
        }, {
            new: true
        }).exec();

        res.status(201).json({ message: 'Update school successfully', school: school });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

router.post("/delete", async (req, res) => {
    try {
        if (!req.body.school_id) {
            return res.status(400).json({ error: 'school_id key is required but is null' });
        }

        const result = await SchoolModel.findByIdAndDelete(req.body.school_id);

        if (!result) {
            return res.status(400).json({ error: 'Cannot find school to delete' });
        }

        res.status(201).json({ message: 'School Data Deleted Successfully' });
    } catch (error) {
        console.error('Error updating School:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
})

module.exports = router;