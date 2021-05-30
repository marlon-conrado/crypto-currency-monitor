"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
class ApplicationError extends Error {
    constructor(name) {
        super(name);
        this.name = name;
    }
}
exports.ApplicationError = ApplicationError;
//# sourceMappingURL=application.error.js.map