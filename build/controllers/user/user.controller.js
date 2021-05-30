"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = void 0;
const common_1 = require("../../common");
const services_1 = require("../../services");
const userService = common_1.container.resolve(services_1.UserService);
const createUserService = common_1.container.resolve(services_1.CreateUseService);
function getUser(req, res) {
    return res.json(userService.getHello());
}
exports.getUser = getUser;
function createUser(req, res) {
    return res.json(createUserService.createUser());
}
exports.createUser = createUser;
//# sourceMappingURL=user.controller.js.map