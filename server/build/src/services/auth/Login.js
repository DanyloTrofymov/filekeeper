"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const error_1 = require("../../utils/error");
const User_1 = __importDefault(require("../../models/User"));
const bcrypt_1 = require("bcrypt");
const jwt_1 = __importDefault(require("../../utils/jwt"));
async function LoginService(data) {
    const user = await User_1.default.findOne({ username: data.username });
    if (!user)
        throw new error_1.HttpError(403, 'Incorrect username or password', error_1.ERRORS.BAD_PASSWORD);
    const matchPass = await (0, bcrypt_1.compare)(data.password, user.password);
    if (!matchPass)
        throw new error_1.HttpError(403, 'Incorrect username or password', error_1.ERRORS.BAD_PASSWORD);
    const token = (0, jwt_1.default)(user);
    return {
        user,
        token,
    };
}
exports.LoginService = LoginService;
//# sourceMappingURL=Login.js.map