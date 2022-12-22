import { Response, NextFunction, Request } from 'express';
import FileService from '../../services/file';
import { IFindBody } from '../../types/file';
import { ITokenBody } from '../../types/auth';

// eslint-disable-next-line @typescript-eslint/ban-types
interface FindBody extends Request<{}, {}, {}, IFindBody> {
    body: ITokenBody;
}

export async function listFileController(
    req: FindBody,
    res: Response,
    next: NextFunction,
) {
    const data = { ...req.body, ...req.query };

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
