import { Request, Response, NextFunction } from 'express';
import { ITokenBody } from '../types/auth';
import { ERRORS, HttpError } from '../utils/error';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenBody extends Request {
    body: ITokenBody;
}

export const getDataByToken = (
    req: TokenBody,
    res: Response,
    next: NextFunction,
) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization;
        const secret = process.env.SECRET || '';
        if (!token || !secret) {
            throw new HttpError(403, 'Auth error', ERRORS.BAD_TOKEN);
        }

        const decoded = jwt.verify(token.split(' ')[1], secret) as JwtPayload;
        console.log({ ...decoded });
        req.body = {
            _id: decoded._id,
            username: decoded.username,
            email: decoded.email,
        };

        next();
    } catch (e: any) {
        throw new HttpError(403, e.message, ERRORS.BAD_TOKEN);
    }
};
