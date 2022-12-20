import { Response, NextFunction, Request } from 'express';
import validate from '../../utils/validator';
import AuthService from '../../services/auth';
import { dumpUser } from '../../utils/dumps';
import { ILoginBody } from '../../types/auth';

interface LoginBody extends Request {
    body: ILoginBody;
}

export async function LoginController(
    req: LoginBody,
    res: Response,
    next: NextFunction,
) {
    const data = { ...req.body };

    const validationRules = {
        username: ['required', 'string', { min_length: 8 }],
        password: ['required', 'string', { min_length: 8, max_length: 63 }],
    };

    try {
        validate(data, validationRules);

        const { user, token } = await AuthService.login(data);

        res.json({
            data: {
                ...dumpUser(user),
                token,
            },
            status: 1,
        });
    } catch (e: unknown) {
        return next(e);
    }
}
