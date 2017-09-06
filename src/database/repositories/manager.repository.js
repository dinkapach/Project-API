import ManagerModel from '../../models/manager-model';
import ClubModel from '../../models/club-model';
import CustomerModel from '../../models/user-model';
import ClubRepository from '../.././database/repositories/club.repository';
import CustomerRepository from '../.././database/repositories/customer.repository';
import Crypto from '../../services/crypto.service';

export default {
    addManager(manager) {
        return ManagerModel.create(manager);
       // manager.save();
    },
    removeManager(managerId) {
        return new Promise((resolve, reject) => {
            ManagerModel.findOneAndRemove({ id: managerId }, (err, obj) => {
                if (err) {
                    console.log("Error in remove manager");
                    reject(err);
                }
                resolve(obj);
            });
        });
    },
    findManagerById(id) {
        console.log("searching manager id: " + id);
        return new Promise((resolve, reject) => {
            ManagerModel.findOne({ id: id }, (err, manager) => {
                if (err) reject(err);
                else resolve(manager);
            });
        });
    },
    findManagerByEmail(email) {
        return new Promise((resolve, reject) => {
            ManagerModel.findOne({ email: email })
                // .populate('clubId')
                // .populate('clubId.usersClub.customerId'
                // , 'id firstName lastName email address phoneNumber birthday')
                .then(manager => resolve(manager))
                .catch(err => reject(err));
        });
    },
    updateManager(managerId, managerUpdate) {
        return new Promise((resolve, reject) => {
            ManagerModel.findOneAndUpdate({ id: managerId }, managerUpdate, { upsert: true, new: true }, (err, obj) => {
                if (err) {
                    console.log("Error in update manager");
                    reject(err);
                }
                resolve(obj);
            });
        });
    },
    getAllManagers() {
        return new Promise((resolve, reject) => {
            ManagerModel.find({}, (err, clubs) => {
                if (err) reject(err);
                else resolve(clubs);
            });
        });
    },
    removeClubFromUaerClubsByClubId(customer, clubId) {
        return new Promise((resolve, reject) => {
            customer.clubs = customer.clubs.filter(club => {
                return club.id != clubId;
            })
            CustomerModel.findOneAndUpdate({ id: customer.id }, customer, { upsert: true, new: true }, (err, obj) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(obj);
            });
        });

    },
    addClub(manager, clubId) {
        manager.clubs.push(clubId);
        manager.save();
    },
    removeClubById(manager, clubId) {
        var index;
        var i = 0;

        manager.clubs.forEach(function (id) {
            if (clubId == id)
                index = i;
            i++;
        }, this);

        manager.clubs.splice(index, 1);
        manager.save();
        //TODO : delete this club also
    },
    addSale(clubId, sale) {
        return ClubRepository.findClubById(clubId)
            .then(club => {
                console.log('manager repository add sale ');
                club.sales.push(sale);
                club.save();
            })
            .catch(err => {
                console.log(err);
            })
    },
    removeSale(clubId, sale) {
        return ClubModel.findClubById(clubId)
            .then(club => {
                club.sales.pop(sale);
                club.save();
            })
            .catch(err => {
                console.log(err);
            })
    },

    editClubSale(clubId, saleUpdate) {
        return new Promise((resolve, reject) => {
            ClubModel.update({ id: clubId, 'sales.id': saleUpdate.id },
                { $set: { "sales.$": saleUpdate } })
                .then(sale => resolve(sale))
                .catch(err => reject(err));
        });
    },
    findClub(customer, clubId, prop) {
        return customer[prop].find(club => club.id == clubId);
    },
    getIndexOfClub(customer, clubId, prop) {
        let index = 0;
        let i = 0;
        customer[prop].forEach(function (club) {
            if (club.id == clubId)
                index = i;
            i++;
        });
        return index;
    },
    findCustomerById(customerId) {

        return new Promise((resolve, reject) => {
            CustomerModel.findOne({ id: customerId }).populate('clubs')
                .then(customer => resolve(customer))
                .catch(err => reject(err));
        });
    },

    removeClubByClubId(customerId, clubId, prop) {
        this.findCustomerById(customerId)
            .then(customer => {
                if (customer) {
                    let i = this.getIndexOfClub(customer, clubId, prop);
                    let club = this.findClub(customer, clubId, prop)
                    if (club) {
                        let index = club.items.indexOf(oldItem);
                        customer[prop][i].items.splice(index, 1);
                        customer.save();
                    }
                    else { console.log("customer repository - remove club by clubid - club wasnt found"); }
                }
                else { console.log("customer repository - remove club by clubid  -Customer not found"); }
            })
            .catch(err => { console.log(err); });
    },

    subscribePointsToCustomerById(customerId, clubObjId, numOfPoints) {
        return new Promise((resolve, reject) => {
            ClubRepository.findClubByObjectId(clubObjId)
                .then(club => {
                    let newPoints;
                    club.usersClub.forEach(userClub => {
                        if (userClub.customerId.equals(customerId)) {
                            userClub.points = parseInt(userClub.points) - parseInt(numOfPoints);
                            newPoints = userClub.points;
                            if (userClub.points < 0) {
                                userClub.points = 0;
                                newPoints = 0;
                            }
                        }
                    })
                    //return ClubRepository.updateClub(club.id, club)
                    ClubRepository.updateClub(club.id, club)
                        .then(updatedClub => {
                            resolve(newPoints);
                        })
                        .catch(err => reject(err))
                })
                .catch(err => {
                    resolve(err);
                })
        })
    },
    addPointsToCustomerById(customerId, clubObjId, numOfPoints) {
        return new Promise((resolve, reject) => {
            ClubRepository.findClubByObjectId(clubObjId)
                .then(club => {
                    console.log("find club")
                    let newPoints;
                    club.usersClub.forEach(userClub => {
                        console.log(userClub.customerId.equals(customerId));
                        console.log(userClub.customerId, customerId)
                        if (userClub.customerId.equals(customerId)) {
                            userClub.points = parseInt(userClub.points) + parseInt(numOfPoints);
                            newPoints = userClub.points;
                        }
                    })
                    //return ClubRepository.updateClub(club.id, club)
                    ClubRepository.updateClub(club.id, club)
                        .then(updatedClub => {
                            resolve(newPoints);
                        })
                        .catch(err => reject(err))
                })
                .catch(err => {
                    resolve(err);
                })
        })
    },
    addBranchToClub(clubId, branchId) {
        ClubModel.findClubById(clubId)
            .then(club => {
                club.branches.push(branchId);
                club.save();
            })
            .catch(err => {
                console.log(err);
            })
    },
    findCustomerDetalisById(customerId) {
        return new Promise((resolve, reject) => {
            CustomerModel.find({ _id: customerId })
                .populate('customer')
                .then(customer => resolve(customer))
                .catch(err => reject(err));
        });
    },
    findCustomers(clubId) {
        return new Promise((resolve, reject) => {
            console.log("clubId: in repo: " + clubId);
            ClubModel.findOne({ id: clubId })
                // .populate({path: 'usersClub', model: 'Customer', })
                .populate('usersClub.customerId'
                , 'id firstName lastName email address phoneNumber birthday img')
                .then(customer => resolve(customer))
                .catch(err => reject(err));
        });
    },
    removeBranchFromClub(clubId, branchId) {
        ClubModel.findClubById(clubId)
            .then(club => {
                club.UsersClub.findOne({ ObjectId: branchId }, (err, branch) => {
                    if (err) {
                        console.log("Branch doesn't exist");
                    }
                    else {
                        club.branches.pop(branch);
                        club.save();
                        console.log("branch removed");
                    }
                });
            })
            .catch(err => {
                console.log(err);
            })
    },

        changePassword(managerId, currentPassword, newPassword) {
        return new Promise((resolve, reject) => {
            this.findManagerById(managerId)
            .then(manager => {
              console.log(manager);
              if(manager){
                Crypto.isMatch(currentPassword, manager.password)
                .then(match => {
                  console.log("passwords match: "+match);
                    if(match) {
                        manager.password = newPassword;
                        manager.save(function(err){
                            if(err){
                                console.log(err + "error saving pass");
                                reject(err);
                            }
                            else{
                                console.log("success saving pass");
                                resolve(manager);
                            }
                        });
                    } 
                    else { 
                      console.log("wrong password"); 
                      reject(match);
                    }
                })}
              else {
                  console.log(manager);
                reject(manager);
              }
            })
            .catch(err => {
              console.log(err);
              reject(err);
           });
        });
    }
}