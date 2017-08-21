'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userClubModel = require('../../models/user-club-model');

var _userClubModel2 = _interopRequireDefault(_userClubModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    addUserClub: function addUserClub(userClub) {
        return _userClubModel2.default.create(userClub);
    },
    updateUserClub: function updateUserClub(userClubId, userClubUpdated) {
        return new Promise(function (resolve, reject) {
            _userClubModel2.default.findOneAndUpdate({ id: userClubId }, userClubUpdated, { upsert: true, new: true }, function (err, obj) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(obj);
            });
        });
    }
};
//# sourceMappingURL=userClub.repository.js.map
