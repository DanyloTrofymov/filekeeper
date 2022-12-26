import fs from 'fs-extra';
import File from '../../models/File';
import { HttpError, ERRORS } from '../../utils/error';

export async function deleteFileService(file: any) {
    const path = `${process.env.STORAGE_PATH}\\${file.user}\\${file.path}`;
    try {
        await fs.remove(path);
        await File.deleteOne({ _id: file });
        return;
    } catch (e) {
        throw new HttpError(
            500,
            'Internal server error',
            ERRORS.INTERNAL_ERROR,
        );
    }
}
