"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_winston_1 = require("@google-cloud/logging-winston");
const winston_1 = __importStar(require("winston"));
const envType = process.env.node_env || "local";
console.log(`env type -->`, process.env.node_env || `local`);
const loggingWinston = new logging_winston_1.LoggingWinston();
const options = {
    file: {
        level: "info",
        format: winston_1.format.combine(winston_1.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
        handleExceptions: true,
        exitOnError: true,
    },
    console: {
        level: "info",
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
        handleExceptions: true,
        exitOnError: true,
    },
};
const logger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.Console(options.console),
        loggingWinston,
    ],
});
class LoggerStream {
    write(message, encoding) {
        logger.info(message.trim());
    }
}
exports.LoggerStream = LoggerStream;
exports.default = logger;
