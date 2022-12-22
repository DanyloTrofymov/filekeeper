import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { User } from './User';

export class File {
    @prop({ default: new mongoose.Types.ObjectId() })
    _id: mongoose.Types.ObjectId;

    @prop({ required: true })
    name: string;

    @prop({ required: true })
    type: string;

    @prop({ default: 0 })
    size: number;

    @prop({ default: '' })
    path: string;

    @prop({ default: Date.now() })
    date: Date;

    @prop({ ref: () => User })
    user: Ref<User>;

    @prop({ ref: () => File })
    parent: Ref<File>;

    @prop({ ref: () => File })
    childs: Ref<File>[];
}

const FileModel = getModelForClass(File);

export default FileModel;
