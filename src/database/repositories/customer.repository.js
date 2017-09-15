import mongoose from 'mongoose';
import CustomerModel from '../../models/user-model';
import ClubModel from '../../models/club-model';
import Crypto from '../../services/crypto.service';
import ReceiptModel from '../../models/receipt-model'

export default {
    addCustomer(customer) {
        return CustomerModel.create(customer);
    },
    updateCustomer(customerId, customerUpdate) {
        return new Promise((resolve, reject) => {
            CustomerModel.findOneAndUpdate({ id: customerId }, customerUpdate, { upsert: true, new: true }, (err, obj) => {
                if (err) {
                    console.log("Error in update customer", err);
                    reject(err);
                }
                resolve(obj);
            });
        });
    },
    changePassword(customerId, currentPassword, newPassword) {
        return new Promise((resolve, reject) => {
            this.findCustomerById(customerId)
                .then(customer => {
                    if (customer) {
                        Crypto.isMatch(currentPassword, customer.password)
                            .then(match => {
                                if (match) {
                                    customer.password = newPassword;
                                    customer.save(function (err) {
                                        if (err) {
                                            console.log(err , "error saving pass");
                                            reject(err);
                                        }
                                        else {
                                            console.log("success saving pass");
                                            resolve(customer);
                                        }
                                    });
                                }
                                else {
                                    console.log("wrong password");
                                    reject(match);
                                }
                            })
                    }
                    else {
                        console.log(customer);
                        reject(customer);
                    }
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    addReceipt(receipt) {
        return ReceiptModel.create(receipt);
    },
    getAllCustomers() {
        return new Promise((resolve, reject) => {
            CustomerModel.find({}, (err, clubs) => {
                if (err) reject(err);
                else resolve(clubs);
            });
        });
    },
    getAllCustomerByClubId(clubId) {
        return new Promise((resolve, reject) => {
            ClubModel.findOne({ id: clubId })
                .populate('customerId')
                .then(customers => resolve(customers))
                .catch(err => reject(err));
        });
    },
    addCustomerCredit(customerId, credit) {
        return new Promise((resolve, reject) => {
            this.findCustomerById(customerId)
                .then(customer => {
                    if (customer) {
                        console.log(customer + "true");
                        customer.credits.push(credit);
                        customer.save(function (err) {
                            if (err) {
                                console.log(err + "error");
                                reject(err);
                            }
                            else {
                                console.log("success");
                                resolve(customer);
                            }
                        });
                    }
                    else {
                        console.log(customer + "false");
                        reject(customer);
                    }
                })
                .catch(err => reject(err));
        });
    },
    editCustomerCredit(customerId, creditUpdate) {
        return new Promise((resolve, reject) => {
            CustomerModel.update({ id: customerId, 'credits.id': creditUpdate.id },
                { $set: { "credits.$": creditUpdate } })
                .then(credit => resolve(credit))
                .catch(err => reject(err));
        });
    },
    removeCustomerFromDB(customerObjectId) {
        return new Promise((resolve, reject) => {
            CustomerModel.findOneAndRemove({ _id: customerObjectId })
                .exec(function (err, removed) {
                    ClubModel.update(
                        {},
                        // no _id it is array of objectId not object with _ids
                        { $pull: { usersClub: { customerId: customerObjectId } } },
                        { multi: true }, (err, obj) => {
                            if (err) {
                                console.log("Error in remove customer");
                                reject(err);
                            }
                            console.log("obj", obj, "removed", removed);
                            resolve(obj);
                        });
                })
        })
    },
    findCustomerById(customerId) {
        return new Promise((resolve, reject) => {
            CustomerModel.findOne({ id: customerId }).populate('clubs')
                .then(customer => resolve(customer))
                .catch(err => reject(err));
        });
    },
    findCustomerByObjectId(id) {
        return new Promise((resolve, reject) => {
            CustomerModel.findOne({ _id: id }, (err, customer) => {
                if (err) reject(err);
                else resolve(customer);
            });
        });
    },
    findCustomerByEmail(email) {
        return new Promise((resolve, reject) => {
            CustomerModel.findOne({ email: email }).populate('clubs')
                .then(customer => resolve(customer))
                .catch(err => reject(err));
        });

    }
}