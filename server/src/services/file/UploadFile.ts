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
    let filePath;
    if (dbFile.path)
        filePath = `${storagePath}\\${dbFile.user}\\${dbFile.path}\\${dbFile.name}`;
    else filePath = `${storagePath}\\${dbFile.user}\\${dbFile.name}`;
    const exists = await fs.pathExists(filePath);
    console.log(filePath);
    if (exists) {
        throw new HttpError(403, 'File exists', ERRORS.FILE_EXISTS, {
            file: dbFile.name,
        });
    }
    try {
        console.log('creating model');
        const dbFileRes = await FileModel.create(dbFile);
        console.log('model created');
        file.mv(filePath);
        console.log('file moved');
        return dbFileRes;
    } catch (e) {
        throw new HttpError(
            500,
            'Internal server error',
            ERRORS.INTERNAL_ERROR,
        );
    }
}
