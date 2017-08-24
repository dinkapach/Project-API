'use strict';

var _readlineSync = require('readline-sync');

var _readlineSync2 = _interopRequireDefault(_readlineSync);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = require('./models/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

var _clubModel = require('./models/club-model');

var _clubModel2 = _interopRequireDefault(_clubModel);

var _userClubModel = require('./models/user-club-model');

var _userClubModel2 = _interopRequireDefault(_userClubModel);

var _managerModel = require('./models/manager-model');

var _managerModel2 = _interopRequireDefault(_managerModel);

var _saleModel = require('./models/sale-model');

var _saleModel2 = _interopRequireDefault(_saleModel);

var _creditModel = require('./models/credit-model');

var _creditModel2 = _interopRequireDefault(_creditModel);

var _receiptModel = require('./models/receipt-model');

var _receiptModel2 = _interopRequireDefault(_receiptModel);

var _datetime = require('./helpers/datetime.functions');

var _datetime2 = _interopRequireDefault(_datetime);

var _customer = require('./database/repositories/customer.repository');

var _customer2 = _interopRequireDefault(_customer);

var _club = require('./database/repositories/club.repository');

var _club2 = _interopRequireDefault(_club);

var _userClub = require('./database/repositories/userClub.repository');

var _userClub2 = _interopRequireDefault(_userClub);

var _manager = require('./database/repositories/manager.repository');

var _manager2 = _interopRequireDefault(_manager);

var _crypto = require('./services/crypto.service');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://localhost:27017/project', { config: { autoIndex: false } });
//mongoose.connect('mongodb://localhost:27017/project/clubs', { config: { autoIndex: false } });
//mongoose.connect('mongodb://localhost:27017/project/userclubs', { config: { autoIndex: false } });

/////////////////////////////SIGN UP/////////////////////////////////////////

// const id = readlineSync.question('Please enter your ID Number: ');
// const firstName = readlineSync.question('Please enter your first name: ');
// const lastName = readlineSync.question('Please enter your last name: ');
// const password = readlineSync.question('Please enter your password: ');
// const address = readlineSync.question('Please enter your address: ');
// const email = readlineSync.question('Please enter your email: ');
// const phone = readlineSync.question('Please enter your phone number: ');
// const birthDay = readlineSync.question('Please enter your birthday date (dd/MM/yyyy): ');

// const customer = new Customer({
//     Id: id,
//     UserName: email,
//     FirstName: firstName,
//     LastName: lastName,
//     Password: password,
//     Address: address,
//     Email: email,
//     Age: dateTimeFunctions.calculateAge(birthDay),
//     PhoneNumber: phone,
//     Img : "",
//     BirthDay: birthDay,
//     Clubs: [],
//     Credits: [],
//     Receipts: []
// });

// CustomerRepository.addCustomer(customer);

/////////////////////////////////// END SIGNUP /////////////////////////////////////////

//////////////////////////////// LOGIN //////////////////////////////////////////////

// const email = readlineSync.question('Please enter your email: ');
// const password = readlineSync.question('Please enter your password: ');

// CustomerRepository.findCustomerByEmail(email)
// .then(customer => {
//     Crypto.isMatch(password, customer.Password)
//     .then(match => {
//         if(match) {
//             console.log("customer logged in");
//         } 
//         else {
//             console.log("wrong password");
//         }
//     })
//     .catch(err => {
//         console.log(err);
//     })
// })

// .catch(err => {
//     console.log("customer wasnt found");
// });


////////////////////////////////////// END LOGIN ///////////////////////////////////////////


////////////////////////////////// ADD CLUB BY USER /////////////////////////////////////////

// // // TODO : search clubs by name, present them and then use can choose the right one
// const userId = readlineSync.question('Please enter your id: ');
// const clubId = readlineSync.question('Please enter club id to add: ');


// // TODO: do we need to it in trans??
// // need to add this club to manager, need the club to be refernce??
// CustomerRepository.findCustomerById(userId)
// .then(customer => {
//     if(customer){
//         ClubRepository.findClubById(clubId)
//         .then(club => {
//             if(club)
//             {
//                 const userClub = new UserClub({
//                     CustomerId: customer._id,
//                     Points: 0
//                 });
//                 UserClubRepository.addUserClub(userClub);
//                 club.UsersClub.push(userClub);
//                 club.save();
//                 customer.Clubs.push(club._id);
//                 customer.save();
//             }
//             else { console.log("cant find club");  }
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }
//     else  {  console.log("cant find customer"); }
// })
// .catch(err => {
//     console.log(err);
// });

///////////////////////////////// END ADD CLUB BY USER //////////////////////////////////////////

///////////////////////////////// REMOVE CLUB BY USER ///////////////////////////////////////////

// const userId = readlineSync.question('Please enter your id: ');
// const clubId = readlineSync.question('Please enter club id to remove: ');

// CustomerRepository.findCustomerById(userId)
// .then(customer => {
//     ClubRepository.findClubById(clubId)
//     .then(club => {
//         CustomerRepository.removeClubById(customer, club._id);
//         ClubRepository.removeCustomerById(club, customer._id);
//     })
//     .catch(err => {
//         console.log(err);
//     })
// })
// .catch(err => {
//     console.log(err);
// });

///////////////////////////////// END REMOVE CLUB BY USER //////////////////////////////////////


//////////////////////////////////// SHOW CLUBS /////////////////////////////////////////////////

// const id = readlineSync.question('Please enter yuor ID Number: ');

// CustomerRepository.findCustomerById(id)
// .then(customer => {
// customer.Clubs.forEach(function(clubId) {
//         ClubRepository.findClubByObjectId(clubId)
//         .then(club => {
//             console.log(club.Name);
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }, this);
// })
// .catch(err => {
//     console.log(err);
// });

/////////////////////////////////// END SHOW CLUBS //////////////////////////////////////////////


//////////////////////////////// SHOW CUSTOMERS FOR MANAGER ////////////////////////////////////

// const clubId = readlineSync.question('Please enter club id: ');

// ClubRepository.findClubById(clubId)
// .then(club => {
//     club.UsersClub.forEach(function(userClub) {
//         CustomerRepository.findCustomerByObjectId(userClub.CustomerId)
//         .then(customer => {
//             console.log(customer.FirstName);
//         })
//         .catch(err => {
//             console.log(err);
//         })      
//     }, this);
// })
// .catch(err => {
//     console.log(err);
// });

/////////////////////////////// END SHOW CUSTOMERS FOR MANAGER ////////////////////////////////


///////////////////////////////////// ADD CLUBS BY MANAGER /////////////////////////////////////

// const ManagerId = readlineSync.question('Please enter manager ID Number: ');
// const id = readlineSync.question('Please enter club ID Number: ');

// ClubRepository.findClubById(id)
// .then(club => {
//     if(!club)
//     {
//         const name = readlineSync.question('Please enter club name: ');
//         const address = readlineSync.question('Please enter club address: ');
//         const phone = readlineSync.question('Please enter club phone number: ');
//         const openHours = readlineSync.question('Please enter from hour: ');
//         const closeHours = readlineSync.question('Please enter till hour: ');

//         const club = new Club({
//             Id: id,
//             Name: name,
//             Address: address,
//             PhoneNumber: phone,
//             Img : "",
//             OpeningHours: [dateTimeFunctions.calculateOpeningHours(openHours), dateTimeFunctions.calculateOpeningHours(closeHours)],
//             UsersClub: [],
//             Sales: [], 
//             Branches:[] 
//         });

//         ClubRepository.addClub(club);
//         ManagerRepository.findManagerById(ManagerId)
//         .then(manager => {
//             ManagerRepository.addClub(manager, club._id);
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }
//     else
//     {
//         ManagerRepository.findManagerById(ManagerId)
//         .then(manager => {
//             ManagerRepository.addClub(manager, club._id);
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }
// })
// .catch(err => {
//     console.log(err);
// });

///////////////////////////////////// END ADD CLUBS BY MANAGER /////////////////////////////////


///////////////////////////// MANAGER SIGN UP/////////////////////////////////////////

// const id = readlineSync.question('Please enter your ID Number: ');
// const firstName = readlineSync.question('Please enter your first name: ');
// const lastName = readlineSync.question('Please enter your last name: ');
// const password = readlineSync.question('Please enter your password: ');
// const email = readlineSync.question('Please enter your email: ');

// const manager = new Manager({
//     Id: id,
//     UserName: email,
//     FirstName: firstName,
//     LastName: lastName,
//     Password: password,
//     Email: email,
//     Clubs: [],
// });

// ManagerRepository.addManager(manager);

///////////////////////////////////END MANAGER SIGNUP//////////////////////////////////////////

////////////////////////////////// REMOVE CLUB BY MANAGER ////////////////////////////////////

// const managerId = readlineSync.question('Please enter your id: ');
// const clubId = readlineSync.question('Please enter club id to remove: ');

// ManagerRepository.findManagerById(managerId)
// .then(manager => {
//     ClubRepository.findClubById(clubId)
//     .then(club => {
//         ManagerRepository.removeClubById(manager, club._id);
//         //club.remove();  // do we need to delete the club from db?
//     })
//     .catch(err => {
//         console.log(err);
//     })
// })
// .catch(err => {
//     console.log(err);
// });

///////////////////////////////// END REMOVE CLUB BY MANAGER ////////////////////////////////


//////////////////////////////// MANAGER ADD POINTS TO CUSTOMER ////////////////////////////

// const clubId = readlineSync.question('Please enter club id: ');
// const customerId = readlineSync.question('Please enter customer id: ');
// const points = readlineSync.question('Please enter points number to add: ');

//     CustomerRepository.findCustomerById(customerId)
//     .then(customer => {
//          ClubRepository.findClubById(clubId)
//         .then(club => {
//             ClubRepository.addPointsToClub(club, customer._id, points);
//         })
//         .catch(err => { console.log(err); });
//     })
//     .catch (err => { console.log(err); });

/////////////////////////////// END MANAGER ADD POINTS TO CUSTOMER ////////////////////////


////////////////////////////// MANAGER REMOVE POOINTS ////////////////////////////////////


// const clubId = readlineSync.question('Please enter club id: ');
// const customerId = readlineSync.question('Please enter customer id: ');
// const points = readlineSync.question('Please enter points number to remove: ');

//     CustomerRepository.findCustomerById(customerId)
//     .then(customer => {
//          ClubRepository.findClubById(clubId)
//         .then(club => {
//             ClubRepository.RemovePointsFromClub(club, customer._id, points);
//         })
//         .catch(err => { console.log(err); });
//     })
//     .catch (err => { console.log(err); });

///////////////////////////// END MANAGER REMOVE POINTS /////////////////////////////////


////////////////////////////// MANAGER ADD SALES /////////////////////////////////////////

// const clubId = readlineSync.question('Please enter club id: ');
// const description = readlineSync.question('Please enter description: ');
// const points = readlineSync.question('Please enter points number to add: ');
// const price = readlineSync.question('Please enter price: ');
// const saleId = readlineSync.question('Please enter sale id: ');
// const saleName = readlineSync.question('Please enter sale name: ');

// const sale = new Sale({
//     Id: saleId,
//     Name: saleName,
//     Img: "",
//     Description: description,
//     Points: points,
//     Price: price
// });

// ClubRepository.findClubById(clubId)
// .then(club => {
//     ClubRepository.addSale(club, sale);
// })
// .catch(err => { console.log(err); });


///////////////////////////// END MANAGER ADD SALES /////////////////////////////////////


//////////////////////////// MANAGER REMOVE SALE ///////////////////////////////////////

// const clubId = readlineSync.question('Please enter club id: ');
// const saleId = readlineSync.question('Please enter sale id: ');

// ClubRepository.findClubById(clubId)
// .then(club => {
//        ClubRepository.removeSale(club, saleId);
// })
// .catch(err => { console.log(err); });


/////////////////////////// END MANAGER REMOVE SALE ///////////////////////////////////


/////////////////////////// USER CHANGE ID ///////////////////////////////////////////

// const oldId = readlineSync.question('Please enter old id: ');
// const newId = readlineSync.question('Please enter new id: ');

// CustomerRepository.changePrivateInfo(oldId, 'Id', newId);

////////////////////////// END USER CHANGE ID ///////////////////////////////////////

/////////////////////////// USER CHANGE NAME ////////////////////////////////////////

// const customerId = readlineSync.question('Please enter id: ');
// const newName = readlineSync.question('Please enter new name: ');

// CustomerRepository.changePrivateInfo(customerId, 'FirstName', newName);

////////////////////////// END USER CHANGE NAME /////////////////////////////////////

/////////////////////////// USER CHANGE LAST NAME ///////////////////////////////////////////

// const customerId = readlineSync.question('Please enter id: ');
// const newLastName = readlineSync.question('Please enter new last name: ');

// CustomerRepository.changePrivateInfo(customerId, 'LastName', newLastName);

////////////////////////// END USER CHANGE LAST NAME ///////////////////////////////////////

/////////////////////////// USER CHANGE ADDRESS ///////////////////////////////////////////

// const customerId = readlineSync.question('Please enter id: ');
// const newAddress = readlineSync.question('Please enter new address: ');

// CustomerRepository.changePrivateInfo(customerId, 'Address', newAddress);

////////////////////////// END USER CHANGE ADDRESS ////////////////////////////////////////


/////////////////////////// USER CHANGE PHONE NUMBER //////////////////////////////////////

// const customerId = readlineSync.question('Please enter id: ');
// const newPhoneNumber = readlineSync.question('Please enter new phone number: ');

// CustomerRepository.changePrivateInfo(customerId, 'PhoneNumber', newPhoneNumber);

////////////////////////// END USER CHANGE PHONE NUMBER ///////////////////////////////////


/////////////////////////// USER CHANGE EMAIL /////////////////////////////////////////////

// const customerId = readlineSync.question('Please enter id: ');
// const newEmail = readlineSync.question('Please enter new email: ');

// CustomerRepository.findCustomerById(customerId)
// .then(customer => {
//     if(customer)
//     {
//         customer.Email = newEmail;
//         customer.UserName = newEmail;
//         customer.save();
//     }
//     else
//     {
//         console.log("Customer not found");
//     }

// })
// .catch(err => { console.log(err); });

////////////////////////// END USER CHANGE EMAIL ////////////////////////////////////////

/////////////////////////// USER CHANGE BIRTHDAY //////////////////////////////////////////

// const customerId = readlineSync.question('Please enter id: ');
// const newBirthDay = readlineSync.question('Please enter new birthday date (dd/MM/yyyy): ');

// CustomerRepository.findCustomerById(customerId)
// .then(customer => {
//     if(customer)
//     {
//        customer.Age = dateTimeFunctions.calculateAge(newBirthDay);
//        customer.BirthDay = newBirthDay;
//        customer.save();
//     }
//     else
//     {
//         console.log("Customer not found");
//     }

// })
// .catch(err => { console.log(err); });

////////////////////////// END USER CHANGE BIRTHDAY /////////////////////////////////////


/////////////////////////// USER CHANGE PASSWORD ////////////////////////////////////////

// const customerId = readlineSync.question('Please enter id: ');
// const oldPassword = readlineSync.question('Please enter old password: ');
// const newPassword = readlineSync.question('Please enter new password: ');

// CustomerRepository.findCustomerById(customerId)
// .then(customer => {
//     if(customer)
//     {
//         Crypto.isMatch(oldPassword, customer.Password)
//         .then(match => {
//             if(match) 
//             {
//                 customer.Password = newPassword;
//                 customer.save();
//             }
//             else { console.log("wrong password"); }
//         });
//     }
//     else { console.log("Customer not found"); }

// })
// .catch(err => { console.log(err); });

////////////////////////// END USER CHANGE PASSWORD ///////////////////////////////////


///////////////////////// CLUB CHANGE NAME /////////////////////////////////////////// 

// const clubId = readlineSync.question('Please enter id: ');
// const newName = readlineSync.question('Please enter new name: ');

// CustomerRepository.changePrivateInfo(clubId, 'Name', newName);

//////////////////////// END CLUB CHANGE NAME //////////////////////////////////////

///////////////////////// CLUB CHANGE ADDRESS /////////////////////////////////////////// 

// const clubId = readlineSync.question('Please enter id: ');
// const newAddress = readlineSync.question('Please enter new address: ');

// CustomerRepository.changePrivateInfo(clubId, 'Address', newAddress);

//////////////////////// END CLUB CHANGE ADDRESS //////////////////////////////////////

///////////////////////// CLUB CHANGE ADDRESS /////////////////////////////////////////// 

// const clubId = readlineSync.question('Please enter id: ');
// const newPhoneNumber = readlineSync.question('Please enter new phone number: ');

// CustomerRepository.changePrivateInfo(clubId, 'PhoneNumber', newPhoneNumber);

//////////////////////// END CLUB CHANGE ADDRESS //////////////////////////////////////

///////////////////////// CLUB CHANGE OPENING HOURS /////////////////////////////////////////// 

// const clubId = readlineSync.question('Please enter id: ');
// const newOpeningHours = readlineSync.question('Please enter new opening huors: ');
// const newClosingHours = readlineSync.question('Please enter new closing huors: ');

// ClubRepository.changeInfo(clubId, 'OpeningHours', 
//     [dateTimeFunctions.calculateOpeningHours(newOpeningHours), dateTimeFunctions.calculateOpeningHours(newClosingHours)]);

//////////////////////// END CLUB CHANGE OPENING HOURS //////////////////////////////////////

/////////////////////// CLUB CHANGE SALE NAME //////////////////////////////////////////////

// const clubId = readlineSync.question('Please enter club id: ');
// const saleId = readlineSync.question('Please enter sale id: ');
// const newName = readlineSync.question('Please enter new name: ');

// ClubRepository.changeSaleInfo(clubId, saleId, 'Name', newName);

///////////////////// END CLUB CHANGE SALE NAME ///////////////////////////////////////////

/////////////////////// CLUB CHANGE SALE DESCRIPTION //////////////////////////////////////

// const clubId = readlineSync.question('Please enter club id: ');
// const saleId = readlineSync.question('Please enter sale id: ');
// const newDescription = readlineSync.question('Please enter new description: ');

// ClubRepository.changeSaleInfo(clubId, saleId, 'Description', newDescription);

///////////////////// END CLUB CHANGE SALE DESCRIPTION ///////////////////////////////////

/////////////////////// CLUB CHANGE SALE PRICE //////////////////////////////////////////

// const clubId = readlineSync.question('Please enter club id: ');
// const saleId = readlineSync.question('Please enter sale id: ');
// const newPrice = readlineSync.question('Please enter new price: ');

// ClubRepository.changeSaleInfo(clubId, saleId, 'Price', newPrice);

///////////////////// END CLUB CHANGE SALE PRICE //////////////////////////////////////

/////////////////////// CLUB CHANGE SALE POINTS //////////////////////////////////////

// const clubId = readlineSync.question('Please enter club id: ');
// const saleId = readlineSync.question('Please enter sale id: ');
// const newPoints = readlineSync.question('Please enter new points: ');

// ClubRepository.changeSaleInfo(clubId, saleId, 'Points', newPoints);

///////////////////// END CLUB CHANGE SALE POINTS ///////////////////////////////////

/////////////////// CLUB ADD BRANCH ////////////////////////////////////////////////

// const clubId = readlineSync.question('Please enter club id: ');
// const branchId = readlineSync.question('Please enter branch id: ');

// ClubRepository.addBranch(clubId, branchId);

///////////////// END CLUB ADD BRANCH //////////////////////////////////////////

///////////////////// CLUB REMOVE BRANCH //////////////////////////////////////

// const clubId = readlineSync.question('Please enter club id: ');
// const branchId = readlineSync.question('Please enter branch id: ');

// ClubRepository.removeBranch(clubId, branchId);

/////////////////// END REMOVE BRANCH  /////////////////////////////////////////


//////////////// CUSTOMER ADD CREDIT /////////////////////////////////////////

// const customerId = readlineSync.question('Please enter your id: ');
// const creditId = readlineSync.question('Please enter credit id: ');
// const dateOfPurchase = readlineSync.question('Please enter date of purchase (dd/MM/yyyy): ');
// const dateOfExpired = readlineSync.question('Please enter date of expired (dd/MM/yyyy): ');
// const items = readlineSync.question('Please enter items: ');
// const totalCredit = readlineSync.question('Please enter total credit: ');

// const credit = new Credit({
//     Id: creditId,
//     DateOfPurchase: dateTimeFunctions.changeDateFortmat(dateOfPurchase),
//     DateOfExpired: dateTimeFunctions.changeDateFortmat(dateOfExpired),
//     Items: items.split(','),
//     TotalCredit: totalCredit
// });

// CustomerRepository.addCreditOrReceipt(customerId, credit, "Credits");

/////////////// END CUSTOMER ADD CREDIT //////////////////////////////////////////////////

////////////////// CUSTOMER REMOVE CREDIT /////////////////////////////////////////////////

// const customerId = readlineSync.question('Please enter your id: ');
// const creditId = readlineSync.question('Please enter credit id: ');

// CustomerRepository.removeCreditOrReceipt(customerId, creditId, "Credits" );

///////////////// END CUSTOMER REMOVE CREDIT ////////////////////////////////////////////

/////////////////////// CUSTOMER CHANGE CREDIT DATE PURCHASE ///////////////////////////

// const customerId = readlineSync.question('Please enter customer id: ');
// const creditId = readlineSync.question('Please enter credit id: ');
// const newDateOfPurchase = readlineSync.question('Please enter new date of purchase (dd/MM/yyyy): ');

// let newForamatDateOfPurchase = dateTimeFunctions.changeDateFortmat(newDateOfPurchase);

// CustomerRepository.changeCreditOrReceiptInfo(customerId, creditId, 'DateOfPurchase', newForamatDateOfPurchase, "Credits" );

///////////////////// END CUSTOMER CHANGE CREDIT DATE PURCHASE //////////////////////////

/////////////////////// CUSTOMER CHANGE CREDIT DATE EXPIRED ///////////////////////////

// const customerId = readlineSync.question('Please enter customer id: ');
// const creditId = readlineSync.question('Please enter credit id: ');
// const newDateOfExpired = readlineSync.question('Please enter new date of expired (dd/MM/yyyy): ');

// let newForamatDateOfExpired = dateTimeFunctions.changeDateFortmat(newDateOfExpired);

// CustomerRepository.changeCreditOrReceiptInfo(customerId, creditId, 'DateOfExpired', newForamatDateOfExpired, "Credits" );

///////////////////// END CUSTOMER CHANGE CREDIT DATE EXPIRED ///////////////////////////

/////////////////////// CUSTOMER CHANGE CREDIT TOTAL CREDIT ///////////////////////////

// const customerId = readlineSync.question('Please enter customer id: ');
// const creditId = readlineSync.question('Please enter credit id: ');
// const newTotalCredit = readlineSync.question('Please enter new total credit: ');

// CustomerRepository.changeCreditOrReceiptInfo(customerId, creditId, 'TotalCredit', newTotalCredit, "Credits" );

///////////////////// END CUSTOMER CHANGE CREDIT TOTAL CREDIT ///////////////////////////

/////////////////////// CUSTOMER ADD CREDIT ITEM ///////////////////////////

// const customerId = readlineSync.question('Please enter customer id: ');
// const creditId = readlineSync.question('Please enter credit id: ');
// const newItem = readlineSync.question('Please enter new item: ');

// CustomerRepository.addItemCreditOrReceipt(customerId, creditId, newItem, "Credits");

///////////////////// END CUSTOMER ADD CREDIT ITEM ///////////////////////////

/////////////////////// CUSTOMER CHANGE CREDIT ITEM ///////////////////////////

// const customerId = readlineSync.question('Please enter customer id: ');
// const creditId = readlineSync.question('Please enter credit id: ');
// const oldItem = readlineSync.question('Please enter old item: ');
// const newItem = readlineSync.question('Please enter new item: ');

// CustomerRepository.changeItemsCreditOrReceipt(customerId, creditId, newItem, oldItem, "Credits");

///////////////////// END CUSTOMER CHANGE CREDIT ITEM ///////////////////////////

/////////////////////// CUSTOMER CREDIT REMOVE ITEM ///////////////////////////

// const customerId = readlineSync.question('Please enter customer id: ');
// const creditId = readlineSync.question('Please enter credit id: ');
// const oldItem = readlineSync.question('Please enter old item: ');

// CustomerRepository.removeItemsCreditOrReceipt(customerId, creditId, oldItem, "Credits");

///////////////////// END CUSTOMER CREDIT REMOVE ITEM ///////////////////////////


//////////////// CUSTOMER ADD RECEIPT /////////////////////////////////////////

// const customerId = readlineSync.question('Please enter your id: ');
// const receiptId = readlineSync.question('Please enter receipt id: ');
// const dateOfPurchase = readlineSync.question('Please enter date of purchase (dd/MM/yyyy): ');
// const items = readlineSync.question('Please enter items: ');
// const totalReceipt = readlineSync.question('Please enter total credit: ');

// const receipt = new Receipt({
//     Id: receiptId,
//     DateOfPurchase: dateTimeFunctions.changeDateFortmat(dateOfPurchase),
//     Items: items.split(','),
//     TotalCredit: totalReceipt
// });

// console.log(receipt);
// CustomerRepository.addCreditOrReceipt(customerId, receipt, "Receipts");

/////////////// END CUSTOMER ADD RECEIPT //////////////////////////////////////////////////

////////////////// CUSTOMER REMOVE RECEIPT /////////////////////////////////////////////////

// const customerId = readlineSync.question('Please enter your id: ');
// const receiptId = readlineSync.question('Please enter receipt id: ');

// CustomerRepository.removeCreditOrReceipt(customerId, receiptId, "Receipts");

///////////////// END CUSTOMER REMOVE RECEIPT ////////////////////////////////////////////


/////////////////////// CUSTOMER CHANGE RECEIPT DATE PURCHASE ///////////////////////////

// const customerId = readlineSync.question('Please enter customer id: ');
// const receiptId = readlineSync.question('Please enter receipt id: ');
// const newDateOfPurchase = readlineSync.question('Please enter new date of purchase (dd/MM/yyyy): ');

// let newForamatDateOfPurchase = dateTimeFunctions.changeDateFortmat(newDateOfPurchase);

// CustomerRepository.changeCreditOrReceiptInfo(customerId, receiptId, 'DateOfPurchase', newForamatDateOfPurchase, "Receipts" );

///////////////////// END CUSTOMER CHANGE RECEIPT DATE PURCHASE //////////////////////////


// ///////////////////// CUSTOMER CHANGE RECEIPT TOTAL CREDIT  ///////////////////////////

// const customerId = readlineSync.question('Please enter customer id: ');
// const recepitId = readlineSync.question('Please enter recepit id: ');
// const newTotalCredit = readlineSync.question('Please enter new total credit: ');

// CustomerRepository.changeCreditOrReceiptInfo(customerId, recepitId, 'TotalCredit', newTotalCredit, "Receipts" );

// /////////////////// END CUSTOMER CHANGE RECEIPT TOTAL CREDIT ///////////////////////////

// ///////////////////// CUSTOMER ADD RECEIPT ITEM ///////////////////////////

// const customerId = readlineSync.question('Please enter customer id: ');
// const recepitId = readlineSync.question('Please enter recepit id: ');
// const newItem = readlineSync.question('Please enter new item: ');

// CustomerRepository.addItemCreditOrReceipt(customerId, recepitId, newItem, "Receipts");

// /////////////////// END CUSTOMER ADD RECEIPT ITEM ///////////////////////////

// ///////////////////// CUSTOMER CHANGE RECEIPT ITEM ///////////////////////////

// const customerId = readlineSync.question('Please enter customer id: ');
// const recepitId = readlineSync.question('Please enter recepit id: ');
// const oldItem = readlineSync.question('Please enter old item: ');
// const newItem = readlineSync.question('Please enter new item: ');

// CustomerRepository.changeItemsCreditOrReceipt(customerId, recepitId, newItem, oldItem, "Receipts");

// /////////////////// END CUSTOMER CHANGE RECEIPT ITEM ///////////////////////////

// ///////////////////// CUSTOMER RECEIPT REMOVE ITEM ///////////////////////////

// const customerId = readlineSync.question('Please enter customer id: ');
// const receiptId = readlineSync.question('Please enter recepit id: ');
// const oldItem = readlineSync.question('Please enter old item: ');

// CustomerRepository.removeItemsCreditOrReceipt(customerId, receiptId, oldItem, "Receipts");

// /////////////////// END CUSTOMER RECEIPT REMOVE ITEM ///////////////////////////
//# sourceMappingURL=index.js.map
