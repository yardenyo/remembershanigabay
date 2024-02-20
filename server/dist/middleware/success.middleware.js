"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SuccessResponse {
    constructor(message, data) {
        this.status = 200;
        this.success = true;
        this.message = message || "Success";
        if (data) {
            this.data = data;
        }
    }
}
exports.default = SuccessResponse;
