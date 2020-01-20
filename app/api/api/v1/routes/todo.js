"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_jwt_1 = __importDefault(require("express-jwt"));
const environment_1 = __importDefault(require("../../../../config/environment"));
const todo_1 = __importDefault(require("../controllers/todo"));
const { SECRET } = environment_1.default;
const router = express_1.default.Router();
const getTokenFromHeaders = (req) => {
    const { headers: { authorization }, } = req;
    if (authorization && authorization.split(" ")[0] === "Token") {
        return authorization.split(" ")[1];
    }
    return null;
};
const auth = {
    required: express_jwt_1.default({
        secret: SECRET,
        userProperty: "payload",
        getToken: getTokenFromHeaders,
    }),
    optional: express_jwt_1.default({
        secret: SECRET,
        userProperty: "payload",
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
};

router.get("/getTodo", auth.required, todo_1.default.getTodo);
router.get("/getTodoByUser/:id", auth.required, todo_1.default.getTodoByUser);
router.get("/getTodoById/:id", auth.required, todo_1.default.getTodoById);
router.post("/createTodo", auth.required, todo_1.default.createTodo);
router.post("/deleteTodo", auth.required, todo_1.default.deleteTodo);
router.post("/updateTodo", auth.required, todo_1.default.updateTodo);
exports.default = router;
