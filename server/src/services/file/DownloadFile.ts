import { Response } from 'express';
import fs from 'fs-extra';
import FileModel from '../../models/File';
import { ITokenBody } from '../../types/auth';
import { IDownloadQuery } from '../../types/file';
import { ERRORS, HttpError } from '../../utils/error';

export async function downloadFileService(
    data: ITokenBody & IDownloadQuery,
    res: Response,
) {
    const file = await FileModel.findOne({ _id: data.id, user: data.userId });
    if (!file) {
        throw new HttpError(403, 'File not found', ERRORS.NOT_FOUND('FILE'));
    }
    const path = `${process.env.STORAGE_PATH}\\${data.userId}\\${file.path}`;
    const exists = await fs.pathExists(path);
    if (exists) {
        return res.download(path);
    }
    throw new HttpError(500, 'Download error');
}
