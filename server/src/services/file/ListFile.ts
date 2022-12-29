import File from '../../models/File';
import { ITokenBody } from '../../types/auth';
import { IFindQuery } from '../../types/file';
import { ERRORS, HttpError } from '../../utils/error';
import { allowedSort, allowedFilter } from '../../types/file';

export async function listFileService(data: ITokenBody & IFindQuery) {
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
            files = await File.find({
                user: data.userId,
                parent: data.parent,
                type: filter,
            }).sort(data.sort);
        } else if (data.filter) {
            const filter = filterProperty(data.filter);
            files = await File.find({
                user: data.userId,
                parent: data.parent,
                type: filter,
            });
        } else if (data.sort) {
            files = await File.find({
                user: data.userId,
                parent: data.parent,
            }).sort(data.sort);
        } else {
            files = await File.find({
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
            400,
            `Files for user ${data.userId} with parentId ${data.parent} not found`,
            ERRORS.NOT_FOUND('FILES'),
        );
    }
}

function filterProperty(filter: string[]) {
    const dbFilter = ['dir'];
    filter.forEach((prop) => {
        switch (prop) {
            case 'doc': {
                dbFilter.push('doc');
                dbFilter.push('docx');
                dbFilter.push('pdf');
                dbFilter.push('xls');
                dbFilter.push('xlsx');
                break;
            }
            case 'music': {
                dbFilter.push('mp3');
                dbFilter.push('wav');
                break;
            }
            case 'pic': {
                dbFilter.push('jpg');
                dbFilter.push('jpeg');
                dbFilter.push('png');
                break;
            }
            case 'vid': {
                dbFilter.push('mp4');
                dbFilter.push('m4a');
                dbFilter.push('m4a', 'mov');
                break;
            }
        }
    });
    return dbFilter;
}
