import { Router } from 'express';
import controllers from '../controllers';
import { authMiddleware } from '../middlewares/auth';

export const initAuthApi = () => {
    const router = Router();
    router.post('/registration', controllers.AuthController.registration);
    router.post('/login', controllers.AuthController.login);
    router.get('/token', authMiddleware, controllers.AuthController.auth);
    return router;
};
