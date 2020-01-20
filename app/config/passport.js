"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const user_1 = __importDefault(require("../models/user"));
passport_1.default.use(new passport_local_1.default({
    usernameField: "email",
    passwordField: "password",
}, (email, password, done) => {
    user_1.default.findOne({ email })
        .then((user) => {
        if (!user || !user.validatePassword(password)) {
            return done(null, false, {
                errors: { "email or password": "is invalid" },
            });
        }
        return done(null, user);
    })
        .catch(done);
}));
