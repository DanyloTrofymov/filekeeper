"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFileService = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const File_1 = __importDefault(require("../../models/File"));
const error_1 = require("../../utils/error");
async function downloadFileService(data, res, storagePath) {
    const file = await File_1.default.findOne({ _id: data.id, user: data.userId });
    if (!file) {
        throw new error_1.HttpError(403, 'File not found', error_1.ERRORS.NOT_FOUND('FILE'));
    }
    const path = `${storagePath}\\${data.userId}\\${file.path}`;
    const exists = await fs_extra_1.default.pathExists(path);
    if (exists) {
        return res.download(path);
    }
    throw new error_1.HttpError(500, 'Download error');
}
exports.downloadFileService = downloadFileService;
//# sourceMappingURL=DownloadFile.js.map