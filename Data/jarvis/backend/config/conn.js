const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const MONGO_DB_URL = process.env.MONGO_DB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URL);

        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
