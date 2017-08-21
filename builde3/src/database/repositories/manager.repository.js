'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _managerModel = require('../../models/manager-model');

var _managerModel2 = _interopRequireDefault(_managerModel);

var _club = require('./club.repository');

var _club2 = _interopRequireDefault(_club);

var _customer = require('./customer.repository');

var _customer2 = _interopRequireDefault(_customer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    addManager: function addManager(manager) {
        manager.save();
    },
    removeManager: function removeManager(manager) {
        manager.remove();
    },
    findManagerById: function findManagerById(id) {
        return new Promise(function (resolve, reject) {
            _managerModel2.default.findOne({ id: id }, function (err, manager) {
                if (err) reject(err);else resolve(manager);
            });
        });
    },
    findManagerByEmail: function findManagerByEmail(email) {
        return new Promise(function (resolve, reject) {
            _managerModel2.default.findOne({ email: email }, function (err, manager) {
                if (err) reject(err);else resolve(manager);
            });
        });
    },
    addClub: function addClub(manager, clubId) {
        manager.clubs.push(clubId);
        manager.save();
    },
    removeClubById: function removeClubById(manager, clubId) {
        var index;
        var i = 0;

        manager.clubs.forEach(function (id) {
            if (clubId == id) index = i;
            i++;
        }, this);

        manager.clubs.splice(index, 1);
        manager.save();
        //TODO : delete this club also
    },
    addSale: function addSale(clubId, sale) {
        return _club2.default.findClubById(clubId).then(function (club) {
            club.sales.push(sale);
            club.save();
        }).catch(function (err) {
            console.log(err);
        });
    },
    removeSale: function removeSale(clubId, sale) {
        return _club2.default.findClubById(clubId).then(function (club) {
            club.sales.pop(sale);
            club.save();
        }).catch(function (err) {
            console.log(err);
        });
    },
    addPointsToCustomerById: function addPointsToCustomerById(customerId, clubId, numOfPoints) {
        console.log(" KAKA");
        return _club2.default.findClubById(clubId).then(function (club) {
            if (club) {

                club.usersClub.forEach(function (userClub) {
                    _customer2.default.findCustomerById(customerId).then(function (customer) {
                        if (customer) {
                            if (customer._id.equals(userClub.customerId)) {
                                userClub.points = parseInt(userClub.points) + parseInt(numOfPoints);
                                console.log("points: ", userClub.points);
                                club.save();
                            }
                        } else {
                            Console.log("customer not found");
                        }
                    }).catch(function (err) {
                        console.log(err);
                    });
                });
            } else {
                console.log("no clubs");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    subscribePointsToCustomerById: function subscribePointsToCustomerById(customerId, club, numOfPoints) {

        _club2.default.findClubById(clubId).then(function (club) {
            club.UsersClub.findOne({ customerId: customerId }, function (err, customer) {

                if (err) {
                    console.log("CustomerId not found");
                } else {
                    customer.Points -= numOfPoints;
                    console.log("addsubscribei points to costumer!");
                }
            });
        }).catch(function (err) {
            console.log(err);
        });
    },
    addBranchToClub: function addBranchToClub(clubId, branchId) {
        _club2.default.findClubById(clubId).then(function (club) {
            club.branches.push(branchId);
            club.save();
        }).catch(function (err) {
            console.log(err);
        });
    },
    removeBranchFromClub: function removeBranchFromClub(clubId, branchId) {
        _club2.default.findClubById(clubId).then(function (club) {
            club.UsersClub.findOne({ ObjectId: branchId }, function (err, branch) {
                if (err) {
                    console.log("Branch doesn't exist");
                } else {
                    club.branches.pop(branch);
                    club.save();
                    console.log("branch removed");
                }
            });
        }).catch(function (err) {
            console.log(err);
        });
    }
};
//# sourceMappingURL=manager.repository.js.map
