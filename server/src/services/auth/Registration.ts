import { hash, genSalt } from 'bcrypt';
import { IRegistrationBody } from '../../types/auth';
import { ERRORS, HttpError, throwError } from '../../utils/error';
import User from '../../models/User';
import UserModel from '../../models/User';
import jwt from 'jsonwebtoken';

export async function RegistrationService(data: IRegistrationBody) {
    const email = data.email;
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
        throwError(ERRORS.EMAIL_EXISTS, 'User with this email already exists', {
            email: data.email,
        });

    const username = data.username;
    const existingUsername = await User.findOne({ username });
    if (existingUsername)
        throwError(
            ERRORS.USERNAME_EXISTS,
            'User with this username already exists',
            { userName: data.username },
        );
    console.log('not found');

    const salt = await genSalt(3);
    const hashPassword = await hash(data.password, salt);
    console.log(123);
    const user = await UserModel.create({
        email: data.email,
        username: data.username,
        password: hashPassword,
    });
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

    return {
        user,
        token,
    };
}
