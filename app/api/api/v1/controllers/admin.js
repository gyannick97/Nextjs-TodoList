"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../../../../models/user"));
const errors_1 = __importDefault(require("../../../../utils/errors"));
const logger_1 = __importDefault(require("../../../../utils/logger"));

const getUser = async (req, res, next) => {
    try {
        const _users = (await user_1.default.find({}));
        return res.send({ user: _users });
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        res.send({ message: err })
        return errors_1.default.internalError(next);
    }
};
const getUserById = async (req, res, next) => {
    try {
        const _users = (await user_1.default.getUserById(req.params.id));
        return res.send({ user: _users });
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        res.send({ message: err })
        return errors_1.default.internalError(next);
    }
};
const createUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            throw errors_1.default.invalidParams("Email is required.", next);
        }
        if (!password) {
            throw errors_1.default.invalidParams("Password is required.", next);
        }
        const _user = await user_1.default.createUser(email, password);
        return res.send({ user: _user });
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        res.send({ message: err })
        return errors_1.default.internalError(next);
    }
};
const deleteUser = async (req, res, next) => {
    const { email } = req.body;
    try {
        await user_1.default.findOneAndDelete({ email });
        return res.sendStatus(200);
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        res.send({ message: err })
        return errors_1.default.internalError(next);
    }
};
const resetUserPassword = async (req, res, next) => {
    const { email, newPassword } = req.body;
    try {
        const user = (await user_1.default.findOne({ email }));
        user.setPassword(newPassword);
        return res.sendStatus(200);
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        res.send({ message: err })
        return errors_1.default.internalError(next);
    }
};
const updateUserPasswordById = async (req, res, next) => {
    const { userId, password } = req.body;
    try {
        const user = await user_1.default.getUserById(userId);
        user.setPassword(password);
        await user.save();
        return res.send({ user });
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        res.send({ message: err })
        return errors_1.default.internalError(next);
    }
};
const login = (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            throw errors_1.default.invalidParams("Email is required.", next);
        }
        if (!password) {
            throw errors_1.default.invalidParams("Password is required.", next);
        }
        return passport_1.default.authenticate("local", { session: false }, (err, passportUser, info) => {
            if (err) {
                logger_1.default.error("Error: ", err);
                return errors_1.default.customError("Invalid credentials.", next);
            }
            if (passportUser) {
                const user = passportUser;
                user.token = passportUser.generateJWT();
                return res.send({ user: user.toAuthJSON() });
            }
            return errors_1.default.customError("Invalid credentials.", next);
        })(req, res, next);
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        res.send({ message: err })
        return errors_1.default.internalError(next);
    }
};
const current = async (req, res, next) => {
    try {
        const { id } = req.payload;
        const user = await user_1.default.getUserById(id);
        if (user) {
            return res.send({ user: user.toAuthJSON() });
        }
        else {
            return errors_1.default.customError("Could not find user.", next);
        }
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        res.send({ message: err })
        return errors_1.default.internalError(next);
    }
};
exports.default = {
    getUser,
    getUserById,
    createUser,
    deleteUser,
    resetUserPassword,
    login,
    current,
    updateUserPasswordById,
};
