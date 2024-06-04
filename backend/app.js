const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

// Route Middleware
app.use('/api/user', authRoutes);
app.use('/api/posts', postRoutes);


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Connected to DB!');
    } catch (error) {
        console.error('Connection to DB failed:', error);
        process.exit(1); // Exit the process with failure
    }
};

connectDB();

module.exports = app;
