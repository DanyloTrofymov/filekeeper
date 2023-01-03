"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFileController = void 0;
const file_1 = __importDefault(require("../../services/file"));
async function searchFileController(req, res, next) {
    const query = req.query;
    const data = { ...req.body, ...query };
    try {
        const files = await file_1.default.searchFile(data);
        res.json({
            data: {
                files,
            },
            status: 1,
        });
    }
    catch (e) {
        next(e);
    }
}
exports.searchFileController = searchFileController;
//# sourceMappingURL=SearchFile.js.map