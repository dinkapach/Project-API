'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReceiptSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ReceiptSchema = new Schema({
    id: Number,
    clubID: Number,
    dateOfPurchase: Date,
    items: [String],
    totalCredit: Number
});

exports.ReceiptSchema = ReceiptSchema;
exports.default = _mongoose2.default.model('Receipt', ReceiptSchema);
//# sourceMappingURL=receipt-model.js.map
