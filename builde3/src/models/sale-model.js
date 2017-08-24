'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SaleSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var SaleSchema = new Schema({
    id: Number,
    name: String,
    img: String,
    description: String,
    points: Number,
    price: Number
});

exports.SaleSchema = SaleSchema;
exports.default = _mongoose2.default.model('Sale', SaleSchema);
//# sourceMappingURL=sale-model.js.map
