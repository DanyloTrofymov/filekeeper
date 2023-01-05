"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAuthApi = void 0;
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const auth_1 = require("../middlewares/auth");
const initAuthApi = () => {
    const router = (0, express_1.Router)();
    router.post('/registration', controllers_1.default.AuthController.registration);
    router.post('/login', controllers_1.default.AuthController.login);
    router.get('/token', auth_1.authMiddleware, controllers_1.default.AuthController.auth);
    return router;
};
exports.initAuthApi = initAuthApi;
//# sourceMappingURL=auth.js.map