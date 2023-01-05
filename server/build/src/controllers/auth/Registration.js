"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationController = void 0;
const validator_1 = __importDefault(require("../../utils/validator"));
const auth_1 = __importDefault(require("../../services/auth"));
const dumps_1 = require("../../utils/dumps");
async function RegistrationController(req, res, next) {
    const data = { ...req.body };
    const validationRules = {
        email: ['required', 'email'],
        username: ['required', 'string', { min_length: 8 }],
        password: ['required', 'string', { min_length: 8, max_length: 63 }],
        confirmPassword: ['required', { equal_to_field: 'password' }],
    };
    try {
        (0, validator_1.default)(data, validationRules);
        const { user, token } = await auth_1.default.registration(data, req.storagePath);
        return res.json({
            data: {
                ...(0, dumps_1.dumpUser)(user),
                token,
            },
            status: 1,
        });
    }
    catch (e) {
        return next(e);
    }
}
exports.RegistrationController = RegistrationController;
//# sourceMappingURL=Registration.js.map