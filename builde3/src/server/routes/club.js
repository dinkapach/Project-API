'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = require('../.././models/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

var _userClubModel = require('../.././models/user-club-model');

var _userClubModel2 = _interopRequireDefault(_userClubModel);

var _customer = require('../.././database/repositories/customer.repository');

var _customer2 = _interopRequireDefault(_customer);

var _club = require('../.././database/repositories/club.repository');

var _club2 = _interopRequireDefault(_club);

var _userClub = require('../.././database/repositories/userClub.repository');

var _userClub2 = _interopRequireDefault(_userClub);

var _clubModel = require('../.././models/club-model');

var _clubModel2 = _interopRequireDefault(_clubModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res, next) {
    _club2.default.getAllClubs().then(function (clubs) {
        if (clubs) {
            res.status(200).json(clubs);
        } else {
            console.log("club.js: no clubs ");
            res.status(200).json(clubs);
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).json(clubs);
    });
});

router.post('/deleteCustomer', function (req, res, next) {
    var club = req.body.club;
    var customer = req.body.user;

    console.log("in club- deleteCustomer ");
    console.log(club);

    _customer2.default.removeClubByClubId(customer, club.id).then(function (customerUpdated) {
        _club2.default.removeCustomerByCustomerId(club, customer._id).then(function (clubUpdated) {
            res.status(200).json(true);
        }).catch(function (err) {
            console.log('Club was not updated', err);
            res.status(500).json(false);
        });
    }).catch(function (err) {
        console.log('Customer was not updated', err);
        res.status(500).json(false);
    });
});

router.get('/user/:id', function (req, res, next) {
    var id = req.params.id;

    _customer2.default.findCustomerById(id).then(function (customer) {
        _clubModel2.default.find({ _id: { $in: customer.clubs } }).then(function (clubs) {
            res.status(200).json({ clubs: clubs });
        });
    });
});

router.get('/credits', function (req, res, next) {
    _club2.default.getAllCredits().then(function (clubs) {
        if (clubs) {
            console.log("From server: clubs/credit...");
            res.status(200).json(clubs);
        } else {
            console.log("club.js: no credits ");
            res.status(200).json(clubs);
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).json(clubs);
    });
});

router.post('/addManualClub', function (req, res, next) {
    var customer = req.body.user;
    var clubObj = req.body.club;

    var club = new _clubModel2.default();
    club.id = clubObj.id;
    club.img = clubObj.img;
    club.name = clubObj.name;
    club.address = clubObj.address;
    club.phoneNumber = clubObj.phoneNumber;
    club.openingHours = clubObj.openingHours;
    club.usersClub = clubObj.usersClub;
    club.sales = clubObj.sales;
    club.branches = clubObj.branches;
    club.isManual = clubObj.isManual;

    console.log("From server..addManualClub ");

    _club2.default.addClub(club).then(function (clubRes) {
        customer.clubs.push(clubRes);
        _customer2.default.updateCustomer(customer.id, customer).then(function (customerUpdated) {
            console.log("return from updateCustomer");
            var userClub = new _userClubModel2.default();
            userClub.clubId = clubRes._id;
            userClub.customerId = customer._id;
            userClub.points = 0;
            _userClub2.default.addUserClub(userClub);
            clubRes.usersClub.push(userClub);
            _club2.default.updateClub(clubRes.id, clubRes);

            res.status(200).json({
                isUpdated: true,
                customer: customerUpdated,
                club: clubRes
            });
        }).catch(function (err) {
            console.log('Customer was not updated', err);
            res.status(500).json({ isUpdated: false });
        });
    }).catch(function (err) {
        console.log('Club was not updated', err);
        res.status(500).json({ isUpdated: false });
    });
});

router.post('/addToCustomer', function (req, res, next) {
    var club = req.body.club;
    var customer = req.body.user;
    var userClub = new _userClubModel2.default();

    userClub.clubId = club._id;
    userClub.customerId = customer._id;
    userClub.points = 0;

    _customer2.default.updateCustomer(customer.id, customer).then(function (customerUpdated) {
        console.log("return from updateCustomer:\n" + customerUpdated);
        _userClub2.default.addUserClub(userClub);
        club.usersClub.push(userClub);
        _club2.default.updateClub(club.id, club);

        res.status(200).json(true);
    }).catch(function (err) {
        console.log('Customer was not updated', err);
        res.status(500).json(false);
    });
});

exports.default = router;
//# sourceMappingURL=club.js.map
