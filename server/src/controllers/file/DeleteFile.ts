import { Response, NextFunction, Request } from 'express';
import FileService from '../../services/file';
import { IDeleteQuery } from '../../types/file';
import { ITokenBody } from '../../types/auth';
import FileModel, { File } from '../../models/File';
import { ERRORS, HttpError } from '../../utils/error';
import User from '../../models/User';

interface downloadBody extends Request {
    body: ITokenBody;
}

export async function deleteFileController(
    req: downloadBody,
    res: Response,
    next: NextFunction,
) {
    const query = req.query as unknown as IDeleteQuery;
    const data = { ...req.body, ...query };
    const user = await User.findOne({ _id: data.userId });

    try {
        const file = FileModel.findOne({ _id: data.id, user: data.userId });
        if (!file) {
            throw new HttpError(
                403,
                'File not found',
                ERRORS.NOT_FOUND('FILE'),
            );
        }

        if (!user) {
            throw new HttpError(
                400,
                `User with id ${data.userId} was not found`,
                ERRORS.NOT_FOUND('USER'),
            );
        }

        const childs: any = [];
        await getChilds(file, childs);
        console.log();
        childs.push(file);
        await childs.forEach(async (child: File) => {
            user.used_space -= child.size;
            await FileService.deleteFile(child);
        });

        await user.save();

        return res.json({
            data: {
                ...childs,
            },
            status: 1,
        });
    } catch (e) {
        next(e);
    }
}
async function getChilds(file: any, childs: File[]) {
    const childForThis = await FileModel.find({ childs: file.childs });
    childForThis.forEach((child) => {
        getChilds(child, childs);
    });

    return childs;
}
