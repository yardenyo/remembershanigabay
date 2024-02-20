"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const success = error.success || false;
    const message = error.message || "Something went wrong";
    const errors = error.errors || [];
    response.status(status).send(Object.assign({ status,
        success,
        message }, (errors.length > 0 && { errors })));
}
exports.default = errorMiddleware;
