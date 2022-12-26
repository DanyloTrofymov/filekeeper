import { Response, NextFunction, Request } from 'express';
import FileService from '../../services/file';
import { IDownloadQuery } from '../../types/file';
import { ITokenBody } from '../../types/auth';

interface downloadBody extends Request {
    body: ITokenBody;
}

export async function downloadFileController(
    req: downloadBody,
    res: Response,
    next: NextFunction,
) {
    const query = req.query as unknown as IDownloadQuery;
    const data = { ...req.body, ...query };

    try {
        return await FileService.downloadFile(data, res);
    } catch (e) {
        next(e);
    }
}
