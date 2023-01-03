"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFileService = void 0;
const File_1 = __importDefault(require("../../models/File"));
const error_1 = require("../../utils/error");
async function searchFileService(data) {
    try {
        let files = await File_1.default.find({
            user: data.userId,
        });
        files = files.filter((file) => file.name.includes(data.search));
        return files;
    }
    catch (e) {
        throw new error_1.HttpError(500, `Internal server error`, error_1.ERRORS.INTERNAL_ERROR);
    }
}
exports.searchFileService = searchFileService;
//# sourceMappingURL=SearchFile.js.map