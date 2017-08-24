'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = require('../../models/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    addCustomer: function addCustomer(customer) {
        return _userModel2.default.create(customer);
        // customer.save(function(err, customer){
        //     if(err)
        //         return console.error(err);
        // });
    },
    updateCustomer: function updateCustomer(customerId, customerUpdate) {
        return new Promise(function (resolve, reject) {
            _userModel2.default.findOneAndUpdate({ id: customerId }, customerUpdate, { upsert: true, new: true }, function (err, obj) {
                if (err) {
                    console.log("Error in update customer");
                    reject(err);
                }
                resolve(obj);
            });
        });
    },
    changePassword: function changePassword(customerId, currentPassword, newPassword) {
        return new Promise(function (resolve, reject) {
            CustomerRepository.findCustomerById(customerId).then(function (customer) {
                /////////////////
                console.log(customer);
                if (customer) {
                    Crypto.isMatch(currentPassword, customer.password).then(function (match) {
                        console.log(match);
                        if (match) {
                            Crypto.encrypt(user.password).then(function (value) {
                                user.password = value;
                                // next();
                                user.save(function (err) {
                                    if (err) {
                                        console.log(err + "error saving pass");
                                        reject(err);
                                    } else {
                                        console.log("success saving pass");
                                        resolve(customer);
                                    }
                                });
                            });
                        } else {
                            console.log("wrong password");
                            reject(match);
                        }
                    });
                } else {
                    console.log(customer);
                    reject(customer);
                }
            })
            //////////////////
            .catch(function (err) {
                console.log(err);
                reject(err);
            });
        });
    },
    addCustomerCredit: function addCustomerCredit(customerId, credit) {
        var _this = this;

        return new Promise(function (resolve, reject) {
            console.log("in addCustomerCredit");
            _this.findCustomerById(customerId).then(function (customer) {
                if (customer) {
                    console.log(customer + "true");
                    customer.credits.push(credit);
                    customer.save(function (err) {
                        if (err) {
                            console.log(err + "error");
                            reject(err);
                        } else {
                            console.log("success");
                            resolve(customer);
                        }
                    });
                } else {
                    console.log(customer + "false");
                    reject(customer);
                }
            }).catch(function (err) {
                return reject(err);
            });
        });
    },
    editCustomerCredit: function editCustomerCredit(customerId, creditUpdate) {
        // return new Promise((resolve, reject) => {
        //     CustomerModel.findOneAndUpdate({ id : customerId }, creditUpdate, { upsert: true, new: true }, (err, obj) => {
        //     if (err){
        //         console.log(err);
        //         reject(err);
        //     }
        //     resolve(obj);
        //     });
        // });
        return new Promise(function (resolve, reject) {
            _userModel2.default.update({ id: customerId, 'credits._id': creditUpdate._id }, { $set: { "credits.$": creditUpdate } }).then(function (credit) {
                return resolve(credit);
            }).catch(function (err) {
                return reject(err);
            });
        });
    },
    removeCustomer: function removeCustomer(customer) {
        customer.remove();
    },
    findCustomerById: function findCustomerById(customerId) {
        // return new Promise((resolve, reject) => {
        //     CustomerModel.findOne({Id: id}, (err, customer) => {
        //         if (err) reject(err);
        //         else resolve(customer);
        //     });
        // });
        // console.log("id number: "+customerId);
        return new Promise(function (resolve, reject) {
            _userModel2.default.findOne({ id: customerId }).populate('clubs').then(function (customer) {
                return resolve(customer);
            }).catch(function (err) {
                return reject(err);
            });
        });
    },
    findCustomerByObjectId: function findCustomerByObjectId(id) {
        return new Promise(function (resolve, reject) {
            _userModel2.default.findOne({ _id: id }, function (err, customer) {
                if (err) reject(err);else resolve(customer);
            });
        });
    },
    findCustomerByEmail: function findCustomerByEmail(email) {
        // return new Promise((resolve, reject) => {
        //     CustomerModel.findOne({email: email}, (err, customer) => {
        //         if(err) reject(err);
        //         else resolve(customer);
        // });
        return new Promise(function (resolve, reject) {
            _userModel2.default.findOne({ email: email }).populate('clubs').then(function (customer) {
                return resolve(customer);
            }).catch(function (err) {
                return reject(err);
            });
        });
    },
    removeClubByClubId: function removeClubByClubId(customer, clubId) {
        return new Promise(function (resolve, reject) {
            customer.clubs = customer.clubs.filter(function (club) {
                return club.id != clubId;
            });
            _userModel2.default.findOneAndUpdate({ id: customer.id }, customer, { upsert: true, new: true }, function (err, obj) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(obj);
            });
        });
    },
    changePrivateInfo: function changePrivateInfo(custId, index, newItem) {
        this.findCustomerById(custId).then(function (customer) {
            if (customer) {
                customer[index] = newItem;
                customer.save();
            } else {
                console.log("Customer not found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    addCreditOrReceipt: function addCreditOrReceipt(customerId, item, prop) {
        var _this2 = this;

        this.findCustomerById(customerId).then(function (customer) {
            if (customer) {
                var exists = _this2.findCreditOrReceipt(customer, item.id, prop); //customer.Credits.find(isCreditExists => isCreditExists.Id == credit.Id);
                if (!exists) {
                    customer[prop].push(item);
                    customer.save();
                } else {
                    console.log("Credit is exists");
                }
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    removeCreditOrReceipt: function removeCreditOrReceipt(customerId, creditId, prop) {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
            _this3.findCustomerById(customerId).then(function (customer) {
                if (customer) {
                    console.log(customer + "true");
                    var index = _this3.getIndexOfCreditOrReceipt(customer, creditId, prop);
                    customer[prop].splice(index, 1);
                    customer.save(function (err) {
                        if (err) {
                            console.log(err + "error");
                            reject(err);
                        } else {
                            console.log("success");
                            resolve(customer);
                        }
                    });
                } else {
                    console.log(customer + "false");
                    reject(customer);
                }
            }).catch(function (err) {
                return reject(err);
            });
        });
    },
    findCreditOrReceipt: function findCreditOrReceipt(customer, creditId, prop) {
        return customer[prop].find(function (credit) {
            return credit.id == creditId;
        });
    },
    getIndexOfCreditOrReceipt: function getIndexOfCreditOrReceipt(customer, creditId, prop) {
        var index = 0;
        var i = 0;
        customer[prop].forEach(function (credit) {
            if (credit.id == creditId) index = i;
            i++;
        });
        return index;
    },
    changeCreditOrReceiptInfo: function changeCreditOrReceiptInfo(customerId, creditId, itemIndex, newItem, prop) {
        var _this4 = this;

        this.findCustomerById(customerId).then(function (customer) {
            if (customer) {
                var credit = _this4.findCreditOrReceipt(customer, creditId, prop);
                if (credit) {
                    credit[itemIndex] = newItem;
                    customer.save();
                } else {
                    console.log("Credit wasnt found");
                }
            } else {
                console.log("Customer not found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    addItemCreditOrReceipt: function addItemCreditOrReceipt(customerId, creditId, newItem, prop) {
        var _this5 = this;

        this.findCustomerById(customerId).then(function (customer) {
            if (customer) {
                var credit = _this5.findCreditOrReceipt(customer, creditId, prop);
                if (credit) {
                    credit.items.push(newItem);
                    customer.save();
                } else {
                    console.log("Credit wasnt found");
                }
            } else {
                console.log("Customer not found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    changeItemsCreditOrReceipt: function changeItemsCreditOrReceipt(customerId, creditId, newItem, oldItem, prop) {
        var _this6 = this;

        this.findCustomerById(customerId).then(function (customer) {
            if (customer) {
                var i = _this6.getIndexOfCreditOrReceipt(customer, creditId, prop);
                var credit = _this6.findCreditOrReceipt(customer, creditId, prop);
                if (credit != -1) {
                    var index = credit.items.indexOf(oldItem);
                    // customer.Credits[i].items[index] = newItem;
                    customer.Credits[i].items.splice(index, 1);
                    customer.Credits[i].items.push(newItem);
                    customer.save();
                } else {
                    console.log("Credit wasnt found");
                }
            } else {
                console.log("Customer not found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    removeItemsCreditOrReceipt: function removeItemsCreditOrReceipt(customerId, creditId, oldItem, prop) {
        var _this7 = this;

        this.findCustomerById(customerId).then(function (customer) {
            if (customer) {
                var i = _this7.getIndexOfCreditOrReceipt(customer, creditId, prop);
                var credit = _this7.findCreditOrReceipt(customer, creditId, prop);
                if (credit) {
                    var index = credit.items.indexOf(oldItem);
                    customer[prop][i].items.splice(index, 1);
                    customer.save();
                } else {
                    console.log("Credit wasnt found");
                }
            } else {
                console.log("Customer not found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    }
};
//# sourceMappingURL=customer.repository.js.map
