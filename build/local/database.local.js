"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const sequelize_1 = require("sequelize");
const common_1 = require("../common");
const sequelize = new sequelize_1.Sequelize(common_1.environment.db.name, common_1.environment.db.userName, common_1.environment.db.password, {
    host: common_1.environment.db.host,
    dialect: common_1.environment.db.dialect,
    port: common_1.environment.db.port,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
exports.database = sequelize;
//# sourceMappingURL=database.local.js.map