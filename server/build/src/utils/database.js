"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const options = {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
};
const db = mongoose_1.default.connection;
async function initDB() {
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
exports.default = initDB;
async function connect() {
    try {
        await db.openUri(process.env.DB_URI ?? '', options);
    }
    catch (e) {
        console.log('Connection to DB failture');
        console.log(e);
        process.exit(1);
    }
}
//# sourceMappingURL=database.js.map