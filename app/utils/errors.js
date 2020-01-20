"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = require("./statusCodes");
const logger_1 = __importDefault(require("./logger"));
const notFound = (req, next) => {
    const { method, originalUrl } = req;
    const err = Error(`${method} ${originalUrl} does not exist.`);
    err.statusCode = statusCodes_1.NOT_FOUND;
    return next(err);
};
const invalidParams = (message, next) => {
    const err = Error(message);
    err.statusCode = statusCodes_1.BAD_REQUEST;
    return next(err);
};
const customError = (message, next, error) => {
    let _message = "";
    if (error) {
        _message = error.message;
    }
    else {
        _message = message;
    }
    const err = Error(_message);
    err.statusCode = statusCodes_1.INTERNAL_SERVER_ERROR;
    logger_1.default.error(`Sending custom error message: ${err.message}`);
    return next(err);
};
const internalError = (next) => {
    const err = Error();
    err.statusCode = statusCodes_1.INTERNAL_SERVER_ERROR;
    next(err);
};
const errors = {
    invalidParams,
    notFound,
    customError,
    internalError,
};
exports.default = errors;
