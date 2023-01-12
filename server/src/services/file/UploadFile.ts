import fs from 'fs-extra';
import FileModel, { File } from '../../models/File';
import { IFile } from '../../types/file';
import { ERRORS, HttpError } from '../../utils/error';

export async function uploadFileService(
    dbFile: File,
    file: IFile,
    storagePath: string,
) {
    const path = `${storagePath}\\${dbFile.user}\\${dbFile.path}`;
    const exists = await fs.pathExists(path);
    if (exists) {
        throw new HttpError(
            403,
            `File with name ${dbFile.name} exists in this directory`,
            ERRORS.FILE_EXISTS,
            {
                file: dbFile.name,
            },
        );
    }

    try {
        file.mv(path);
        const dbFileRes: File = await FileModel.create(dbFile);
        if (dbFileRes.parent) {
            const parents = await getParents(dbFileRes);
            await parents.forEach(async (parent: File) => {
                if (parent != null) {
                    parent.size += dbFileRes.size;
                    await FileModel.updateOne(
                        { _id: parent._id },
                        { $inc: { size: dbFileRes.size } },
                    );
                }
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
async function getParents(file: any): Promise<any> {
    const parent = await FileModel.findOne({ _id: file.parent });
    const deepParent: File[] = [];
    if (parent) {
        const parentParent = await getParents(parent);
        deepParent.unshift(...parentParent);
    }
    return [...deepParent, parent];
}
