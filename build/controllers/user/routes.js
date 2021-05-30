"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const user_controller_1 = require("./user.controller");
common_1.app.get('/user', user_controller_1.getUser);
common_1.app.post('/user', user_controller_1.createUser);
//# sourceMappingURL=routes.js.map