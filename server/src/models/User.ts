import { getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

export class User {
    @prop()
    public _id: mongoose.Types.ObjectId;

    @prop({ required: true, unique: true })
    public email: string;

    @prop({ required: true, unique: true })
    public username: string;

    @prop({ required: true })
    public password: string;

    @prop({ default: 1024 ** 3 * 20 })
    public drive_space: number;

    @prop({ default: 0 })
    public used_space: number;
}

const UserModel = getModelForClass(User);

export default UserModel;
