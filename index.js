/* Server */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import User from './routes';
import logger from './lib';

// import mongoose from 'mongoose';

// Needed for reading from .env
// require('dotenv').config();

const app = express();

// Connect to MongoDB
/* mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); // Connect to database
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database')) */

// Define what app needs to use
app.use(bodyParser.json()); // Accept json
app.use(
    bodyParser.urlencoded({
        // Parse URL-encoded bodies
        extended: false,
    })
);
app.use(cors());

// Define routes
app.use('/api/users', User);

const PORT = process.env.SERVER_PORT || 3000;
// Start app
app.listen(PORT, () => logger.debug(`server started on Port: ${PORT}`));
