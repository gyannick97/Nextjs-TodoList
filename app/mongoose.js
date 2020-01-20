"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = __importDefault(require("./config/environment"));
const { MONGODB_URI } = environment_1.default;
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: false,
    keepAlive: true,
    connectTimeoutMS: 30000,
    useFindAndModify: false,
});
exports.default = mongoose_1.default;
