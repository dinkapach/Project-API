'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ManagerSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require('../services/crypto.service');

var _crypto2 = _interopRequireDefault(_crypto);

var _clubModel = require('./club-model');

var _clubModel2 = _interopRequireDefault(_clubModel);

var _managerSchemaValidations = require('./validations/manager-schema-validations');

var _managerSchemaValidations2 = _interopRequireDefault(_managerSchemaValidations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ManagerSchema = new Schema({
    id: Number,
    userName: String,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    clubId: Number,
    permissions: String
});

ManagerSchema.pre('save', function (next) {
    var manager = this;

    _crypto2.default.encrypt(manager.password).then(function (value) {
        manager.password = value;
        next();
    });
});

_managerSchemaValidations2.default.runManagerValidations(ManagerSchema);

exports.ManagerSchema = ManagerSchema;
exports.default = _mongoose2.default.model('Manager', ManagerSchema);
//# sourceMappingURL=manager-model.js.map
