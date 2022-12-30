import fs from 'fs-extra';
import FileModel from '../../models/File';
import { HttpError, ERRORS } from '../../utils/error';

const parents: any[] = [];
export async function deleteFileService(file: any) {
    const path = `${process.env.STORAGE_PATH}\\${file.user}\\${file.path}`;
    try {
        await fs.remove(path);
        await FileModel.deleteOne({ _id: file._id });
        if (file.parent != '') {
            await getParents(file);
            parents.forEach(async (parent) => {
                parent.size -= file.size;
                await FileModel.findByIdAndUpdate(parent._id, parent);
            });
        }
        return;
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
