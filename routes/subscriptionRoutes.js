const express = require('express');
const router = express.Router();
const SchoolModel = require("../models/SchoolModel");
const { sendEmail } = require('../utils/email');
const { thanksForSub } = require("../utils/emailType");

router.post("/add", async (req, res) => {
    if (!req.body.subscriber_email)
        return res.status(400).json({ error: 'subscriber_email key is required but is null' });

    const school = await SchoolModel.findById(req.body.school_id);

    if (school.subscribed_emails.includes(req.body.subscriber_email)) {
        return res.status(400).json({ error: 'Subscriber already exists' });
    }

    if (!req.body.school_id)
        return res.status(400).json({ error: 'school_id key is required but is null' });

    try {
        const newSubscriber = await SchoolModel.findOneAndUpdate({
            _id: req.body.school_id,
        }, {
            $push: {
                subscribed_emails: req.body.subscriber_email
            }
        }, {
            new: true
        }).exec();

        res.status(201).json({ message: 'Subscriber Added!', data: newSubscriber });
        sendEmail(req.body.subscriber_email, "Subscription Status", thanksForSub());
    } catch (error) {
        console.error('Error adding subscriber:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
})

router.post("/delete", async (req, res) => {
    if (!req.body.subscriber_email)
        return res.status(400).json({ error: 'subscriber_email key is required but is null' });

    const school = await SchoolModel.findById(req.body.school_id);

    if (!school.subscribed_emails.includes(req.body.subscriber_email)) {
        return res.status(400).json({ error: 'Subscriber does not exist!' });
    }


    if (!req.body.school_id)
        return res.status(400).json({ error: 'school_id key is required but is null' });

    try {
        const subToDelete = await SchoolModel.findOneAndUpdate({
            _id: req.body.school_id,
        }, {
            $pull: {
                subscribed_emails: req.body.subscriber_email
            }
        }, {
            new: true
        }).exec();

        res.status(201).json({ message: 'Subscriber Deleted!', data: subToDelete });
    } catch (error) {
        console.error('Error deleting subscriber:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
})

module.exports = router;