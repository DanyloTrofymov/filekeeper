"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const auth_1 = __importDefault(require("../../services/auth"));
async function TokenController(req, res, next) {
    const data = { ...req.body };
    try {
        const user = await auth_1.default.token(data);
        return res.json({
            data: {
                ...user,
            },
            status: 1,
        });
    }
    catch (e) {
        return next(e);
    }
}
exports.TokenController = TokenController;
//# sourceMappingURL=Token.js.map