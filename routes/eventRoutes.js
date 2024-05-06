const express = require('express');
const router = express.Router();
const EventModel = require('../models/EventModel');

router.get('/get', async (req, res) => {
    try {
        const data = await EventModel.find();

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const newEvent = new EventModel({
            school_id: req.body.school_id,
            title: req.body.title,
            date_created: req.body.date_created,
            description: req.body.description,
            type: req.body.type
        });

        await newEvent.save();

        res.status(201).json({ message: 'Event added successfully', event: newEvent });
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

router.post('/update', async (req, res) => {
    try {
        if (!req.body.event_id) {
            return res.status(400).json({ error: 'event_id key is required but is null' });
        }

        const event = await EventModel.findByIdAndUpdate(req.body.event_id, {
            school_id: req.body.school_id,
            title: req.body.title,
            date_created: req.body.date_created,
            description: req.body.description,
            type: req.body.type
        }, {
            new: true
        });

        res.status(201).json({ message: 'Update event successfully', event });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

router.post("/delete", async (req, res) => {
    try {
        if (!req.body.event_id) {
            return res.status(400).json({ error: 'event_id key is required but is null' });
        }

        const event = await EventModel.findByIdAndDelete(req.body.event_id);

        res.status(201).json({ message: 'Event Deleted Successfully' });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
})

module.exports = router;