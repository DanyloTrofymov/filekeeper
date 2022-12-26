import { Response, NextFunction, Request } from 'express';
import FileService from '../../services/file';
import { IFindBody } from '../../types/file';
import { ITokenBody } from '../../types/auth';

interface FindBody extends Request {
    body: ITokenBody;
}

export async function listFileController(
    req: FindBody,
    res: Response,
    next: NextFunction,
) {
    const query = req.query as unknown as IFindBody;
    const data = { ...req.body, ...query };
    try {
        const files = await FileService.listFile(data);
        res.json({
            data: {
                files,
            },
            status: 1,
        });
    } catch (e) {
        next(e);
    }
}
