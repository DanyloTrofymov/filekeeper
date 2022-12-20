import { Router } from 'express';
import controllers from '../controllers';

export const initAuthApi = () => {
    const router = Router();
    router.post('/registration', controllers.AuthController.registration);
    router.post('/login', controllers.AuthController.login);
    return router;
};
