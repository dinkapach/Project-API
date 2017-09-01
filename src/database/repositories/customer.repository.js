import mongoose from 'mongoose';
import CustomerModel from '../../models/user-model';
import ClubModel from '../../models/club-model';
import Crypto from '../../services/crypto.service';
import ReceiptModel from '../../models/receipt-model'

export default {

    addCustomer(customer) {
        return CustomerModel.create(customer);
        // customer.save(function(err, customer){
        //     if(err)
        //         return console.error(err);
        // });
    },
    updateCustomer(customerId, customerUpdate) {
        return new Promise((resolve, reject) => {
            CustomerModel.findOneAndUpdate({ id : customerId }, customerUpdate, { upsert: true, new: true }, (err, obj) => {
            if (err){
                console.log("Error in update customer");
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
              console.log(customer);
              if(customer){
                Crypto.isMatch(currentPassword, customer.password)
                .then(match => {
                  console.log("passwords match: "+match);
                    if(match) {
                        customer.password = newPassword;
                        customer.save(function(err){
                            if(err){
                                console.log(err + "error saving pass");
                                reject(err);
                            }
                            else{
                                console.log("success saving pass");
                                resolve(customer);
                            }
                        });
                    } 
                    else { 
                      console.log("wrong password"); 
                      reject(match);
                    }
                })}
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
    addReceipt(receipt){
        return ReceiptModel.create(receipt);
    },
    getAllCustomers() {
        return new Promise((resolve, reject) => {
            CustomerModel.find({}, (err, clubs) => {
                if(err) reject(err);
                else resolve(clubs);
            });
        });
    },
    getAllCustomerByClubId(clubId) {
        return new Promise((resolve, reject) => {
            ClubModel.findOne({id : clubId})
            .populate('cusfwfsftomerId')
            .then(customers => resolve(customers))
            .catch(err => reject(err));
            
        });        
    },
    deleteClubFromUsersByClubObjectId(clubObjectId) {
        

    },
    addCustomerCredit(customerId, credit) {
        return new Promise((resolve, reject) => {
            console.log("in addCustomerCredit");
            this.findCustomerById(customerId)
            .then(customer =>{
                if(customer){
                    console.log(customer + "true");
                    customer.credits.push(credit);
                    customer.save(function(err){
                        if(err){
                            console.log(err + "error");
                            reject(err);
                        }
                        else{
                            console.log("success");
                            resolve(customer);
                        }
                    });
                }
                else{
                    console.log(customer + "false");
                    reject(customer);
                }
            })
            .catch(err => reject(err));
        });
    },

    editCustomerCredit(customerId, creditUpdate) {
        // return new Promise((resolve, reject) => {
        //     CustomerModel.findOneAndUpdate({ id : customerId }, creditUpdate, { upsert: true, new: true }, (err, obj) => {
        //     if (err){
        //         console.log(err);
        //         reject(err);
        //     }
        //     resolve(obj);
        //     });
        // });
        return new Promise((resolve, reject) => {
            CustomerModel.update({id: customerId, 'credits._id': creditUpdate._id},
            {$set: { "credits.$": creditUpdate }})
            .then(credit => resolve(credit))
            .catch(err => reject(err));
        });
    },

    removeCustomerFromDB(customerObjectId){
    return new Promise((resolve, reject) => {
        CustomerModel.findOneAndRemove({ _id : customerObjectId })
        .exec(function(err, removed) {
            ClubModel.update(
                { },
                // no _id it is array of objectId not object with _ids
                { $pull: {usersClub : {customerId: customerObjectId} }},
                { multi: true }, (err, obj) => {
                if (err){
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
            CustomerModel.findOne({id : customerId}).populate('clubs')
            .then(customer => resolve(customer))
            .catch(err => reject(err));
        });
    },

    //  findIdByCustomerId(customerId) {
    //     return new Promise((resolve, reject) => {
    //         CustomerModel.findOne({id : customerId}).populate('clubs')
    //         .then(customer => resolve(customer._id))
    //         .catch(err => reject(err));
    //     });
    // },
     findCustomerByObjectId(id) {
        return new Promise((resolve, reject) => {
            CustomerModel.findOne({_id: id}, (err, customer) => {
                if (err) reject(err);
                else resolve(customer);
            });
        });
    },
    findCustomerByEmail(email) {
        // return new Promise((resolve, reject) => {
        //     CustomerModel.findOne({email: email}, (err, customer) => {
        //         if(err) reject(err);
        //         else resolve(customer);
            // });
        return new Promise((resolve, reject) => {
            CustomerModel.findOne({email : email}).populate('clubs')
            .then(customer => resolve(customer))
            .catch(err => reject(err));
            });
        
    },
    // removeClubByClubId(customer, clubId){
    //     console.log(clubId);

    //     return new Promise((resolve, reject) => {
    //         customer.clubs = customer.clubs.filter(club =>{
    //             return club.id != clubId;
    //         })
    //         CustomerModel.findOneAndUpdate({ id : customer.id }, customer, { upsert: true, new: true }, (err, obj) => {
    //             if (err){
    //                 console.log(err);
    //                 reject(err);
    //             }
    //             resolve(obj);
    //             });
    //         });
            
    // },
    changePrivateInfo(custId, index, newItem)
    {
        this.findCustomerById(custId)
        .then(customer => {
            if(customer)
            {
                customer[index] = newItem;
                customer.save();
            }
            else { console.log("Customer not found"); }
        })
        .catch(err => { console.log(err); });
     },
     addCreditOrReceipt(customerId, item, prop)
     {
         this.findCustomerById(customerId)
         .then(customer => {
             if(customer)
             {
                let exists = this.findCreditOrReceipt(customer, item.id, prop); //customer.Credits.find(isCreditExists => isCreditExists.Id == credit.Id);
                if(!exists)
                {
                    customer[prop].push(item);
                    customer.save();
                }
                else { console.log("Credit is exists"); }
             }
         })
         .catch(err => { console.log(err); });
     },


     removeCreditOrReceipt(customerId, creditId, prop)
     {
        return new Promise((resolve, reject) => {
            this.findCustomerById(customerId)
            .then(customer =>{
                if(customer){
                    console.log(customer + "true");
                    let index = this.getIndexOfCreditOrReceipt(customer, creditId, prop)
					customer[prop].splice(index, 1);
					customer.save(function(err){
                        if(err){
                            console.log(err + "error");
                            reject(err);
                        }
                        else{
                            console.log("success");
                            resolve(customer);
                        }
                    });
                }
                else{
                    console.log(customer + "false");
                    reject(customer);
                }
            })
            .catch(err => reject(err));
        });
     },
     findCreditOrReceipt(customer, creditId, prop)
     {
        return customer[prop].find(credit => credit.id == creditId);
     },
   
     getIndexOfCreditOrReceipt(customer, creditId, prop)
     {
        let index =0;
        let i = 0;
        customer[prop].forEach(function(credit) {
            if(credit.id == creditId)
                index = i;
            i++;
        });
        return index;
     },
    
     changeCreditOrReceiptInfo(customerId, creditId, itemIndex, newItem, prop)
     {
        this.findCustomerById(customerId)
        .then(customer => {
            if(customer)
            {
                let credit = this.findCreditOrReceipt(customer, creditId, prop)
                if(credit){
                    credit[itemIndex] = newItem;
                    customer.save();
                }
                else{
                    console.log("Credit wasnt found");
                }

            }
            else { console.log("Customer not found"); }
        })
        .catch(err => { console.log(err); });
     },
    addItemCreditOrReceipt(customerId, creditId, newItem, prop)
     {
        this.findCustomerById(customerId)
        .then(customer => {
            if(customer)
            {
                let credit = this.findCreditOrReceipt(customer, creditId, prop)
                if(credit){
                    credit.items.push(newItem);
                    customer.save();
                }
                else{
                    console.log("Credit wasnt found");
                }

            }
            else { console.log("Customer not found"); }
        })
        .catch(err => { console.log(err); });
     },
     changeItemsCreditOrReceipt(customerId, creditId, newItem, oldItem, prop)
     {
        this.findCustomerById(customerId)
        .then(customer => {
            if(customer)
            {
                let i = this.getIndexOfCreditOrReceipt(customer, creditId, prop);
                let credit = this.findCreditOrReceipt(customer, creditId, prop)
                if(credit != -1){
                    let index = credit.items.indexOf(oldItem);
                    // customer.Credits[i].items[index] = newItem;
                    customer.Credits[i].items.splice(index, 1);
                    customer.Credits[i].items.push(newItem);
                    customer.save();
                }
                else { console.log("Credit wasnt found"); }
            }
            else { console.log("Customer not found"); }
        })
        .catch(err => { console.log(err); });
     },
     removeItemsCreditOrReceipt(customerId, creditId, oldItem, prop)
     {
        this.findCustomerById(customerId)
        .then(customer => {
            if(customer)
            {
                let i = this.getIndexOfCreditOrReceipt(customer, creditId, prop);
                let credit = this.findCreditOrReceipt(customer, creditId, prop)
                if(credit){
                    let index = credit.items.indexOf(oldItem);
                    customer[prop][i].items.splice(index, 1);
                    customer.save();
                }
                else{ console.log("Credit wasnt found"); }
            }
            else { console.log("Customer not found"); }
        })
        .catch(err => { console.log(err); });
     }
}
