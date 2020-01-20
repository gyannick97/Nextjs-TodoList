"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const SEMVER = "0.0.1";
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const environment_1 = __importDefault(require("./config/environment"));
require("./config/passport");
require("./mongoose");
const { CORS_ORIGIN_WHITELIST, PORT } = environment_1.default;
const errorHandler_1 = require("./api/api/v1/middleware/errorHandler");
const errors_1 = __importDefault(require("./utils/errors"));
const logger_1 = __importStar(require("./utils/logger"));
const admin_1 = __importDefault(require("./api/api/v1/routes/admin"));
const todo_1 = __importDefault(require("./api/api/v1/routes/todo"));
const corsOptions = {
    origin(origin, callback) {
        if (CORS_ORIGIN_WHITELIST.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            logger_1.default.error(`${origin} is not allowed by CORS.`);
            callback(new Error(`Not allowed by CORS`));
        }
    },
};
const port = process.env.PORT || PORT;
const POST_LIMIT = `50mb`;
const app = express_1.default();
app.use(morgan_1.default("combined", { stream: new logger_1.LoggerStream() }));
app.use(body_parser_1.default.json({ limit: POST_LIMIT }));
app.use(body_parser_1.default.urlencoded({ limit: POST_LIMIT, extended: true }));
app.use(cors_1.default(corsOptions));
app.use(`/api/v1/admin`, admin_1.default);
app.use(`/api/v1/todo`, todo_1.default);
app.get(`/status`, (_, res) => {
    return res.send({
        status: `ok`,
        env: process.env.node_env || "local",
        semver: SEMVER,
    });
});
app.use((req, res, next) => {
    return errors_1.default.notFound(req, next);
});
app.use(errorHandler_1.errorHandler);

app.listen(port, () => {
    return logger_1.default.info(`APP server started on port ${port} 🎉`);
});
exports.default = app;
