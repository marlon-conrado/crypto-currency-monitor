"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_local_1 = require("../database.local");
const sequelize_1 = require("sequelize");
const preferred_currency_local_1 = require("./preferred-currency.local");
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        field: 'last_name',
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        field: 'user_name',
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    preferredCurrencyId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'preferred_currency_id',
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        field: 'updated_at',
        allowNull: false,
    },
}, { tableName: 'user', timestamps: true, sequelize: database_local_1.database });
UserModel.belongsTo(preferred_currency_local_1.PreferredCurrencyModel, {
    targetKey: 'id',
    foreignKey: 'preferred_currency_id',
    as: 'preferredCurrency',
});
preferred_currency_local_1.PreferredCurrencyModel.hasMany(UserModel, {
    sourceKey: 'id',
    foreignKey: 'preferred_currency_id',
    as: 'preferredCurrency',
});
//# sourceMappingURL=user.model.js.map