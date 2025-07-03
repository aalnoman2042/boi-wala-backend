"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrorResponse = void 0;
const formatErrorResponse = (error) => {
    return {
        message: (error === null || error === void 0 ? void 0 : error.message) || 'Something went wrong',
        success: false,
        error: error,
    };
};
exports.formatErrorResponse = formatErrorResponse;
