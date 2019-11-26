/* Server */
import express from 'express';
import User from './routes';

// import mongoose from 'mongoose';

// Needed for reading from .env
require('dotenv').config();

const app = express();

// Connect to MongoDB
/* mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); // Connect to database
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database')) */

// Define what app needs to use
app.use(express.json()); // Accept json

// Define routes
app.use('/api/user', User);

// Start app
app.listen(3000, () => console.log('server started'));
