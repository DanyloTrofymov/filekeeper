import { ObjectId } from 'mongoose';

export interface IUserAttributes {
    id: ObjectId;
    email: string;
    username: string;
    password: string;
    disk_space: number;
    used_space: number;
    files: [ObjectId];
}
