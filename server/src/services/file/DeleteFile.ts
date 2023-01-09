import fs from 'fs-extra';
import FileModel, { File } from '../../models/File';
import { HttpError, ERRORS } from '../../utils/error';

export async function deleteFileService(file: File, storagePath: string) {
    const path = `${storagePath}\\${file.user}\\${file.path}`;
    try {
        await fs.remove(path);
        await FileModel.deleteOne({ _id: file._id });
        if (file.parent) {
            const parents = await getParents(file.parent);
            await parents.forEach(async (parent: File) => {
                if (parent != null) {
                    await FileModel.updateOne(
                        { _id: parent._id },
                        { $inc: { size: -file.size } },
                    );
                    await FileModel.updateOne(
                        { _id: parent._id },
                        { $pull: { childs: file._id } },
                    );
                }
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
async function getParents(file: any): Promise<any> {
    const parent = await FileModel.findOne({ _id: file.parent });
    const deepParent: File[] = [];
    if (parent) {
        const parentParent = await getParents(parent);
        deepParent.unshift(...parentParent);
    }
    return [...deepParent, parent];
}
