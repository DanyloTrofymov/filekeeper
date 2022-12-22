import { Response, NextFunction, Request } from 'express';
import AuthService from '../../services/auth';
import { ITokenBody } from '../../types/auth';

interface TokenBody extends Request {
    body: ITokenBody;
}

export async function TokenController(
    req: TokenBody,
    res: Response,
    next: NextFunction,
) {
    const data = { ...req.body };

    try {
        const user = await AuthService.token(data);
        return res.json({
            data: {
                ...user,
            },
            status: 1,
        });
    } catch (e: unknown) {
        return next(e);
    }
}
