import fs from 'fs-extra';
import FileModel, { File } from '../../models/File';
import { ERRORS, HttpError } from '../../utils/error';

export async function deleteFileService(file: File) {
    const path = `${process.env.STORAGE_PATH}\\${file.user}\\${file.path}`;
    const exists = await fs.pathExists(path);
    if (exists) {
        if (file.type === 'dir') {
            await fs.rm(path);
        }
        FileModel.deleteOne(file);
        return;
    }
    throw new HttpError(500, 'Delete error');
}
