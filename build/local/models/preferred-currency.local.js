"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferredCurrencyModel = void 0;
const sequelize_1 = require("sequelize");
const database_local_1 = require("../database.local");
class PreferredCurrencyModel extends sequelize_1.Model {
}
exports.PreferredCurrencyModel = PreferredCurrencyModel;
PreferredCurrencyModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { tableName: 'preferred_currency', timestamps: false, sequelize: database_local_1.database });
//# sourceMappingURL=preferred-currency.local.js.map