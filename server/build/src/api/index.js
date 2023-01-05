"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApi = void 0;
const express_1 = require("express");
const auth_1 = require("./auth");
const file_1 = require("./file");
const initApi = () => {
    const router = (0, express_1.Router)();
    router.use('/auth', (0, auth_1.initAuthApi)());
    router.use('/drive', (0, file_1.initFileApi)());
    return router;
};
exports.initApi = initApi;
//# sourceMappingURL=index.js.map