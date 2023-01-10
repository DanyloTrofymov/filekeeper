"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const error_1 = require("../../utils/error");
const User_1 = __importDefault(require("../../models/User"));
const jwt_1 = __importDefault(require("../../utils/jwt"));
async function TokenService(data) {
    const user = await User_1.default.findOne({ _id: data.userId });
    if (!user) {
        throw new error_1.HttpError(403, 'Auth error', error_1.ERRORS.NOT_FOUND('USER'));
    }
    const secret = process.env.SECRET;
    if (!secret) {
        throw new error_1.HttpError(500, 'Enviromental variables error', error_1.ERRORS.INTERNAL_ERROR);
    }
    const token = (0, jwt_1.default)(user);
    return {
        _id: user._id,
        email: user.email,
        username: user.username,
        drive_space: user.drive_space,
        used_space: user.used_space,
        token: token,
    };
}
exports.TokenService = TokenService;
//# sourceMappingURL=Token.js.map