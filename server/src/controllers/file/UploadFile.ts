import { Response, NextFunction, Request } from 'express';
import File from '../../models/File';
import User from '../../models/User';
import { ITokenBody } from '../../types/auth';
import { IUploadFileBody, IFile, allowedTypes } from '../../types/file';
import { ERRORS, HttpError } from '../../utils/error';
import FileService from '../../services/file';
import validate from '../../utils/validator';
import { dumpFile } from '../../utils/dumps';
import { Buffer } from 'buffer';
import { mongoose } from '@typegoose/typegoose';
import FileModel from '../../models/File';
import UserModel from '../../models/User';

interface FileBody extends Request {
    body: IUploadFileBody & ITokenBody;
}

export async function uploadFileController(
    req: FileBody,
    res: Response,
    next: NextFunction,
) {
    const validationRules = {
        userId: ['required', 'string'],
        parent: ['string'],
    };
    if (!req.files) {
        throw new HttpError(
            400,
            'File need to be uploaded',
            ERRORS.NOT_FOUND('FILE'),
        );
    }

    const file = { ...req.files.file } as unknown as IFile;
    const data = { ...req.body };
    const parent = await File.findOne({
        user: data.userId,
        _id: req.body.parent,
    });
    const user = await User.findOne({ _id: data.userId });

    try {
        validate(data, validationRules);
        const type = file.name.toLowerCase().split('.').pop() || '';
        if (!allowedTypes.includes(type)) {
            throw new HttpError(
                400,
                `You can\`t upload file with type ${type}`,
                ERRORS.WRONG_TYPE,
            );
        }

        if (!user) {
            throw new HttpError(
                400,
                `User with id ${data.userId} was not found`,
                ERRORS.NOT_FOUND('USER'),
            );
        }
        if (user.used_space + file.size > user.disk_space)
            throw new HttpError(
                400,
                `There is no space for this file on your disk`,
                ERRORS.NO_SPACE_ON_DISK,
            );

        file.name = Buffer.from(file.name, 'ascii').toString('utf8');

        let filePath = file.name;
        if (parent) {
            filePath = `${parent.path}\\${file.name}`;
        }

        const dbFile = new File({
            _id: new mongoose.Types.ObjectId(),
            name: file.name,
            type: type,
            size: file.size,
            path: filePath,
            parent: parent?.id,
            user: user._id,
        });

        const dbFileRes = await FileService.uploadFile(dbFile, file);
        if (parent) {
            await FileModel.updateOne(
                { _id: parent._id },
                { $push: { childs: dbFileRes._id } },
            );
            //await parent.save()
            //await FileModel.findByIdAndUpdate(parent._id, parent);
        }
        await UserModel.updateOne(
            { _id: user._id },
            { $inc: { used_space: dbFileRes.size } },
        );
        return res.json({
            data: {
                ...dumpFile(dbFileRes),
            },
            status: 1,
        });
    } catch (e: unknown) {
        next(e);
    }
}
