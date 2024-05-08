const express = require('express');
const router = express.Router();
const AnnouncementModel = require('../models/AnnouncementModel');

router.get('/get', async (req, res) => {
    try {
        const data = await AnnouncementModel.find();

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const newObj = new AnnouncementModel({
            school_id: req.body.school_id,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            type: req.body.type
        });

        await newObj.save();

        res.status(201).json({ message: 'Announcement added successfully', announcement: newObj });
    } catch (error) {
        console.error('Error adding Announcement:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

router.post('/update', async (req, res) => {
    try {
        if (!req.body.announcement_id) {
            return res.status(400).json({ error: 'announcement_id key is required but is null' });
        }

        const announcement = await AnnouncementModel.findByIdAndUpdate(req.body.announcement_id, {
            school_id: req.body.school_id,
            title: req.body.title,
            date_created: req.body.date_created,
            description: req.body.description,
            type: req.body.type
        }, {
            new: true
        });

        res.status(201).json({ message: 'Update announcement successfully', announcement });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

router.post("/delete", async (req, res) => {
    try {
        if (!req.body.announcement_id) {
            return res.status(400).json({ error: 'announcement_id key is required but is null' });
        }

        const announcement = await AnnouncementModel.findByIdAndDelete(req.body.announcement_id);

        if (!announcement) {
            return res.status(400).json({ error: 'Cannot find announcement to delete' });
        }

        res.status(201).json({ message: 'Announcement Deleted Successfully' });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
})

module.exports = router;