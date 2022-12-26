import fs from 'fs-extra';
import FileModel, { File } from '../../models/File';
import { ERRORS, HttpError } from '../../utils/error';

export async function createDirService(file: File) {
    const StoragePath = process.env.STORAGE_PATH;
    if (!StoragePath) {
        throw new HttpError(
            500,
            'Enviromental variables error',
            ERRORS.INTERNAL_ERROR,
        );
    }

    const userPath = `${StoragePath}\\${file.user}\\${file.path}`;
    const exists = await fs.pathExists(userPath);
    if (exists) {
        throw new HttpError(403, 'Folder exists', ERRORS.FILE_EXISTS, {
            file: file.name,
        });
    }
    try {
        await fs.ensureDir(userPath);
        return await FileModel.create(file);
    } catch (e) {
        throw new HttpError(
            500,
            'Internal server error',
            ERRORS.INTERNAL_ERROR,
        );
    }
}
