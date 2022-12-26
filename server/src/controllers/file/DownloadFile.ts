import { Response, NextFunction, Request } from 'express';
import fs from 'fs-extra';
import File from '../../models/File';
import { IDownloadQuery } from '../../types/file';
import { ITokenBody } from '../../types/auth';
import { HttpError } from '../../utils/error';

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
        const file = await File.findOne({ _id: data.id, user: data.userId });
        if (!file) {
            throw new HttpError(500, 'Download error');
        }
        const path = `${process.env.STORAGE_PATH}\\${data.userId}\\${file.path}\\${file.name}`;
        const exists = await fs.pathExists(path);
        if (exists) {
            return res.download(path);
        }
        throw new HttpError(500, 'Download error');
    } catch (e) {
        next(e);
    }
}
