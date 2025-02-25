"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handler(err, req, res, next) {
    if (res.headersSent) {
        return next(err); // Skip the response if headers are already sent
    }
    res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
}
exports.default = handler;
