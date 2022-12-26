import { Response } from 'express';
import fs from 'fs-extra';
import File from '../../models/File';
import { ITokenBody } from '../../types/auth';
import { IDownloadQuery } from '../../types/file';
import { HttpError } from '../../utils/error';

export async function downloadFileService(
    data: ITokenBody & IDownloadQuery,
    res: Response,
) {
    const file = await File.findOne({ _id: data.id, user: data.userId });
    if (!file) {
        throw new HttpError(500, 'Download error');
    }
    const path = `${process.env.STORAGE_PATH}\\${data.userId}\\${file.path}`;
    const exists = await fs.pathExists(path);
    if (exists) {
        console.log(123);
        return res.download(path, file.name);
    }
    throw new HttpError(500, 'Download error');
}
