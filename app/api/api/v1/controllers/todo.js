"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = __importDefault(require("../../../../models/todo"));
const errors_1 = __importDefault(require("../../../../utils/errors"));
const logger_1 = __importDefault(require("../../../../utils/logger"));

const getTodo = async (req, res, next) => {
  try {
    const _todo = (await todo_1.default.find({ }));
    return res.send({ todo: _todo  });
  }
  catch (err) {
    logger_1.default.error("Error: ", err);
    res.send({ message: err })
    return errors_1.default.internalError(next);
  }
};
const getTodoByUser = async (req, res, next) => {
  try {
    const _todo = (await todo_1.default.find({ user: req.params.id }).populate("user"));
    return res.send({ todo: _todo  });
  }
  catch (err) {
    logger_1.default.error("Error: ", err);
    res.send({ message: err })
    return errors_1.default.internalError(next);
  }
};
const getTodoById = async (req, res, next) => {
  try {
    const _todo = (await todo_1.default.getTodoById(req.params.id));
    return res.send({ todo: _todo  });
  }
  catch (err) {
    logger_1.default.error("Error: ", err);
    res.send({ message: err })
    return errors_1.default.internalError(next);
  }
};
const createTodo = async (req, res, next) => {
  try {
    const { description, user } = req.body;
    if (!description) {
      throw errors_1.default.invalidParams("Description is required.", next);
    }
    const _todo = await todo_1.default.createTodo(description, user);
    return res.send({ todo: _todo });
  }
  catch (err) {
    logger_1.default.error("Error: ", err);
    res.send({ message: err })
    return errors_1.default.internalError(next);
  }
};
const deleteTodo = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const _todo = await todo_1.default.findByIdAndRemove(_id);
    return res.send({ todo: _todo })
  }
  catch (err) {
    logger_1.default.error("Error: ", err);
    res.send({ message: err })
    return errors_1.default.internalError(next);
  }
};
const updateTodo = async (req, res, next) => {
  try {
    const _id = req.body._id
    const params = {
      done: req.body.done
    };
    const _todo = (await todo_1.default.findByIdAndUpdate(_id, params));
    return res.send({ todo: _todo })
  }
  catch (err) {
    logger_1.default.error("Error: ", err);
    res.send({ message: err })
    return errors_1.default.internalError(next);
  }
};

exports.default = {
  getTodo,
  getTodoByUser,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
};
