'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClubManuallySchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ClubManuallySchema = new Schema({
    id: Number,
    name: String,
    address: String,
    phoneNumber: String,
    img: String,
    points: Number
});

exports.ClubManuallySchema = ClubManuallySchema;
exports.default = _mongoose2.default.model('ClubManually', ClubManuallySchema);
//# sourceMappingURL=club-manually-model.js.map
