"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePathController = void 0;
const file_1 = __importDefault(require("../../services/file"));
async function getFilePathController(req, res, next) {
    const query = req.query;
    const data = { ...req.body, ...query };
    try {
        const path = await file_1.default.getFilePath(data);
        res.json({
            data: {
                path,
            },
            status: 1,
        });
    }
    catch (e) {
        next(e);
    }
}
exports.getFilePathController = getFilePathController;
//# sourceMappingURL=GetFilePath.js.map