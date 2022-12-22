import { Router } from 'express';
import { initAuthApi } from './auth';
import { initFileApi } from './file';

export const initApi = () => {
    const router = Router();
    router.use('/auth', initAuthApi());
    router.use('/drive', initFileApi());
    return router;
};
