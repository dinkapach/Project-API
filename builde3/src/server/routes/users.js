'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userModel = require('../.././models/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

var _creditModel = require('../.././models/credit-model');

var _creditModel2 = _interopRequireDefault(_creditModel);

var _customer = require('../.././database/repositories/customer.repository');

var _customer2 = _interopRequireDefault(_customer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET users listing. */
router.get('/:id', function (req, res, next) {

  var id = req.params.id;
  _customer2.default.findCustomerById(id).then(function (customer) {
    if (customer) {
      res.status(200).json(customer);
    } else {
      console.log("user not found");
      res.status(200).json({ customer: customer });
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).end();
  });
});

router.get('/testPassChange', function (req, res, next) {

  var pass = "1234567";
  var pass2 = "1234567";
  var pass3 = "123456";

  console.log(pass);
  // const id = 15;

  // CustomerRepository.findCustomerById(15)
  // .then(customer => {
  //   if(customer) {
  //     console.log("success" + customer);
  //     res.status(200).json(customer);
  //   }
  //   else { 
  //     console.log("user not found" + customer);
  //     res.status(400).json(false);
  //   }
  // })
  // .catch(err => { 
  //   console.log(err); 
  //   res.status(500).end();
  // });
});

router.post('/testDin', function (req, res, next) {
  console.log("hello world");
  res.status(200).json("customerUpdated");
});

// router.post('/changePassword', (req, res, next) => {
//   const currentPassword = req.body.currentPassword;
//   const newPassword = req.body.newPassword;
//   const customerId = req.body.customerId;
//   console.log("currentPassword: " + currentPassword + "newPassword: " + newPassword + "customerId" + customerId);

//   CustomerRepository.findCustomerById(customerId)
//   .then(customer => {
//     console.log(customer);
//     if(customer){
//       Crypto.isMatch(currentPassword, customer.password)
//       .then(match => {
//         console.log(match);
//           if(match) {
//             // CustomerRepository
//           } 
//           else { 
//             res.status(400).json("wrong password");
//             console.log("wrong password"); 
//           }
//       })
//       .catch(err => { 
//         console.log(err); 
//         res.status(500).json(err);
//       })
//     }
//     else {
//       res.status(400).json(customer);
//     }
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).end();
//  });
// });

router.post('/updateCustomerInfo', function (req, res, next) {
  var customerUpdate = req.body.customerUpdate;
  var customerId = req.body.customerId;
  console.log(customerId, customerUpdate);
  // res.status(200).json(true);
  _customer2.default.updateCustomer(customerId, customerUpdate).then(function (customerUpdated) {
    console.log("return from updateCustomer:\n" + customerUpdated);
    res.status(200).json(customerUpdated);
  }).catch(function (err) {
    console.log('Customer was not updated', err);
    res.status(500).json(false);
  });
});

// router.post('/singup', (req, res, next) => {
//   const customerUpdate = req.body.customerUpdate;
//   const customerId = req.body.customerId;
//   console.log(customerId, customerUpdate);
//   // res.status(200).json(true);
//   CustomerRepository.updateCustomer(customerId, customerUpdate)
//   .then(customerUpdated => {
//     console.log("return from updateCustomer:\n" + customerUpdated);
//     res.status(200).json(customerUpdated);
//   })
//   .catch(err => {
//     console.log('Customer was not updated', err);
//     res.status(500).json(false);
//   });
// });

router.post('/signup', function (req, res, next) {
  console.log("newCustomer");
  var newCustomer = req.body.customer;
  console.log(newCustomer);
  _customer2.default.addCustomer(newCustomer).then(function (customer) {
    console.log(customer);
    if (customer) {
      console.log("return customer\n" + customer);
      res.status(200).json(customer);
    } else {
      console.log("return fail customer\n" + customer);
      res.status(400).json(customer);
    }
  }).catch(function (err) {
    console.log("error create customer" + err);
    res.status(500).json(err);
  });
});

router.post('/editCredit', function (req, res, next) {
  var creditUpdate = req.body.creditUpdate;
  var customerId = req.body.customerId;
  console.log(customerId, creditUpdate);
  // res.status(200).json(true);
  _customer2.default.editCustomerCredit(customerId, creditUpdate).then(function (creditUpdated) {
    console.log("return from updateCustomer:\n" + creditUpdated);
    res.status(200).json(creditUpdated);
  }).catch(function (err) {
    console.log('Credit was not updated', err);
    res.status(500).json(false);
  });
});

router.post('/addCredit', function (req, res, next) {
  var userId = req.body.userId;
  var creditObj = req.body.credit;
  var credit = new _creditModel2.default();
  credit.id = creditObj.id;
  credit.clubId = creditObj.clubId;
  credit.dateOfPurchase = creditObj.dateOfPurchase;
  credit.dateOfExpired = creditObj.dateOfExpired;
  credit.items = creditObj.items;
  credit.totalCredit = creditObj.totalCredit;

  _customer2.default.addCustomerCredit(userId, credit).then(function (userUpdated) {
    console.log('credit was added');
    res.status(200).json(true);
  }).catch(function (err) {
    console.log('credit was not updated', err);
    res.status(500).json(false);
  });
});

router.post('/deleteCredit', function (req, res, next) {
  var userId = req.body.userId;
  var creditObj = req.body.credit;

  console.log("from server-deleteCredit - user id is: ", userId);

  _customer2.default.removeCreditOrReceipt(userId, creditObj.id, "credits").then(function (userUpdated) {
    console.log('credit was deleted');
    res.status(200).json({ isAuth: true, user: userUpdated });
  }).catch(function (err) {
    console.log('credit was not deleted', err);
    res.status(500).json(false);
  });
});

exports.default = router;
//# sourceMappingURL=users.js.map
