'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserClubSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = require('./user-model');

var _userModel2 = _interopRequireDefault(_userModel);

var _clubModel = require('./club-model');

var _clubModel2 = _interopRequireDefault(_clubModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserClubSchema = new Schema({
    //id: Number,
    clubId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Club' },
    customerId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Customer' },
    points: Number
});

exports.UserClubSchema = UserClubSchema;
exports.default = _mongoose2.default.model('UserClub', UserClubSchema);
//# sourceMappingURL=user-club-model.js.map
