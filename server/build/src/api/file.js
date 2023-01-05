"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFileApi = void 0;
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const auth_1 = require("../middlewares/auth");
const initFileApi = () => {
    const router = (0, express_1.Router)();
    router.post('/', auth_1.authMiddleware, controllers_1.default.FileController.createDir);
    router.post('/upload', auth_1.authMiddleware, controllers_1.default.FileController.uploadFile);
    router.get('/', auth_1.authMiddleware, controllers_1.default.FileController.listFiles);
    router.get('/search', auth_1.authMiddleware, controllers_1.default.FileController.searchFile);
    router.get('/download', auth_1.authMiddleware, controllers_1.default.FileController.downloadFile);
    router.delete('/', auth_1.authMiddleware, controllers_1.default.FileController.deleteFile);
    router.get('/getpath', auth_1.authMiddleware, controllers_1.default.FileController.getFilePath);
    return router;
};
exports.initFileApi = initFileApi;
//# sourceMappingURL=file.js.map