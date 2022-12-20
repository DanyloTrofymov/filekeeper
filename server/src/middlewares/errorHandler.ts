import { Request, Response } from 'express';
import { HttpError } from '../utils/error';

export function errorHandler(err: HttpError, req: Request, res: Response) {
    if (err.status === 500) {
        return res.status(500).json({
            status: 0,
            fields: {},
            message: 'Please, contact your system administrator',
        });
    }
    return res.status(err.status).json({
        status: 0,
        fields: err.errors,
        message: err.message,
    });
}
