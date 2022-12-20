import { Router } from 'express';
import controllers from '../controllers';

export const initAuthApi = () => {
    const router = Router();
    router.post('/registration', controllers.AuthController.registration);
    //router.get("/login", controllers.AuthController.login);
    //router.get("/refresh", controllers.AuthController.refresh);
    return router;
};
