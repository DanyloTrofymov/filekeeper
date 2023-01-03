import { Response, NextFunction, Request } from 'express';
import FileService from '../../services/file';
import FileModel from '../../models/File';
import validate from '../../utils/validator';
import { ICreateDirBody } from '../../types/file';
import { ITokenBody } from '../../types/auth';
import { dumpFile } from '../../utils/dumps';
import { ERRORS, HttpError } from '../../utils/error';
import { mongoose } from '@typegoose/typegoose';

interface CreateBody extends Request {
    body: ICreateDirBody & ITokenBody;
}

export async function createDirController(
    req: CreateBody,
    res: Response,
    next: NextFunction,
) {
    const data = { ...req.body };

    const validationRules = {
        userId: ['required', 'string'],
        name: ['required', 'string'],
        type: ['required', 'string'],
        parent: ['string'],
    };

    try {
        validate(data, validationRules);
        const file = new FileModel({
            _id: new mongoose.Types.ObjectId(),
            name: data.name,
            type: data.type,
            parent: data.parent || null,
            user: data.userId,
        });

        let dbFile;
        if (!data.parent) {
            file.path = data.name;
            dbFile = await FileService.createDir(file, req.storagePath);
        } else {
            const parentFile = await FileModel.findOne({ _id: data.parent });
            if (!parentFile) {
                throw new HttpError(
                    500,
                    `Internal server error. Could not find dir ${data.parent} for user ${data.userId}`,
                    ERRORS.INTERNAL_ERROR,
                );
            }
            file.path = `${parentFile.path}\\${data.name}`;
            dbFile = await FileService.createDir(file, req.storagePath);

            await FileModel.updateOne(
                { _id: parentFile._id },
                { $push: { childs: file._id } },
            );
        }
        return res.json({
            data: {
                ...dumpFile(dbFile),
            },
            status: 1,
        });
    } catch (e: unknown) {
        return next(e);
    }
}
