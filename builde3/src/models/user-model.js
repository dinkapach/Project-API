'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CustomerSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require('../services/crypto.service');

var _crypto2 = _interopRequireDefault(_crypto);

var _clubModel = require('./club-model');

var _clubModel2 = _interopRequireDefault(_clubModel);

var _creditModel = require('./credit-model');

var _receiptModel = require('./receipt-model');

var _clubManuallyModel = require('./club-manually-model');

var _userSchemaValidations = require('./validations/user-schema-validations');

var _userSchemaValidations2 = _interopRequireDefault(_userSchemaValidations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CustomerSchema = new Schema({
    id: Number,
    userName: String,
    firstName: String,
    lastName: String,
    password: String,
    address: String,
    email: String,
    age: Number,
    phoneNumber: String,
    img: String,
    birthday: String,
    clubs: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Club' }],
    credits: [_creditModel.CreditSchema],
    receipts: [_receiptModel.ReceiptSchema],
    manuallyClubs: [_clubManuallyModel.ClubManuallySchema]
});

CustomerSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    _crypto2.default.encrypt(user.password).then(function (value) {
        user.password = value;
        next();
    });
});

CustomerSchema.index({ id: 1 });
_userSchemaValidations2.default.runCustomerValidations(CustomerSchema);

exports.CustomerSchema = CustomerSchema;
exports.default = _mongoose2.default.model('Customer', CustomerSchema);
//# sourceMappingURL=user-model.js.map
