"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFileController = void 0;
const file_1 = __importDefault(require("../../services/file"));
async function downloadFileController(req, res, next) {
    const query = req.query;
    const data = { ...req.body, ...query };
    try {
        return await file_1.default.downloadFile(data, res, req.storagePath);
    }
    catch (e) {
        next(e);
    }
}
exports.downloadFileController = downloadFileController;
//# sourceMappingURL=DownloadFile.js.map