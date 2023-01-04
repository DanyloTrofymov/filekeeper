import express from 'express';
import { initApi } from './src/api';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { cors, errorHandler } from './src/middlewares';
import fileUpload from 'express-fileupload';
import initDB from './src/utils/database';
import path from 'path';
import filePath from './src/middlewares/filePath';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors);
app.use(filePath(path.resolve(__dirname, 'storage')));
app.use(fileUpload({}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/v1', initApi());
app.use(errorHandler);

const start = async () => {
    await initDB();

    app.listen(PORT, () => {
        console.log('Server started on port ', PORT);
    });
};

start();
