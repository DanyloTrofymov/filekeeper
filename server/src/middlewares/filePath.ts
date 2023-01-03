import { NextFunction, Request, Response } from 'express';

function filePath(path: any) {
    return function (req: Request, res: Response, next: NextFunction) {
        req.storagePath = path;
        next();
    };
}

export default filePath;
