"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCryptoCurrencies = void 0;
const common_1 = require("../common");
common_1.app.get('/crypto_currency', getCryptoCurrencies);
async function getCryptoCurrencies(req, res) {
    return res.json('Hello!');
}
exports.getCryptoCurrencies = getCryptoCurrencies;
//# sourceMappingURL=crypto-currency.controller.js.map