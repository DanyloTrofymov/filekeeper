"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
function cors(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, FETCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}
exports.cors = cors;
//# sourceMappingURL=cors.js.map