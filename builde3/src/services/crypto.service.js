'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    encrypt: function encrypt(dataToEncrypt) {
        return new Promise(function (resolve, reject) {
            _bcryptjs2.default.genSalt(10, function (err, salt) {
                if (err) reject(err);

                _bcryptjs2.default.hash(dataToEncrypt, salt, function (err, hash) {
                    if (err) reject(err);

                    resolve(hash);
                });
            });
        });
    },
    isMatch: function isMatch(toMatch, originData) {
        return new Promise(function (resolve, reject) {
            _bcryptjs2.default.compare(toMatch, originData, function (err, res) {
                if (err) reject(err);

                resolve(res);
            });
        });
    }
};
//# sourceMappingURL=crypto.service.js.map
