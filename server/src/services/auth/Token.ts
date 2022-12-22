import { ITokenBody } from '../../types/auth';
import { ERRORS, HttpError } from '../../utils/error';
import User from '../../models/User';
import genetateToken from '../../utils/jwt';

export async function TokenService(data: ITokenBody) {
    const user = await User.findOne({ _id: data._id });
    if (!user) {
        throw new HttpError(403, 'Auth error', ERRORS.NOT_FOUND('USER'));
    }
    const secret = process.env.SECRET || '';
    if (!secret) {
        throw new HttpError(
            500,
            'Enviromental variables error',
            ERRORS.INTERNAL_ERROR,
        );
    }
    const token = genetateToken(user);
    return {
        _id: user._id,
        email: user.email,
        username: user.username,
        disk_space: user.disk_space,
        used_space: user.used_space,
        token: token,
    };
}
