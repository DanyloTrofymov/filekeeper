import { Response, NextFunction, Request } from 'express';
import FileService from '../../services/file';
import { IDownloadQuery } from '../../types/file';
import { ITokenBody } from '../../types/auth';

interface ListBody extends Request {
    body: ITokenBody;
}

export async function getFilePathController(
    req: ListBody,
    res: Response,
    next: NextFunction,
) {
    const query = req.query as unknown as IDownloadQuery;

    const data = { ...req.body, ...query };

    try {
        const path = await FileService.getFilePath(data);
        res.json({
            data: {
                path,
            },
            status: 1,
        });
    } catch (e: unknown) {
        next(e);
    }
}
