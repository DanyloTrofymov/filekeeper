import { Response, NextFunction, Request } from 'express';
import validate from '../../utils/validator';
import AuthService from '../../services/auth';
import { dumpUser } from '../../utils/dumps';
import { IRegistrationBody } from '../../types/auth';

interface RegistrationBody extends Request {
    body: IRegistrationBody;
}

export async function RegistrationController(
    req: RegistrationBody,
    res: Response,
    next: NextFunction,
) {
    const data = { ...req.body };

    const validationRules = {
        email: ['required', 'email'],
        username: ['required', 'string', { min_length: 8 }],
        password: ['required', 'string', { min_length: 8, max_length: 63 }],
        confirmPassword: ['required', { equal_to_field: 'password' }],
    };

    try {
        validate(data, validationRules);

        const { user, token } = await AuthService.registration(
            data,
            req.storagePath,
        );

        return res.json({
            data: {
                ...dumpUser(user),
                token,
            },
            status: 1,
        });
    } catch (e: unknown) {
        console.log(e);
        return next(e);
    }
}
