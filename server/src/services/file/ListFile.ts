import File from '../../models/File';
import { ITokenBody } from '../../types/auth';
import { IFindBody } from '../../types/file';
import { ERRORS, HttpError } from '../../utils/error';

export async function listFileService(data: ITokenBody & IFindBody) {
    if (data.parent == '') {
        throw new HttpError(
            400,
            'ParentId must be not empty.',
            ERRORS.NOT_FOUND('FILES'),
        );
    }
    try {
        const files = await File.find({
            user: data.userId,
            parent: data.parent,
        });
        return files;
    } catch (e) {
        throw new HttpError(
            400,
            `Files for user ${data.userId} with parentId ${data.parent} not found`,
            ERRORS.NOT_FOUND('FILES'),
        );
    }
}
