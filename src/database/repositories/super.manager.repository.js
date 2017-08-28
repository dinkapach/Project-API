import mongoose from 'mongoose';
import SuperManagerModel from '../../models/super-manager-model';
import Crypto from '../../services/crypto.service';

export default {

    addSuperManager(customer) {
        return SuperManagerModel.create(customer);
    },
    updateSuperManager(customerId, customerUpdate) {
        return new Promise((resolve, reject) => {
            SuperManagerModel.findOneAndUpdate({ id : customerId }, customerUpdate, { upsert: true, new: true }, (err, obj) => {
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
            this.findSuperManagerById(customerId)
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
    removeCustomer(customer){
        customer.remove();
    },
    findCustomerById(customerId) {
        return new Promise((resolve, reject) => {
            SuperManagerModel.findOne({id : customerId})
            .then(customer => resolve(customer))
            .catch(err => reject(err));
        });
    },
     findCustomerByObjectId(id) {
        return new Promise((resolve, reject) => {
            SuperManagerModel.findOne({_id: id}, (err, customer) => {
                if (err) reject(err);
                else resolve(customer);
            });
        });
    },
    findCustomerByEmail(email) {
        return new Promise((resolve, reject) => {
            SuperManagerModel.findOne({email : email})
            .then(customer => resolve(customer))
            .catch(err => reject(err));
            });
        
    }
}
