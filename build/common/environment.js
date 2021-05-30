"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.environment = {
    port: process.env.PORT || 8080,
    db: {
        dialect: process.env.DB_DIALECT || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        name: process.env.DB_NAME || 'dbname',
        userName: process.env.DB_USER_NAME || 'username',
        password: process.env.DB_PASS || '123',
        port: 5432,
    },
    isDevelopment: process.env.NODE_ENV === 'development',
    saltRounds: 10,
};
//# sourceMappingURL=environment.js.map