import { Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { File } from '../models/File';
import { User } from '../models/User';

export interface IUserAttributes {
    _id: ObjectId;
    email: string;
    username: string;
    password: string;
    disk_space: number;
    used_space: number;
    files: [ObjectId];
}

export interface IFileAttributes {
    _id: ObjectId;
    name: string;
    type: string;
    password: string;
    size: number;
    path: string;
    date: Date;
    user: Ref<User>;
    parent: Ref<File>;
    childs: Ref<File>[];
}
