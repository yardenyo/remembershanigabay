"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function notFoundHandler(request, response, next) {
    const status = 404;
    const success = false;
    const message = "Not Found";
    response.status(status).send({
        status,
        success,
        message,
    });
}
exports.default = notFoundHandler;
