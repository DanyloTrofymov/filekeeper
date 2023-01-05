"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Login_1 = require("./Login");
const Registration_1 = require("./Registration");
const Token_1 = require("./Token");
class AuthService {
    static registration = Registration_1.RegistrationService;
    static login = Login_1.LoginService;
    static token = Token_1.TokenService;
}
exports.default = AuthService;
//# sourceMappingURL=index.js.map