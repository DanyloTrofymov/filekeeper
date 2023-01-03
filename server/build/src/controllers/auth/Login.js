"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const validator_1 = __importDefault(require("../../utils/validator"));
const auth_1 = __importDefault(require("../../services/auth"));
const dumps_1 = require("../../utils/dumps");
async function LoginController(req, res, next) {
    const data = { ...req.body };
    const validationRules = {
        username: ['required', 'string', { min_length: 8 }],
        password: ['required', 'string', { min_length: 8, max_length: 63 }],
    };
    try {
        (0, validator_1.default)(data, validationRules);
        const { user, token } = await auth_1.default.login(data);
        res.json({
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
exports.LoginController = LoginController;
//# sourceMappingURL=Login.js.map