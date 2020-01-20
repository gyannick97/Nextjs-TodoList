"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = require("../../../../utils/statusCodes");
exports.errorHandler = async (err, req, res, next) => {
    if (err.statusCode === statusCodes_1.NOT_FOUND) {
        return res.status(statusCodes_1.NOT_FOUND).send({ error: err.message });
    }
    else if (err.statusCode === statusCodes_1.BAD_REQUEST) {
        return res.status(statusCodes_1.BAD_REQUEST).send({ error: err.message });
    }
    if (err) {
        if (err.message) {
            return res.status(statusCodes_1.GENERIC_ERROR).send({ message: err.message });
        }
        else {
            return res
                .status(statusCodes_1.GENERIC_ERROR)
                .send({ error: "Something unexpected happened." });
        }
    }
    next();
};
