import mongoose from 'mongoose';
import express from 'express';
import { initApi } from './src/api';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { cors, errorHandler } from './src/middlewares';
import fileUpload from 'express-fileupload';

dotenv.config();

const corsOptions = {
    credentials: true,
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: true,
};

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors);
app.use(fileUpload({}));
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
        console.log('Connection to DB failture');
        console.log(e);
        process.exit(1);
    }
};

start();
