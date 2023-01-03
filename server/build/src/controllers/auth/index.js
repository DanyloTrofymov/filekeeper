"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Registration_1 = require("./Registration");
const Login_1 = require("./Login");
const Token_1 = require("./Token");
class AuthController {
    static registration = Registration_1.RegistrationController;
    static login = Login_1.LoginController;
    static auth = Token_1.TokenController;
}
exports.default = AuthController;
//# sourceMappingURL=index.js.map