"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.success = false;
        this.message = message;
        this.errors = errors;
    }
}
exports.default = HttpException;
