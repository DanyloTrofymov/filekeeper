import { Router } from 'express';
import controllers from '../controllers';
import { getDataByToken } from '../middlewares/auth';

export const initFileApi = () => {
    const router = Router();
    router.post('/', getDataByToken, controllers.FileController.createDir);
    router.post(
        '/upload',
        getDataByToken,
        controllers.FileController.uploadFile,
    );
    router.get('/', getDataByToken, controllers.FileController.listFiles);
    return router;
};
