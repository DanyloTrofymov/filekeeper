import { Router } from 'express';
import { initAuthApi } from './auth';
//import { initUserApi } from "./user.js";

export const initApi = () => {
    const router = Router();
    router.use('/auth', initAuthApi());
    //router.use("/user", initUserApi());
    return router;
};
