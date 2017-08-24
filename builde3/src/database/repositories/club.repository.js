'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _clubModel = require('../../models/club-model');

var _clubModel2 = _interopRequireDefault(_clubModel);

var _creditModel = require('../../models/credit-model');

var _creditModel2 = _interopRequireDefault(_creditModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    addClub: function addClub(club) {
        return _clubModel2.default.create(club);
    },
    findClubById: function findClubById(id) {
        return new Promise(function (resolve, reject) {
            _clubModel2.default.findOne({ id: id }, function (err, club) {
                if (err) reject(err);else resolve(club);
            });
        });
    },
    updateClub: function updateClub(clubId, clubUpdate) {
        return new Promise(function (resolve, reject) {
            _clubModel2.default.findOneAndUpdate({ id: clubId }, clubUpdate, { upsert: true, new: true }, function (err, obj) {
                if (err) {
                    console.log(" in Update Club");
                    reject(err);
                }
                resolve(obj);
            });
        });
    },
    findClubByObjectId: function findClubByObjectId(id) {
        return new Promise(function (resolve, reject) {
            _clubModel2.default.findOne({ _id: id }, function (err, club) {
                if (err) reject(err);else resolve(club);
            });
        });
    },
    getAllClubs: function getAllClubs() {
        return new Promise(function (resolve, reject) {
            _clubModel2.default.find({}, function (err, clubs) {
                if (err) reject(err);else resolve(clubs);
            });
        });
    },
    getAllCredits: function getAllCredits() {
        return new Promise(function (resolve, reject) {
            _creditModel2.default.find({}, function (err, credits) {
                if (err) reject(err);else resolve(credits);
            });
        });
    },
    removeCustomerByCustomerId: function removeCustomerByCustomerId(club, customerId) {
        return new Promise(function (resolve, reject) {
            var index = 0;
            var i = 0;
            club.usersClub.forEach(function (userClub) {
                if (customerId == userClub.customerId) {
                    index = i;
                }
                i++;
            });
            club.usersClub.splice(index, 1);

            _clubModel2.default.findOneAndUpdate({ id: club.id }, club, { upsert: true, new: true }, function (err, obj) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(obj);
            });
        });
    },
    addSale: function addSale(club, sale) {
        club.sales.push(sale);
        club.save();
    },
    findSale: function findSale(club, saleId) {
        return club.sales.find(function (sale) {
            return sale.id == saleId;
        });
    },
    removeSale: function removeSale(club, saleId) {
        var i = 0;
        var index = 0;
        club.sales.forEach(function (sale) {
            if (sale.id == saleId) {
                index = i;
            }
            i++;
        });
        club.sales.splice(index, 1);
        club.save();
    },
    addPointsToClub: function addPointsToClub(club, customerId, points) {
        club.usersClub.forEach(function (userClub) {
            if (customerId.equals(userClub.customerId)) {
                userClub.points = parseInt(userClub.Points) + parseInt(points);
            }
        });
        club.save();
    },
    RemovePointsFromClub: function RemovePointsFromClub(club, customerId, points) {
        club.usersClub.forEach(function (userClub) {
            if (customerId.equals(userClub.customerId)) {
                userClub.points = parseInt(userClub.points) - parseInt(points);
            }
        });
        club.save();
    },
    changeInfo: function changeInfo(clubId, itemIndex, newItem) {
        this.findClubById(clubId).then(function (club) {
            if (club) {
                club[itemIndex] = newItem;
                club.save();
            } else {
                console.log("club not found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    changeSaleInfo: function changeSaleInfo(clubId, saleId, itemIndex, newItem) {
        var _this = this;

        this.findClubById(clubId).then(function (club) {
            if (club) {
                var sale = _this.findSale(club, saleId);
                if (sale) {
                    sale[itemIndex] = newItem;
                    club.save();
                } else {
                    console.log("Sale wasnt found");
                }
            } else {
                console.log("Club not found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    addBranch: function addBranch(clubId, branchId) {
        var _this2 = this;

        this.findClubById(clubId).then(function (club) {
            if (club) {
                _this2.findClubById(branchId).then(function (branch) {
                    if (branch) {
                        if (club.branches.indexOf(branch._id) == -1) {
                            club.branches.push(branch._id);
                            club.save();
                        }
                    } else {
                        console.log("Branch wasnt found");
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            } else {
                console.log("Club wasnt found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    removeBranch: function removeBranch(clubId, branchId) {
        var _this3 = this;

        this.findClubById(clubId).then(function (club) {
            if (club) {
                _this3.findClubById(branchId).then(function (branch) {
                    if (branch) {
                        var index = club.branches.indexOf(branch._id);
                        club.branches.splice(index, 1);
                        club.save();
                    } else {
                        console.log("Branch wasnt found");
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            } else {
                console.log("Club wasnt found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    }
};
//# sourceMappingURL=club.repository.js.map
