'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CreditSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CreditSchema = new Schema({
    id: Number,
    clubId: Number,
    dateOfPurchase: Date,
    dateOfExpired: Date,
    items: [String],
    totalCredit: Number
});

exports.CreditSchema = CreditSchema;
exports.default = _mongoose2.default.model('Credit', CreditSchema);
//# sourceMappingURL=credit-model.js.map
