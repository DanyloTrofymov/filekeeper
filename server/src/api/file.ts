import { Router } from 'express';
import controllers from '../controllers';
import { authMiddleware } from '../middlewares/auth';

export const initFileApi = () => {
    const router = Router();
    router.post('/', authMiddleware, controllers.FileController.createDir);
    router.post(
        '/upload',
        authMiddleware,
        controllers.FileController.uploadFile,
    );
    router.get('/', authMiddleware, controllers.FileController.listFiles);
    router.get(
        '/download',
        authMiddleware,
        controllers.FileController.downloadFile,
    );
    router.delete('/', authMiddleware, controllers.FileController.deleteFile);
    return router;
};
