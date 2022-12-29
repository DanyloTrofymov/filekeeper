import FileModel from '../../models/File';
import { ITokenBody } from '../../types/auth';
import { ISearchQuery } from '../../types/file';
import { ERRORS, HttpError } from '../../utils/error';

export async function searchFileService(data: ITokenBody & ISearchQuery) {
    try {
        let files = await FileModel.find({
            user: data.userId,
        });

        files = files.filter((file) => file.name.includes(data.search));

        return files;
    } catch (e) {
        throw new HttpError(
            500,
            `Internal server error`,
            ERRORS.INTERNAL_ERROR,
        );
    }
}
