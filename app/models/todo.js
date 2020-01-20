"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = __importDefault(require("../config/environment"));
const todo_1 = __importDefault(require("../schemas/todo"));
const date_1 = __importDefault(require("../utils/date"));
const logger_1 = __importDefault(require("../utils/logger"));
const { SECRET } = environment_1.default;
const PAGINATION_LIMIT = 10;

const toTodoJSON = function () {
    return {
        _id: this._id,
        description: this.description,
        user: this.user
    };
};
const createTodo = async (description, user) => {
    try {
        const todo = new Todo({ description, user });
        await todo.save();
        return todo.toTodoJSON();
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        throw Error("Could not create new todo.");
    }
};
const getTodoById = async (id) => {
    try {
        return await Todo.findById(id);
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        throw err;
    }
};
const searchTodos = async (searchQuery) => {
    try {
        const _ = new RegExp(searchQuery, "i");
        return Todo.find({ description: { $regex: _ } });
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        throw new Error(`Something went wrong when searching todos for ${searchQuery}.`);
    }
};
const getNewTodos = async (page) => {
    try {
        const { docs, total, limit, page: pageNum, pages } = await Todo.paginate({}, {
            page,
            limit: PAGINATION_LIMIT,
            lean: true,
        });
        return { todos: docs, total, limit, page: pageNum, pages };
    }
    catch (err) {
        logger_1.default.error("Error: ", err);
        throw new Error(`Could not get new todos.`);
    }
};
todo_1.default.methods.toTodoJSON = toTodoJSON;
todo_1.default.statics.createTodo = createTodo;
todo_1.default.statics.getTodoById = getTodoById;
todo_1.default.statics.searchTodos = searchTodos;
todo_1.default.statics.getNewTodos = getNewTodos;
const Todo = mongoose_1.default.model("Todo", todo_1.default);
exports.default = Todo;
