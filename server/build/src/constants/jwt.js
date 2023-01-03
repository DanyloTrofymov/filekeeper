"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenExpireTime = exports.verifyOptions = exports.signOptions = void 0;
const issuer = 'Example Software', subject = 'example@gmail.com', audience = 'example.com';
exports.signOptions = {
    issuer,
    subject,
    audience,
    algorithm: 'RS256',
};
exports.verifyOptions = {
    issuer,
    subject,
    audience,
    algorithms: ['RS256'],
};
exports.tokenExpireTime = {
    accessToken: '15m',
    refreshToken: '15d',
};
//# sourceMappingURL=jwt.js.map