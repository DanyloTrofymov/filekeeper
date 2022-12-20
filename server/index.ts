import mongoose from 'mongoose';
import express from 'express';
import { initApi } from './src/api';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { errorHandler } from './src/middlewares';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/v1', initApi());
app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL ?? '');

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT);
        });
    } catch (e) {
        /* empty */
    }
};

start();
