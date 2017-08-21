'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClubsApiSchema = exports.ClubSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userClubModel = require('./user-club-model');

var _saleModel = require('./sale-model');

var _clubModelSchemaValidations = require('./validations/club-model-schema-validations');

var _clubModelSchemaValidations2 = _interopRequireDefault(_clubModelSchemaValidations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ClubSchema = new Schema({
    id: Number,
    name: String,
    address: String,
    phoneNumber: String,
    img: String,
    openingHours: [Date, Date],
    usersClub: [_userClubModel.UserClubSchema],
    sales: [_saleModel.SaleSchema],
    branches: [_mongoose2.default.Schema.Types.ObjectId],
    isManual: Boolean
});

var ClubsApiSchema = new Schema({
    clubId: _mongoose2.default.Schema.Types.ObjectId,
    endpoint: String });

//const ClubModel = mongoose.model('Club', ClubSchema);
//const ClubsApiModel = mongoose.model('ClubsApi', ClubsApiSchema);

_clubModelSchemaValidations2.default.runClubModelValidations(ClubSchema);
exports.ClubSchema = ClubSchema;
exports.ClubsApiSchema = ClubsApiSchema;
exports.default = _mongoose2.default.model('Club', ClubSchema);

// export {
//     ClubSchema,
//     ClubsApiModel,
//     ClubModel
// }
//# sourceMappingURL=club-model.js.map
