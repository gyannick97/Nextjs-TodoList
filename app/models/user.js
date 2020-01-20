"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = __importDefault(require("../config/environment"));
const user_1 = __importDefault(require("../schemas/user"));
const date_1 = __importDefault(require("../utils/date"));
const logger_1 = __importDefault(require("../utils/logger"));
const { SECRET } = environment_1.default;
const PAGINATION_LIMIT = 10;
const setPassword = function (password) {
    this.salt = crypto_1.default.randomBytes(16).toString("hex");
    this.hash = crypto_1.default
        .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
        .toString("hex");
};
const validatePassword = function (password) {
    const hash = crypto_1.default
        .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
        .toString("hex");
    return this.hash === hash;
};
const toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};
const createUser = async (email, password) => {
    try {
        const user = new User({ email, password });
        user.setPassword(password);
        await user.save();
        return user.toAuthJSON();
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        throw Error("Could not create new user.");
    }
};
const generateJWT = function () {
    const expirationDate = date_1.default.getNowPlus1Year();
    return jsonwebtoken_1.sign({
        email: this.email,
        id: this._id,
        expiresIn: expirationDate,
    }, SECRET);
};
const getUserById = async (id) => {
    try {
        return await User.findById(id);
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        throw err;
    }
};
const searchUsers = async (searchQuery) => {
    try {
        const _ = new RegExp(searchQuery, "i");
        return User.find({ email: { $regex: _ } });
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        throw new Error(`Something went wrong when searching users for ${searchQuery}.`);
    }
};
const getNewUsers = async (page) => {
    try {
        const { docs, total, limit, page: pageNum, pages } = await User.paginate({}, {
            page,
            limit: PAGINATION_LIMIT,
            lean: true,
        });
        return { users: docs, total, limit, page: pageNum, pages };
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        throw new Error(`Could not get new users.`);
    }
};
user_1.default.methods.generateJWT = generateJWT;
user_1.default.methods.setPassword = setPassword;
user_1.default.methods.validatePassword = validatePassword;
user_1.default.methods.toAuthJSON = toAuthJSON;
user_1.default.statics.createUser = createUser;
user_1.default.statics.getUserById = getUserById;
user_1.default.statics.searchUsers = searchUsers;
user_1.default.statics.getNewUsers = getNewUsers;
const User = mongoose_1.default.model("User", user_1.default);
exports.default = User;
