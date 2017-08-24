'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _managerModel = require('../.././models/manager-model');

var _managerModel2 = _interopRequireDefault(_managerModel);

var _manager = require('../.././database/repositories/manager.repository');

var _manager2 = _interopRequireDefault(_manager);

var _saleModel = require('../.././models/sale-model');

var _saleModel2 = _interopRequireDefault(_saleModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res, next) {
  res.status(200).json({ response: "OK!" });
});

router.post('/addSale', function (req, res, next) {
  var clubId = req.body.clubId;
  var saleObj = req.body.sale;
  console.log(saleObj);
  console.log(saleObj.points);
  var sale = new _saleModel2.default({
    "id": saleObj.id,
    "name": saleObj.name,
    "img": saleObj.img,
    "description": saleObj.description,
    "points": saleObj.points,
    "price": saleObj.price
  });

  _manager2.default.addSale(clubId, sale).then(function (saleUpdated) {
    console.log("blue");
    res.status(200).json(true);
  }).catch(function (err) {
    console.log('User was not updated', err);
    res.status(500).json(false);
  });
});

router.post('/addPointsToCustomerById', function (req, res, next) {
  console.log("7777777777777777777");
  var customerId = req.body.customerId;
  var clubId = req.body.clubId;
  var numOfPoints = req.body.numOfPoints;

  _manager2.default.addPointsToCustomerById(customerId, clubId, numOfPoints).then(function (pointsUpdated) {
    console.log("blue");
    res.status(200).json(true);
  }).catch(function (err) {
    console.log('User was not updated', err);
    res.status(500).json(false);
  });
});
exports.default = router;
//# sourceMappingURL=manager.js.map
