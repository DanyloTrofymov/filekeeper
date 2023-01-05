"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePathService = void 0;
const File_1 = __importDefault(require("../../models/File"));
const error_1 = require("../../utils/error");
async function getFilePathService(data) {
    try {
        const file = await File_1.default.findOne({
            _id: data.id,
            user: data.userId,
        });
        if (!file) {
            throw new error_1.HttpError(403, 'File not found', error_1.ERRORS.NOT_FOUND('FILE'));
        }
        const path = `${data.userId}\\${file.path}`;
        return path;
    }
    catch (e) {
        throw new error_1.HttpError(500, 'Internal server error');
    }
}
exports.getFilePathService = getFilePathService;
//# sourceMappingURL=GetFilePath.js.map