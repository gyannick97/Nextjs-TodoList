"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_jwt_1 = __importDefault(require("express-jwt"));
const environment_1 = __importDefault(require("../../../../config/environment"));
const admin_1 = __importDefault(require("../controllers/admin"));
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

router.get("/getUserById/:id", auth.required, admin_1.default.getUserById);
router.post("/createUser", auth.optional, admin_1.default.createUser);
router.post("/login", auth.optional, admin_1.default.login);
router.post("/current", auth.optional, admin_1.default.current);
router.post("/resetUserPassword", auth.required, admin_1.default.resetUserPassword);
exports.default = router;
