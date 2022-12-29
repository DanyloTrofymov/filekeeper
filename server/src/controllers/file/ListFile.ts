import { Response, NextFunction, Request } from 'express';
import FileService from '../../services/file';
import { IListQuery } from '../../types/file';
import { ITokenBody } from '../../types/auth';

interface ListBody extends Request {
    body: ITokenBody;
}

export async function listFileController(
    req: ListBody,
    res: Response,
    next: NextFunction,
) {
    const query = req.query as unknown as IListQuery;
    if (query.filter && typeof query.filter == 'string') {
        const paramArray = [query.filter];
        query.filter = paramArray;
    }
    const data = { ...req.body, ...query };
    data.filter = query.filter;

    try {
        const files = await FileService.listFile(data);
        res.json({
            data: {
                files,
            },
            status: 1,
        });
    } catch (e: unknown) {
        next(e);
    }
}
