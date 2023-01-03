import fs from 'fs-extra';
import FileModel, { File } from '../../models/File';
import { ERRORS, HttpError } from '../../utils/error';

export async function createDirService(file: File, storagePath: any) {
    const userPath = `${storagePath}\\${file.user}\\${file.path}`;
    const exists = await fs.pathExists(userPath);
    if (exists) {
        throw new HttpError(403, 'Folder exists', ERRORS.FILE_EXISTS, {
            file: file.name,
        });
    }
    try {
        fs.ensureDir(userPath);
        return await FileModel.create(file);
    } catch (e) {
        throw new HttpError(
            500,
            'Internal server error',
            ERRORS.INTERNAL_ERROR,
        );
    }
}
