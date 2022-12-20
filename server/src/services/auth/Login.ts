import { ILoginBody } from '../../types/auth';
import { ERRORS, HttpError } from '../../utils/error';
import User from '../../models/User';
import { compare } from 'bcrypt';
import genetateToken from '../../utils/jwt';

export async function LoginService(data: ILoginBody) {
    const user = await User.findOne({ username: data.username });
    if (!user)
        throw new HttpError(
            403,
            'Incorrect username or password',
            ERRORS.BAD_PASSWORD,
        );
    const matchPass = await compare(data.password, user.password);
    if (!matchPass)
        throw new HttpError(
            403,
            'Incorrect username or password',
            ERRORS.BAD_PASSWORD,
        );

    const token = genetateToken(user);

    return {
        user,
        token,
    };
}
