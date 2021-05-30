"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = void 0;
const common_1 = require("../common");
const services_1 = require("../services");
const signInUserService = common_1.container.resolve(services_1.SignInUserService);
const signUpUserService = common_1.container.resolve(services_1.SignUpUserService);
const apiResponse = common_1.container.resolve(common_1.ApiResponse);
common_1.app.post('/login', getUser);
async function getUser(req, res) {
    try {
        await signInUserService.login(req.body);
        return apiResponse.Created(res);
    }
    catch (error) {
        return apiResponse.BadRequest(res, error);
    }
}
exports.getUser = getUser;
common_1.app.post('/register', createUser);
async function createUser(req, res) {
    try {
        const { lastName, name, userName, password, preferredCurrency: preferredCurrencyId, } = req.body;
        const data = await signUpUserService.signUp({
            name,
            lastName,
            userName,
            password,
            preferredCurrencyId,
        });
        return apiResponse.Created(res, { id: data.id, userName: data.userName });
    }
    catch (error) {
        return apiResponse.BadRequest(res, error);
    }
}
exports.createUser = createUser;
//# sourceMappingURL=user.controller.js.map