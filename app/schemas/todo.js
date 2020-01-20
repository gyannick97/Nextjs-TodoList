"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const TodoSchema = new mongoose_1.Schema({
    description: { type: String, required: true },
    done: { type: Boolean, default: false },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
});
TodoSchema.plugin(mongoose_paginate_1.default);
exports.default = TodoSchema;
