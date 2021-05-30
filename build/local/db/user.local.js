"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLocal = void 0;
const common_1 = require("../../common");
const models_1 = require("../models");
let UserLocal = class UserLocal {
    async create(user) {
        return await new models_1.UserModel(user).save();
    }
    async getByUserName(userName) {
        return await models_1.UserModel.findOne({
            where: { userName },
            raw: true,
        });
    }
};
UserLocal = __decorate([
    common_1.injectable()
], UserLocal);
exports.UserLocal = UserLocal;
//# sourceMappingURL=user.local.js.map