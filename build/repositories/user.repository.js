"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("../common");
const local_1 = require("../local");
let UserRepository = class UserRepository {
    constructor(userLocal, hashPasswordLocal) {
        this.userLocal = userLocal;
        this.hashPasswordLocal = hashPasswordLocal;
    }
    async create(user) {
        const password = await this.hashPasswordLocal.hash(user.password);
        return await this.userLocal.create(Object.assign(Object.assign({}, user), { password: password }));
    }
    async getByUserName(userName) {
        return await this.userLocal.getByUserName(userName);
    }
};
UserRepository = __decorate([
    common_1.injectable(),
    __metadata("design:paramtypes", [local_1.UserLocal,
        local_1.HashPasswordLocal])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map