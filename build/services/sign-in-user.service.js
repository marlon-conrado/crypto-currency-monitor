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
exports.SignInUserService = void 0;
const common_1 = require("../common");
const repositories_1 = require("../repositories");
const errors_1 = require("../errors");
let SignInUserService = class SignInUserService {
    constructor(userRepository, passwordRepository) {
        this.userRepository = userRepository;
        this.passwordRepository = passwordRepository;
    }
    async login(user) {
        const userFound = await this.userRepository.getByUserName(user.userName);
        if (!userFound) {
            throw new errors_1.ApplicationError(errors_1.ApplicationErrors.UserNotFound);
        }
        const matchPassword = await this.passwordRepository.compare(user.password, userFound.password);
        if (!matchPassword) {
            throw new errors_1.ApplicationError(errors_1.ApplicationErrors.LoginDoesNotMatch);
        }
        return matchPassword;
    }
};
SignInUserService = __decorate([
    common_1.injectable(),
    __metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.PasswordRepository])
], SignInUserService);
exports.SignInUserService = SignInUserService;
//# sourceMappingURL=sign-in-user.service.js.map