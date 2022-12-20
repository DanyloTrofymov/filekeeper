import {
    BeAnObject,
    IObjectWithTypegooseFunction,
} from '@typegoose/typegoose/lib/types';
import { User } from '../models/User';
import { ERRORS, HttpError } from './error';
import jwt from 'jsonwebtoken';
import { Document, Types } from 'mongoose';

export default function genetateToken(
    user: Document<Types.ObjectId, BeAnObject, User> &
        User &
        IObjectWithTypegooseFunction &
        Required<{
            _id: Types.ObjectId;
        }>,
) {
    const secret = process.env.SECRET;
    if (!secret) {
        throw new HttpError(
            500,
            'Enviromental variables error',
            ERRORS.INTERNAL_ERROR,
        );
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        secret,
        { expiresIn: 15 },
    );
    return token;
}
