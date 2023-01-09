import { hash, genSalt } from 'bcrypt';
import { IRegistrationBody } from '../../types/auth';
import { ERRORS, throwError } from '../../utils/error';
import User from '../../models/User';
import UserModel from '../../models/User';
import genetateToken from '../../utils/jwt';
import FileService from '../../services/file';
import File from '../../models/File';
import { mongoose } from '@typegoose/typegoose';

export async function RegistrationService(
    data: IRegistrationBody,
    storagePath: string,
) {
    const existingEmail = await User.findOne({ email: data.email });
    if (existingEmail)
        throwError(ERRORS.EMAIL_EXISTS, 'User with this email already exists', {
            email: data.email,
        });

    const existingUsername = await User.findOne({ username: data.username });
    if (existingUsername)
        throwError(
            ERRORS.USERNAME_EXISTS,
            'User with this username already exists',
            { userName: data.username },
        );

    const salt = await genSalt(3);
    const hashPassword = await hash(data.password, salt);

    const user = await UserModel.create({
        _id: new mongoose.Types.ObjectId(),
        email: data.email,
        username: data.username,
        password: hashPassword,
    });

    await FileService.createDir(
        new File({ user: user.id, name: user.id }),
        storagePath,
    );

    const token = genetateToken(user);

    return {
        user,
        token,
    };
}
