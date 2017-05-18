import mongoose from 'mongoose';
import CustomerModel from '../../models/user-model';

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
                console.log(err);
                reject(err);
            }
            resolve(obj);
            });
        });
    },

    removeCustomer(customer){
        customer.remove();
    },

    findCustomerById(id) {
        // return new Promise((resolve, reject) => {
        //     CustomerModel.findOne({Id: id}, (err, customer) => {
        //         if (err) reject(err);
        //         else resolve(customer);
        //     });
        // });
        return new Promise((resolve, reject) => {
            CustomerModel.findOne({id : id}).populate('clubs')
            .then(customer => resolve(customer))
            .catch(err => reject(err));
        });
    },
     findCustomerByObjectId(id) {
        return new Promise((resolve, reject) => {
            CustomerModel.findOne({_id: id}, (err, customer) => {
                if (err) reject(err);
                else resolve(customer);
            });
        });
    },
    findCustomerByEmail(email) {
        return new Promise((resolve, reject) => {
            CustomerModel.findOne({email: email}, (err, customer) => {
                if(err) reject(err);
                else resolve(customer);
            });
        });
    },
    removeClubById(customer, clubId){
        var index;
        var i =0;
        index = customer.clubs.indexOf(clubId);
        customer.Clubs.splice(index, 1);
        customer.save();
    },
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
         this.findCustomerById(customerId)
         .then(customer => {
             if(customer)
             {
                let index = this.getIndexOfCreditOrReceipt(customer, creditId, prop)
                customer[prop].splice(index, 1);
                customer.save();
             }
             else { console.log("Customer wasnt found"); }
         })
         .catch(err => { console.log(err); });
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
