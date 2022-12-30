import mongoose, { ConnectOptions } from 'mongoose';

const options: ConnectOptions = {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
};
const db = mongoose.connection;
export default async function initDB() {
    db.on('connecting', () => {
        console.log('connecting to MongoDB...');
    });

    db.on('error', (error) => {
        console.error('Error in MongoDb connection: ' + error);
        if (error) {
            db.close();
            console.error('Error in MongoDb connection: ' + error);
        }
        setTimeout(() => {
            connect();
        }, 1000);
    });
    db.on('connected', () => {
        console.log('MongoDB connected!');
    });
    db.once('open', () => {
        console.log('MongoDB connection opened!');
    });
    db.on('reconnected', () => {
        console.log('MongoDB reconnected!');
    });
    db.on('disconnected', () => {
        console.log('MongoDB disconnected!');
        setTimeout(() => {
            connect();
        }, 1000);
    });
    await connect();
}

async function connect() {
    try {
        await db.openUri(process.env.DB_URI ?? '', options);
    } catch (e) {
        console.log('Connection to DB failture');
        console.log(e);
        process.exit(1);
    }
}
