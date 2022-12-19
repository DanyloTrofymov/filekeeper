import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        mongoose.connect(process.env.DB_URL);

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT);
        });
    } catch (e) {
        /* empty */
    }
};

start();
