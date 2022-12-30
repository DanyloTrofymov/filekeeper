import fs from 'fs-extra';
import FileModel, { File } from '../../models/File';
import { IFile } from '../../types/file';
import { ERRORS, HttpError } from '../../utils/error';

const parents: any[] = [];
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
        const dbFileRes: File = await FileModel.create(dbFile);
        if (dbFileRes.parent.toString() != '') {
            await getParents(dbFileRes);
            parents.forEach(async (parent) => {
                parent.size += dbFileRes.size;
                await FileModel.findByIdAndUpdate(parent._id, parent);
            });
        }
        return dbFileRes;
    } catch (e) {
        throw new HttpError(
            500,
            'Internal server error',
            ERRORS.INTERNAL_ERROR,
        );
    }
}

async function getParents(file: any) {
    const parentForThis = await FileModel.findOne({ _id: file.parent });
    if (parentForThis) {
        parents.push(parentForThis);
        if (parentForThis.parent) {
            await getParents(parentForThis);
        }
    }
}
