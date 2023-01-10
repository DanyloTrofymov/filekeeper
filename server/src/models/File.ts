import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { User } from './User';

export class File {
    @prop()
    public _id: mongoose.Types.ObjectId;

    @prop({ required: true })
    public name: string;

    @prop({ required: true })
    public type: string;

    @prop({ default: 0 })
    public size: number;

    @prop({ default: '' })
    public path: string;

    @prop({ default: Date.now() })
    public date: Date;

    @prop({ ref: () => User })
    public user: Ref<User>;

    @prop({ ref: () => File })
    public parent: Ref<File>;
}

const FileModel = getModelForClass(File);

export default FileModel;
