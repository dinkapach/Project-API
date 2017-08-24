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

var _customer = require('../.././database/repositories/customer.repository');

var _customer2 = _interopRequireDefault(_customer);

var _crypto = require('../.././services/crypto.service');

var _crypto2 = _interopRequireDefault(_crypto);

var _datetime = require('../.././helpers/datetime.functions');

var _datetime2 = _interopRequireDefault(_datetime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).json({ response: "OK!" });
});

router.post('/', function (req, res, next) {
  var password = req.body.password;
  var email = req.body.email;
  console.log("email: " + email + "pass: " + password);
  _customer2.default.findCustomerByEmail(email).then(function (customer) {
    console.log(customer);
    if (customer) {
      _crypto2.default.isMatch(password, customer.password).then(function (match) {
        console.log(match);
        if (match) {
          console.log("customer logged in");
          res.status(200).json(customer);
        } else {
          res.status(400).json("wrong password");
          console.log("wrong password");
        }
      }).catch(function (err) {
        console.log(err);
        res.status(500).json(err);
      });
    } else {
      res.status(400).json(customer);
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).end();
  });
});
exports.default = router;
//# sourceMappingURL=index.js.map
