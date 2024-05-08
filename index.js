require('dotenv').config();

// Require the Express module
const express = require('express');
const mongo = require('./mongo');
const cors = require('cors');

const { authenticate } = require('./utils/authenticate');

const usersRouter = require('./routes/userRoutes');
const eventRouter = require('./routes/eventRoutes');
const schoolRouter = require('./routes/schoolRoutes');
const staffRouter = require('./routes/staffRoutes');
const announcementRouter = require('./routes/announcementRoutes');
const subscriptionRouter = require('./routes/subscriptionRoutes');

// Create an Express application
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/secure', authenticate);
app.use('/api/secure/user', usersRouter);
app.use('/api/secure/event', eventRouter);
app.use('/api/secure/school', schoolRouter);
app.use('/api/secure/staff', staffRouter);
app.use('/api/secure/announcement', announcementRouter);
app.use('/api/secure/subscription', subscriptionRouter);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
