"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashPasswordLocal = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const common_1 = require("../common");
let HashPasswordLocal = class HashPasswordLocal {
    async hash(password) {
        const salt = await this.genSalt();
        return new Promise((resolve, reject) => {
            bcrypt_1.default.hash(password, salt, (error, hash) => {
                if (error) {
                    return reject(error);
                }
                return resolve(hash);
            });
        });
    }
    compare(password, hash) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.compare(password, hash, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
        });
    }
    genSalt() {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.genSalt(common_1.environment.saltRounds, (error, salt) => {
                if (error) {
                    return reject(error);
                }
                return resolve(salt);
            });
        });
    }
};
HashPasswordLocal = __decorate([
    common_1.injectable()
], HashPasswordLocal);
exports.HashPasswordLocal = HashPasswordLocal;
//# sourceMappingURL=hash-password.local.js.map