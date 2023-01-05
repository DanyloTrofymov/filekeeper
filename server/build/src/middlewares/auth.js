"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const error_1 = require("../utils/error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization;
        const secret = process.env.SECRET || '';
        if (!token || !secret) {
            throw new error_1.HttpError(403, 'Auth error', error_1.ERRORS.BAD_TOKEN);
        }
        const decoded = jsonwebtoken_1.default.verify(token.split(' ')[1], secret);
        req.body.userId = decoded._id;
        req.body.username = decoded.username;
        req.body.userId = decoded._id;
        next();
    }
    catch (e) {
        throw new error_1.HttpError(403, e.message, error_1.ERRORS.BAD_TOKEN);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map