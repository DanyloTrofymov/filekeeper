"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationService = void 0;
const bcrypt_1 = require("bcrypt");
const error_1 = require("../../utils/error");
const User_1 = __importDefault(require("../../models/User"));
const User_2 = __importDefault(require("../../models/User"));
const jwt_1 = __importDefault(require("../../utils/jwt"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const typegoose_1 = require("@typegoose/typegoose");
async function RegistrationService(data, storagePath) {
    const existingEmail = await User_1.default.findOne({ email: data.email });
    if (existingEmail)
        (0, error_1.throwError)(error_1.ERRORS.EMAIL_EXISTS, 'User with this email already exists', {
            email: data.email,
        });
    const existingUsername = await User_1.default.findOne({ username: data.username });
    if (existingUsername)
        (0, error_1.throwError)(error_1.ERRORS.USERNAME_EXISTS, 'User with this username already exists', { userName: data.username });
    const salt = await (0, bcrypt_1.genSalt)(3);
    const hashPassword = await (0, bcrypt_1.hash)(data.password, salt);
    const user = await User_2.default.create({
        _id: new typegoose_1.mongoose.Types.ObjectId(),
        email: data.email,
        username: data.username,
        password: hashPassword,
    });
    const userPath = `${storagePath}\\${user._id}`;
    fs_extra_1.default.ensureDir(userPath);
    const token = (0, jwt_1.default)(user);
    return {
        user,
        token,
    };
}
exports.RegistrationService = RegistrationService;
//# sourceMappingURL=Registration.js.map