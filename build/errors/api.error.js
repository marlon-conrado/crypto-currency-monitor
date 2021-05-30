"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const common_1 = require("../common");
const errors_1 = require("./errors");
let ApiError = class ApiError {
    BadRequest(res, error) {
        const exception = common_1.environment.isDevelopment ? error : {};
        if (error === null || error === void 0 ? void 0 : error.name) {
            return res.status(400).json({ error: errors_1.Errors[error.name], exception });
        }
        return res.status(400).json({ error: errors_1.Errors.InternalError, exception });
    }
};
ApiError = __decorate([
    common_1.injectable()
], ApiError);
exports.ApiError = ApiError;
//# sourceMappingURL=api.error.js.map