"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const file_1 = __importDefault(require("./file"));
exports.default = {
    AuthController: auth_1.default,
    FileController: file_1.default,
};
//# sourceMappingURL=index.js.map