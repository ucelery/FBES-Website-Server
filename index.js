require('dotenv').config();

// Require the Express module
const express = require('express');
const mongo = require('./mongo');

const { authenticate } = require('./utils/authenticate');

const usersRouter = require('./routes/userRoutes');
const eventRouter = require('./routes/eventRoutes');
const schoolRouter = require('./routes/schoolRoutes');
const staffRouter = require('./routes/staffRoutes');

// Create an Express application
const app = express();

app.use(express.json());

app.use('/api/secure', authenticate)
app.use('/api/secure/user', usersRouter);
app.use('/api/secure/event', eventRouter);
app.use('/api/secure/school', schoolRouter);
app.use('/api/secure/staff', staffRouter);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
