import fs from 'fs-extra';
import FileModel, { File } from '../../models/File';
import { IFile } from '../../types/file';
import { ERRORS, HttpError } from '../../utils/error';

export async function uploadFileService(dbFile: File, file: IFile) {
    const storagePath = process.env.STORAGE_PATH;
    if (!storagePath) {
        throw new HttpError(
            500,
            'Enviromental variables error',
            ERRORS.INTERNAL_ERROR,
        );
    }
    const path = `${process.env.STORAGE_PATH}\\${dbFile.user}\\${dbFile.path}`;
    const exists = await fs.pathExists(path);
    if (exists) {
        throw new HttpError(403, 'File exists', ERRORS.FILE_EXISTS, {
            file: dbFile.name,
        });
    }

    try {
        file.mv(path);
        const dbFileRes = await FileModel.create(dbFile);
        return dbFileRes;
    } catch (e) {
        throw new HttpError(
            500,
            'Internal server error',
            ERRORS.INTERNAL_ERROR,
        );
    }
}
