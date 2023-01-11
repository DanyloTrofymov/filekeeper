"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("./src/api");
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middlewares_1 = require("./src/middlewares");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const database_1 = __importDefault(require("./src/utils/database"));
const path_1 = __importDefault(require("path"));
const filePath_1 = __importDefault(require("./src/middlewares/filePath"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.disable("x-powered-by");
app.use(middlewares_1.cors);
app.use((0, filePath_1.default)(path_1.default.resolve(__dirname, 'storage')));
app.use((0, express_fileupload_1.default)({}));
app.use(express_1.default.static('storage'));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/v1', (0, api_1.initApi)());
app.use(middlewares_1.errorHandler);
const start = async () => {
    await (0, database_1.default)();
    app.listen(PORT, () => {
        console.log('Server started on port ', PORT);
    });
};
start();
//# sourceMappingURL=index.js.map