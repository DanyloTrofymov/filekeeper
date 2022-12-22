import { Response, NextFunction, Request } from 'express';
import FileService from '../../services/file'
import File from '../../models/File'
import validate from '../../utils/validator';
import { ICreateBody } from '../../types/file';
import { ITokenBody } from '../../types/auth';
import { dumpFile } from '../../utils/dumps';
import FileModel from '../../models/File';
import { ERRORS, HttpError } from '../../utils/error';

interface CreateBody extends Request {
    body: ICreateBody & ITokenBody;
}

export async function createDirController(req: CreateBody, res: Response, next: NextFunction){
    const data = { ...req.body };

    const validationRules = {
        userId: ['required', 'string'],
        name: ['required', 'string'],
        type: ['required', 'string'],
    };

    try {
        validate(data, validationRules);
        console.log(data);
        const file = new File({name: data.name, type: data.type, parent: data.parent || null, user: data.userId})

        if(!data.parent){
            file.path = data.name;
            console.log(file.path);
            await FileService.createDir(file)
        } else{
            const parentFile = await File.findOne({id: data.parent})
            if(!parentFile){
                throw new HttpError(
                    500,
                    `Internal server error. Could not find dir ${data.parent} for user ${data.userId}`,
                    ERRORS.INTERNAL_ERROR,
                );
            }

            file.path = `${parentFile.path}\\${data.name}`
            console.log(file.path)
            await FileService.createDir(file)
            parentFile.childs.push(file._id);
            await parentFile.save();
        }
        const dbFile = await FileModel.create(file);
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
