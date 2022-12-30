import FileModel from '../../models/File';
import { ITokenBody } from '../../types/auth';
import { IListQuery } from '../../types/file';
import { ERRORS, HttpError } from '../../utils/error';
import { allowedSort, allowedFilter } from '../../types/file';

export async function listFileService(data: ITokenBody & IListQuery) {
    if (data.parent == '') {
        throw new HttpError(
            400,
            'ParentId must be not empty.',
            ERRORS.NOT_FOUND('FILES'),
        );
    }
    if (data.sort && !allowedSort.includes(data.sort)) {
        throw new HttpError(
            400,
            'No sort with this property.',
            ERRORS.NOT_FOUND('FILES'),
        );
    }
    if (data.filter) {
        data.filter.forEach((param) => {
            if (!allowedFilter.includes(param)) {
                throw new HttpError(
                    400,
                    'No filter with paremetr',
                    ERRORS.NOT_FOUND('FILES'),
                );
            }
        });
    }
    try {
        let files;
        if (data.sort && data.filter) {
            const filter = filterProperty(data.filter);
            files = await FileModel.find({
                user: data.userId,
                parent: data.parent,
                type: filter,
            }).sort(data.sort);
        } else if (data.filter) {
            const filter = filterProperty(data.filter);
            files = await FileModel.find({
                user: data.userId,
                parent: data.parent,
                type: filter,
            });
        } else if (data.sort) {
            files = await FileModel.find({
                user: data.userId,
                parent: data.parent,
            }).sort(data.sort);
        } else {
            files = await FileModel.find({
                user: data.userId,
                parent: data.parent,
            });
        }
        const sorted = files.filter((file) => file.type == 'dir');
        files
            .filter((file) => file.type != 'dir')
            .forEach((file) => sorted.push(file));

        return sorted;
    } catch (e) {
        throw new HttpError(
            500,
            `Internal server error`,
            ERRORS.INTERNAL_ERROR,
        );
    }
}

function filterProperty(filter: string[]) {
    const dbFilter = ['dir'];
    filter.forEach((prop) => {
        switch (prop) {
            case 'doc': {
                dbFilter.push('doc', 'docx', 'pdf', 'xls', 'xlsx');
                break;
            }
            case 'music': {
                dbFilter.push('mp3', 'wav');
                break;
            }
            case 'pic': {
                dbFilter.push('jpg', 'jpeg', 'png');
                break;
            }
            case 'vid': {
                dbFilter.push('mp4', 'm4a', 'mov');
                break;
            }
        }
    });
    return dbFilter;
}
