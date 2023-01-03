"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function genetateToken(user) {
    const secret = process.env.SECRET;
    if (!secret) {
        throw new error_1.HttpError(500, 'Enviromental variables error', error_1.ERRORS.INTERNAL_ERROR);
    }
    const token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email, username: user.username }, secret, { expiresIn: '2h' });
    return token;
}
exports.default = genetateToken;
//# sourceMappingURL=jwt.js.map