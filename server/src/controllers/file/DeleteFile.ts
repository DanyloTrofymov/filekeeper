import { Response, NextFunction, Request } from 'express';
import FileService from '../../services/file';
import { IDeleteQuery } from '../../types/file';
import { ITokenBody } from '../../types/auth';
import { ERRORS, HttpError } from '../../utils/error';
import User from '../../models/User';
import FileModel from '../../models/File';
import UserModel from '../../models/User';

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

        if (!user) {
            throw new HttpError(
                400,
                `User with id ${data.userId} was not found`,
                ERRORS.NOT_FOUND('USER'),
            );
        }
        const childs = await getChilds(file);
        childs.push(file);
        await childs.forEach(async (child: any) => {
            await FileService.deleteFile(child, req.storagePath);
            if (user.used_space - child.size < 0) {
                await UserModel.updateOne({ _id: user._id }, { used_space: 0 });
            } else {
                await UserModel.updateOne(
                    { _id: user._id },
                    { $inc: { used_space: -child.size } },
                );
            }
            user.used_space -= child.size;
        });
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

async function getChilds(file: any): Promise<any> {
    const children = await FileModel.find({ _id: file.childs });
    const deepChildren = [];
    for (const child of children) {
        const childChildren = await getChilds(child);
        deepChildren.unshift(...childChildren);
    }
    return [...deepChildren, ...children];
}
