"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
    static internal(message) {
        return new ApiError(500, message);
    }
    static unauthorized(message) {
        return new ApiError(401, message);
    }
    static forbidden(message) {
        return new ApiError(403, message);
    }
    static badRequest(message) {
        return new ApiError(404, message);
    }
}
exports.default = ApiError;
