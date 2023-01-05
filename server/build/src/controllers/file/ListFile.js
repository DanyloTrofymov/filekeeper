"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFileController = void 0;
const file_1 = __importDefault(require("../../services/file"));
async function listFileController(req, res, next) {
    const query = req.query;
    if (query.filter && typeof query.filter == 'string') {
        const paramArray = [query.filter];
        query.filter = paramArray;
    }
    const data = { ...req.body, ...query };
    data.filter = query.filter;
    try {
        const files = await file_1.default.listFile(data);
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
exports.listFileController = listFileController;
//# sourceMappingURL=ListFile.js.map