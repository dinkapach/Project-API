import mongoose from 'mongoose';
import SuperManagerModel from '../../models/super-manager-model';
import ManagerModel from '../../models/manager-model';
import ClubModel from '../../models/club-model';
import Crypto from '../../services/crypto.service';
import ManagerRepository from '../.././database/repositories/manager.repository';

export default {
    addSuperManager(customer) {
        return SuperManagerModel.create(customer);
    },
    createManager(newManager){
        return ManagerModel.create(newManager);
    },
    createClub(newClub){
        return ClubModel.create(newClub);
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
    findSuperManagerByEmail(email) {
        return new Promise((resolve, reject) => {
            SuperManagerModel.findOne({email : email})
            .then(customer => resolve(customer))
            .catch(err => reject(err));
        });
    }
}