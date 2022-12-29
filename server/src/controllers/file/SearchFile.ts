import { Response, NextFunction, Request } from 'express';
import FileService from '../../services/file';
import { ISearchQuery } from '../../types/file';
import { ITokenBody } from '../../types/auth';

interface SearchBody extends Request {
    body: ITokenBody;
}

export async function searchFileController(
    req: SearchBody,
    res: Response,
    next: NextFunction,
) {
    const query = req.query as unknown as ISearchQuery;
    const data = { ...req.body, ...query };

    try {
        const files = await FileService.searchFile(data);
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
