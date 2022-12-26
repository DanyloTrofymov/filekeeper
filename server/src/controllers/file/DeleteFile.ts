import { Response, NextFunction, Request } from 'express';
import FileService from '../../services/file';
import { IDeleteQuery } from '../../types/file';
import { ITokenBody } from '../../types/auth';
import { ERRORS, HttpError } from '../../utils/error';
import User from '../../models/User';
import { dumpFile } from '../../utils/dumps';
import File from '../../models/File';

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
        console.log(data);
        const file = await File.findOne({ _id: data.id, user: data.userId });
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
        console.log(dumpFile(file));
        const childs: any = [];
        await getChilds(file, childs);
        console.log();
        childs.push(file);
        await childs.forEach(async (child: any) => {
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
async function getChilds(file: any, childs: any[]) {
    const childForThis = await File.find({ childs: file.childs });
    childForThis.forEach((child: any) => {
        getChilds(child, childs);
    });

    return childs;
}
