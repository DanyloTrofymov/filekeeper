"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = exports.ERRORS = exports.HttpError = void 0;
class HttpError extends Error {
    status;
    message;
    code;
    errors;
    constructor(status, message, code, errors) {
        super(message);
        this.status = status;
        this.message = message;
        this.code = code || '';
        this.errors = errors;
    }
}
exports.HttpError = HttpError;
exports.ERRORS = {
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    VALIDATION_ERROR: `VALIDATION_ERROR`,
    EMAIL_EXISTS: 'EMAIL_EXISTS',
    USERNAME_EXISTS: 'USERNAME_EXISTS',
    FILE_EXISTS: 'FILE_EXISTS',
    BAD_TOKEN: 'BAD_TOKEN',
    SESSION_REQUIRED: 'SESSION_REQUIRED',
    BAD_PASSWORD: 'BAD_PASSWORD',
    NO_SPACE_ON_DRIVE: 'NO_SPACE_ON_DRIVE',
    WRONG_TYPE: 'WRONG_TYPE',
    NOT_FOUND: (model) => `${model.toUpperCase()}_NOT_FOUND`,
};
const throwError = (type, message, data = {}) => {
    throw new HttpError(400, message, type, data);
};
exports.throwError = throwError;
//# sourceMappingURL=error.js.map