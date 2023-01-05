import FileModel from '../../models/File';
import { ITokenBody } from '../../types/auth';
import { IDownloadQuery } from '../../types/file';
import { ERRORS, HttpError } from '../../utils/error';

export async function getFilePathService(data: ITokenBody & IDownloadQuery) {
    try {
        const file = await FileModel.findOne({
            _id: data.id,
            user: data.userId,
        });
        if (!file) {
            throw new HttpError(
                403,
                'File not found',
                ERRORS.NOT_FOUND('FILE'),
            );
        }
        const path = `${data.userId}\\${file.path}`;
        return path;
    } catch (e) {
        throw new HttpError(500, 'Internal server error');
    }
}
