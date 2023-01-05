"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, req, res, next) {
    if (err.status === 500) {
        return res.status(500).json({
            status: 0,
            fields: err.errors,
            message: `${err.message}. Please, contact your system administrator`,
        });
    }
    if (err.status) {
        return res.status(err.status).json({
            status: 0,
            fields: err.errors,
            message: err.message,
        });
    }
    else {
        return res.status(500).json({
            status: 0,
            fields: {},
            message: 'Please, contact your system administrator',
        });
    }
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map